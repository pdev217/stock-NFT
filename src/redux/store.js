import { configureStore } from "@reduxjs/toolkit";
import profilePopupReducer from "./slices/profilePopupSlice";
import walletPopupReducer from "./slices/walletPopupSlice";
import authorizationReducer from "./slices/authorizationSlice";
import myWalletOptionsPopupReducer from "./slices/myWalletOptionsPopupSlice";

export const store = configureStore({
  reducer: {
    profilePopup: profilePopupReducer,
    walletPopup: walletPopupReducer,
    authorization: authorizationReducer,
    myWalletOptionsPopup: myWalletOptionsPopupReducer,
  },
});
