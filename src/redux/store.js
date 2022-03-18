import { configureStore } from '@reduxjs/toolkit';
import profilePopupReducer from './slices/walletPopupSlice';

export const store = configureStore({
   reducer: {
     profilePopup: profilePopupReducer
  }
});