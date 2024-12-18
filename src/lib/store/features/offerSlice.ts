import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import Firebase from '@/firebase/firebase';

const { database } = Firebase;

export interface OfferValues {
  category: string;
  title: string;
  detail: string;
  price: string;
  docid: string;
  src: string;
  vendorId: string;
  status: 'active' | 'inactive';
  createdAt: string;
  expiresAt?: string;
}

interface OfferState {
  offers: OfferValues[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
}

const initialState: OfferState = {
  offers: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

export const fetchOffers = createAsyncThunk(
  'offer/fetchOffers',
  async () => {
    try {
      const offerDetailRef = collection(database, 'offer');
      const querySnapshot = await getDocs(offerDetailRef);
      const offers: OfferValues[] = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as OfferValues;
        offers.push(docData);
      });
      
      return offers;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to fetch offers');
    }
  }
);

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearOffers: (state) => {
      state.offers = [];
      state.error = null;
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch offers';
      });
  },
});

// Selectors
export const selectOffersByVendor = (state: { offer: OfferState }, vendorId: string) => 
  state.offer.offers.filter(offer => offer.vendorId === vendorId);

export const selectOffersByCategory = (state: { offer: OfferState }, category: string) => 
  state.offer.offers.filter(offer => offer.category === category);

export const selectActiveOffers = (state: { offer: OfferState }) => 
  state.offer.offers.filter(offer => offer.status === 'active');

export const { setSelectedCategory, clearOffers } = offerSlice.actions;
export default offerSlice.reducer;