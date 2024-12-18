import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import Firebase from '@/firebase/firebase';

const { database } = Firebase;

export interface VendorsClientValues {
  clientName:string;
  clientImg:string;
  clientId:string;
  vendorId:string;
  id:string;
}

interface VendorClientState {
  clientValues: VendorsClientValues[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VendorClientState = {
  clientValues: [],
  status: 'idle',
  error: null,
};

export const fetchVendorsClient = createAsyncThunk(
  'clientValues/fetchVendorsClient',
  async (_, { rejectWithValue }) => {
    try {
      const profileDetailRef = collection(database, 'VendorsClient');
      const querySnapshot = await getDocs(profileDetailRef);
      const clientValues: VendorsClientValues[] = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as VendorsClientValues;
        clientValues.push({ ...docData, id: doc.id });
      });
      
      return clientValues;
    } catch (error) {
      return rejectWithValue('Failed to fetch clientValues');
    }
  }
);

const clientValueSlice = createSlice({
  name: 'clientValues',
  initialState,
  reducers: {
    clearClientValues: (state) => {
      state.clientValues = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorsClient.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVendorsClient.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clientValues = action.payload;
        state.error = null;
      })
      .addCase(fetchVendorsClient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllclientValues = (state: { clientValues: VendorClientState }) => state.clientValues.clientValues;
export const selectclientValuesStatus = (state: { clientValues: VendorClientState }) => state.clientValues.status;
export const selectclientValuesError = (state: { clientValues: VendorClientState }) => state.clientValues.error;

export const { clearClientValues } = clientValueSlice.actions;
export default clientValueSlice.reducer;