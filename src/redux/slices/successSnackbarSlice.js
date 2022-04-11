import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  isOpened: false,
};

export const successSnackbar = createSlice({
  name: "successSnackbar",
  initialState,
  reducers: {
    open: (state, action) => {
      state.isOpened = true;
      state.text = action.payload;
    },
    close: (state) => {
      state.isOpened = false;
      state.text = "";
    },
  },
});

export const { open, close } = successSnackbar.actions;

export default successSnackbar.reducer;
