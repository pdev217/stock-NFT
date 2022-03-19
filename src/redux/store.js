import { configureStore } from '@reduxjs/toolkit';
import profilePopupReducer from './slices/profilePopupSlice';
import walletPopupReducer from './slices/walletPopupSlice';

export const store = configureStore({
   reducer: {
     profilePopup: profilePopupReducer,
     walletPopup: walletPopupReducer
  }
});