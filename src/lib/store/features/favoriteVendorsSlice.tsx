import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import Firebase from '@/firebase/firebase';

const { database } = Firebase;

export interface FavoriteValues {
  vendorName:string;
  vendorImg:string;
  vendorId:string;
  vendorCategory:string;
  vendorService:string;
  clientId:string;
  clientName:string;
  clientImg:string;
  id:string;
  docId:string;
}

interface favouriteState {
  favoriteVendors: FavoriteValues[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: favouriteState = {
  favoriteVendors: [],
  status: 'idle',
  error: null,
};

export const fetchFavourites = createAsyncThunk(
  'favoriteVendors/fetchFavourites',
  async (_, { rejectWithValue }) => {
    try {
      const profileDetailRef = collection(database, `vendorsClient`);
      const querySnapshot = await getDocs(profileDetailRef);
      const favoriteVendors: FavoriteValues[] = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as FavoriteValues;
        favoriteVendors.push({ ...docData, id: doc.id });
      });
      
      return favoriteVendors;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favoriteVendors',
  initialState,
  reducers: {
    clearFavourites: (state) => {
      state.favoriteVendors= [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favoriteVendors= action.payload;
        state.error = null;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllfavoriteVendors = (state: { favourite: favouriteState }) => state.favourite.favoriteVendors;
export const selectfavoriteVendorsStatus = (state: { favourite: favouriteState }) => state.favourite.status;
export const selectfavoriteVendorsError = (state: { favourite: favouriteState }) => state.favourite.error;

export const { clearFavourites } = favoriteSlice .actions;
export default favoriteSlice .reducer;