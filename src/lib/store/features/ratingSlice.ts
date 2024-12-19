import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, setDoc, doc, getDocs, query, where, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import Firebase from '@/firebase/firebase';


const serializeTimestamp = (timestamp: any) => {
  if (!timestamp) return null;
  if (timestamp.toMillis) {
    return timestamp.toMillis();
  }
  return null;
};

 const formatDate = (timestamp: number | null): string => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleDateString();
};

const { database } = Firebase;

export interface RateValue {
  rating: number;
  rateeId: string;
  docid: string;
  rate: number;
  feedback: string;
  raterName: string;
  raterImg: string;
  raterId: string;
  createdAt: number | null; // Changed from Timestamp to number
}

interface CardRating {
  ratings: RateValue[];
  totalRate: number;
  loading: boolean;
  error: string | null;
}

interface RatingState {
  ratingsByCard: Record<string, CardRating>;
}

const initialCardState: CardRating = {
  ratings: [],
  totalRate: 0,
  loading: false,
  error: null,
};

const initialState: RatingState = {
  ratingsByCard: {},
};

interface AddRatingPayload {
  data: { feedback: string };
  finalRate: number;
  rateeId: string;
  raterId: string;
  rate: number;
  raterImg: string;
  raterName: string;
}

interface UpdateRatingPayload {
  target: RateValue;
  data: { feedback: string };
  finalRate: number;
  rateeId: string;
  rate: number;
  raterImg: string;
  raterName: string;
}

export const fetchRatings = createAsyncThunk(
  'rating/fetchRatings',
  async (rateeId: string) => {
    try {
      const rateUsDetailRef = collection(database, 'rateUs');
      const rateeQuery = query(rateUsDetailRef, where('rateeId', '==', rateeId));
      const querySnapshot = await getDocs(rateeQuery);
      const ratings = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          rating: Number(data.rating),
          rate: Number(data.rate),
          createdAt: serializeTimestamp(data.createdAt), // Serialize timestamp
        } as RateValue;
      });
      return { rateeId, ratings };
    } catch (error) {
      console.error('Error fetching ratings:', error);
      throw new Error('Failed to fetch ratings');
    }
  }
);

export const addRating = createAsyncThunk(
  'rating/addRating',
  async ({ data, finalRate, rateeId, raterId, rate, raterImg, raterName }: AddRatingPayload) => {
    try {
      const rateUsDetailRef = collection(database, 'rateUs');
      const timestamp = serverTimestamp();
      const docRef = await addDoc(rateUsDetailRef, {
        rating: finalRate,
        rateeId,
        docid: '',
        raterId,
        rate,
        feedback: data.feedback,
        raterImg,
        raterName,
        createdAt: timestamp,
      });

      const newRating: RateValue = {
        rating: finalRate,
        rateeId,
        docid: docRef.id,
        rate,
        feedback: data.feedback,
        raterImg,
        raterName,
        raterId,
        createdAt: Date.now(), // Use current timestamp for immediate display
      };

      await setDoc(doc(rateUsDetailRef, docRef.id), { docid: docRef.id }, { merge: true });
      return { rateeId, rating: newRating };
    } catch (error) {
      console.error('Error adding rating:', error);
      throw new Error('Failed to add rating');
    }
  }
);

export const updateRating = createAsyncThunk(
  'rating/updateRating',
  async ({ target, data, finalRate, rateeId, rate, raterImg, raterName }: UpdateRatingPayload) => {
    try {
      const rateUsDetailRef = collection(database, 'rateUs');
      const updatedRating: Partial<RateValue> = {
        rating: finalRate,
        rate,
        feedback: data.feedback,
        raterImg,
        raterName,
      };

      await setDoc(doc(rateUsDetailRef, target.docid), updatedRating, { merge: true });
      return { 
        rateeId,
        rating: {
          ...target,
          ...updatedRating,
          createdAt: Date.now(), // Update timestamp
        } as RateValue,
      };
    } catch (error) {
      console.error('Error updating rating:', error);
      throw new Error('Failed to update rating');
    }
  }
);

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    resetCardRating: (state, action: PayloadAction<string>) => {
      state.ratingsByCard[action.payload] = initialCardState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.pending, (state, action) => {
        const rateeId = action.meta.arg;
        state.ratingsByCard[rateeId] = {
          ...(state.ratingsByCard[rateeId] || initialCardState),
          loading: true,
          error: null,
        };
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        const { rateeId, ratings } = action.payload;
        const totalRate = ratings.reduce((total, rater) => total + rater.rate, 0);
        state.ratingsByCard[rateeId] = {
          ratings,
          totalRate,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        const rateeId = action.meta.arg;
        state.ratingsByCard[rateeId] = {
          ...(state.ratingsByCard[rateeId] || initialCardState),
          loading: false,
          error: action.error.message || 'Failed to fetch ratings',
        };
      })
      .addCase(addRating.fulfilled, (state, action) => {
        const { rateeId, rating } = action.payload;
        const cardRatings = state.ratingsByCard[rateeId];
        if (cardRatings) {
          cardRatings.ratings.push(rating);
          cardRatings.totalRate = cardRatings.ratings.reduce(
            (total, rater) => total + rater.rate,
            0
          );
        }
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        const { rateeId, rating } = action.payload;
        const cardRatings = state.ratingsByCard[rateeId];
        if (cardRatings) {
          const index = cardRatings.ratings.findIndex(r => r.docid === rating.docid);
          if (index !== -1) {
            cardRatings.ratings[index] = rating;
            cardRatings.totalRate = cardRatings.ratings.reduce(
              (total, rater) => total + rater.rate,
              0
            );
          }
        }
      });
  },
});

export const { resetCardRating } = ratingSlice.actions;
export default ratingSlice.reducer;