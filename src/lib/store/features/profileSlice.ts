import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import Firebase from '@/firebase/firebase';

const { database } = Firebase;

export interface ProfileValues {
  category: string;
  service: string;
  specialty: string;
  ranking: string;
  docid: string;
  id:string;
  src: string;
  name: string;
  email: string;
  number: string;
  address: string;
  state: string;
  area: string;
  country:string;
  about: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  isVendor: string;
  isEmployedId: string;
  isVerified: string;
  gallaryImg1:string;
  gallaryImg2:string;
  gallaryImg3:string;
  coordinates?: [number, number];
  latitude:string;
  longitude:string;
  password:string;
  confirmPassword:string;
  yearsOfExperience:number;
  service1:string;
  s1Price:string;
  service2:string;
  s2Price:string;
  service3:string;
  s3Price:string;
  service4:string;
  s4Price:string;
  service5:string;
  s5Price:string;
  availability:string;
  availableFrom:string;
  availableTo:string;
}

interface ProfileState {
  profiles: ProfileValues[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  profiles: [],
  status: 'idle',
  error: null,
};

export const fetchProfiles = createAsyncThunk(
  'profiles/fetchProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const profileDetailRef = collection(database, 'profile');
      const querySnapshot = await getDocs(profileDetailRef);
      const profiles: ProfileValues[] = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as ProfileValues;
        profiles.push({ ...docData, id: doc.id });
      });
      
      return profiles;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    clearProfiles: (state) => {
      state.profiles = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
        state.error = null;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllProfiles = (state: { profiles: ProfileState }) => state.profiles.profiles;
export const selectProfilesStatus = (state: { profiles: ProfileState }) => state.profiles.status;
export const selectProfilesError = (state: { profiles: ProfileState }) => state.profiles.error;

export const { clearProfiles } = profileSlice.actions;
export default profileSlice.reducer;