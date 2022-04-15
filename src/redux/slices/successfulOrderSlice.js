import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpened: false,
};

export const successfulOrderModal = createSlice({
  name: "successfulOrderModal",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpened = true;
    },
    close: (state) => {
      state.isOpened = false;
    },
  },
});

export const { open, close } = successfulOrderModal.actions;

export default successfulOrderModal.reducer;
