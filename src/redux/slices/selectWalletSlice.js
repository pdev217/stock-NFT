import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSelect: false,
};

export const selectWallet = createSlice({
    name: "selectWallet",
    initialState,
    reducers: {
      setSelect: (state, action) => {
        state.isSelect = action.payload;
      },
    },
  });
  
  export const { setSelect } = selectWallet.actions;
  
  export default selectWallet.reducer;