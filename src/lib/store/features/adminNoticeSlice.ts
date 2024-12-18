import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import Firebase from '@/firebase/firebase';

const { database } = Firebase;

export interface AdminMessage {
  id: string
  docId:string
  content: string
  timestamp: Date
  read: boolean
}
interface AdminMessageNotificationState {
  messages: AdminMessage[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdminMessageNotificationState = {
  messages: [],
  status: 'idle',
  error: null,
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const messagesDetailRef = collection(database, 'adminMessages');
      const querySnapshot = await getDocs(messagesDetailRef);
      const messages: AdminMessage[] = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as AdminMessage;
        messages.push({ ...docData, id: doc.id });
      });
      
      return messages;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const adminMessageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    clearAdminMessages: (state) => {
      state.messages = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllAdminNotice = (state: { AdminNotice: AdminMessageNotificationState }) => state.AdminNotice.messages;
export const selectAdminNoticeStatus = (state: { AdminNotice: AdminMessageNotificationState }) => state.AdminNotice.status;
export const selectAdminNoticeError = (state: { AdminNotice: AdminMessageNotificationState }) => state.AdminNotice.error;

export const { clearAdminMessages } = adminMessageSlice.actions;
export default adminMessageSlice.reducer;