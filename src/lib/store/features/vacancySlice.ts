import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import Firebase from '@/firebase/firebase';

const { database } = Firebase;

export interface VacancyItem {
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salary: string;
  type: string; // full-time, part-time, contract
  category: string;
  docid: string;
  vendorId:string;
  companyName: string;
  postedDate: string;
  deadline: string;
  status: 'open' | 'closed';
}

interface VacancyState {
  vacancies: VacancyItem[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
}

const initialState: VacancyState = {
  vacancies: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

export const fetchVacancies = createAsyncThunk(
  'vacancy/fetchVacancies',
  async () => {
    try {
      const vacancyRef = collection(database, 'vacancies');
      const querySnapshot = await getDocs(vacancyRef);
      const vacancies: VacancyItem[] = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as VacancyItem;
        vacancies.push(docData);
      });
      
      return vacancies;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to fetch vacancies');
    }
  }
);

const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearVacancies: (state) => {
      state.vacancies = [];
      state.error = null;
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.vacancies = action.payload;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vacancies';
      });
  },
});

export const { setSelectedCategory, clearVacancies } = vacancySlice.actions;
export default vacancySlice.reducer;