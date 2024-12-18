import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import Firebase from '@/firebase/firebase';

const { database } = Firebase;

export interface FavoriteVendorValues {
  vendorName:string;
  vendorImg:string;
  vendorId:string;
  vendorCategory:string;
  vendorService:string;
  clientId:string;
  id:string;
}

interface FavoriteVendorState {
  favoriteVendors: FavoriteVendorValues[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FavoriteVendorState = {
  favoriteVendors: [],
  status: 'idle',
  error: null,
};

export const fetchFavoriteVendors = createAsyncThunk(
  'favoriteVendors/fetchFavoriteVendors',
  async (_, { rejectWithValue }) => {
    try {
      const profileDetailRef = collection(database, 'VendorsClient');
      const querySnapshot = await getDocs(profileDetailRef);
      const FavoriteVendorValues: FavoriteVendorValues[] = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as FavoriteVendorValues;
        FavoriteVendorValues.push({ ...docData, id: doc.id });
      });
      
      return FavoriteVendorValues;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const favoriteVendorSlice = createSlice({
  name: 'favoriteVendors',
  initialState,
  reducers: {
    clearFavoriteVendor: (state) => {
      state.favoriteVendors = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteVendors.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFavoriteVendors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favoriteVendors = action.payload;
        state.error = null;
      })
      .addCase(fetchFavoriteVendors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllFavoriteVendorValues = (state: { favoriteVendors: FavoriteVendorState }) => state.favoriteVendors.favoriteVendors;
export const selectFavoriteVendorValuesStatus = (state: { favoriteVendors: FavoriteVendorState }) => state.favoriteVendors.status;
export const selectFavoriteVendorValuesError = (state: { favoriteVendors: FavoriteVendorState }) => state.favoriteVendors.error;

export const { clearFavoriteVendor } = favoriteVendorSlice.actions;
export default favoriteVendorSlice.reducer;