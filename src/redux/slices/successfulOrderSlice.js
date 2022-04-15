import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpened: false,
    title: '',
    description: ''
};

export const successfulOrderModal = createSlice({
  name: "successfulOrderModal",
  initialState,
  reducers: {
    open: (state, action) => {
      state.isOpened = true;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    close: (state) => {
      state.isOpened = false;
      state.title = '';
      state.description = '';
    },
  },
});

export const { open, close } = successfulOrderModal.actions;

export default successfulOrderModal.reducer;
