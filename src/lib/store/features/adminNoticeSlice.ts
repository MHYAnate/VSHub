import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import Firebase from '@/firebase/firebase';

const { database } = Firebase;

export interface AdminMessage {
  id: string;
  docId: string;
  type: string;
  senderId: string;
  senderName:string;
  senderImage:string;
  senderAddress:string;
  senderService:string;
  senderNumber:string;
  recieverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

 interface AdminMessageNotificationState {
  messages: AdminMessage[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AdminMessageNotificationState = {
  messages: [],
  status: 'idle',
  error: null,
};

interface MessageTransformInput {
  id?: string;
  docId?: string;
  type?: string;
  senderId?: string;
  senderName?:string;
  senderImage?:string;
  senderAddress?:string;
  senderNumber?:string;
  senderService?:string;
  recieverId?: string;
  content?: string;
  timestamp?: Date | string | number;
  read?: boolean;
}

const transformMessage = (message: MessageTransformInput): AdminMessage => {
  // Handle timestamp transformation separately to properly type check
  let timestamp: Date;
  if (message.timestamp instanceof Date) {
    timestamp = message.timestamp;
  } else if (message.timestamp !== undefined) {
    timestamp = new Date(message.timestamp);
  } else {
    timestamp = new Date();
  }

  return {
    id: message.id || '',
    docId: message.docId || '',
    type: message.type || '',
    senderId: message.senderId || '',
    senderName: message.senderName || '',
    senderImage: message.senderImage || '',
    senderAddress: message.senderAddress || '',
    senderNumber: message.senderNumber || '',
    senderService: message.senderService || '',
    recieverId: message.recieverId || '',
    content: message.content || '',
    timestamp,
    read: Boolean(message.read)
  };
};


export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const messagesDetailRef = collection(database, 'adminMessages');
      const querySnapshot = await getDocs(messagesDetailRef);
      const messages: AdminMessage[] = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        messages.push(transformMessage({ ...docData, id: doc.id }));
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

export const selectAllAdminNotice = (state: { AdminNotice: AdminMessageNotificationState }) => state.AdminNotice.messages;
export const selectAdminNoticeStatus = (state: { AdminNotice: AdminMessageNotificationState }) => state.AdminNotice.status;
export const selectAdminNoticeError = (state: { AdminNotice: AdminMessageNotificationState }) => state.AdminNotice.error;

export const { clearAdminMessages } = adminMessageSlice.actions;
export default adminMessageSlice.reducer;