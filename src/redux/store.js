import { configureStore } from "@reduxjs/toolkit";
import profilePopupReducer from "./slices/profilePopupSlice";
import walletPopupReducer from "./slices/walletPopupSlice";
import myWalletOptionsPopupReducer from "./slices/myWalletOptionsPopupSlice";
import errorSnackbarReducer from "./slices/errorSnackbarSlice";
import carouselReducer from "./slices/carouselSlice";
import logoutModalReducer from "./slices/logoutModalSlice";
import userDataReducer from "./slices/userDataSlice";
import successSnackbarReducer from "./slices/successSnackbarSlice";
import administrationReducer from "./slices/adminSlice";
import successfulOrderModalReducer from './slices/successfulOrderSlice'
import offersReducer from './slices/offersSlice'

export const store = configureStore({
  reducer: {
    administration: administrationReducer,
    carousel: carouselReducer,
    errorSnackbar: errorSnackbarReducer,
    logoutModal: logoutModalReducer,
    myWalletOptionsPopup: myWalletOptionsPopupReducer,
    offers: offersReducer,
    profilePopup: profilePopupReducer,
    successSnackbar: successSnackbarReducer,
    successfulOrderModal: successfulOrderModalReducer,
    userData: userDataReducer,
    walletPopup: walletPopupReducer
  },
});
