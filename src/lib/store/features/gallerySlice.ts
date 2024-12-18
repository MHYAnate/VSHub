import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import Firebase from '@/firebase/firebase';

const { database } = Firebase;

export interface GalleryItem {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  docid: string;
  createdAt: string;
  userId: string;
}

interface GalleryState {
  items: GalleryItem[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
}

const initialState: GalleryState = {
  items: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

export const fetchGalleryItems = createAsyncThunk(
  'gallery/fetchGalleryItems',
  async () => {
    try {
      const galleryRef = collection(database, 'gallery');
      const querySnapshot = await getDocs(galleryRef);
      const items: GalleryItem[] = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as GalleryItem;
        items.push(docData);
      });
      
      return items;
    } catch (error) {
      console.log(error)
      throw new Error('Failed to fetch gallery items');
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearGallery: (state) => {
      state.items = [];
      state.error = null;
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGalleryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch gallery items';
      });
  },
});

export const { setSelectedCategory, clearGallery } = gallerySlice.actions;
export default gallerySlice.reducer;