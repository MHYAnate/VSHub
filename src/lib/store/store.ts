import { configureStore } from '@reduxjs/toolkit';
import ratingReducer from './features/ratingSlice';
import profileReducer from './features/profileSlice';
import offerReducer from './features/offerSlice';
import vacancyReducer from './features/vacancySlice';
import clientValueReducer from './features/vendorsClientSlice';
import favoriteVendorReducer from './features/favoriteVendorsSlice';
import adminMessageReducer from './features/adminNoticeSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const makeStore = () => {
  return configureStore({
    reducer: {
      rating: ratingReducer,
      profile: profileReducer,
      offer: offerReducer,
      vacancy: vacancyReducer,
      customer:clientValueReducer,
      favoriteVendor:favoriteVendorReducer,
      notice: adminMessageReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;