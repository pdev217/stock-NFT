import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  chains: [],
  error: null
};

export const getAllChains = createAsyncThunk("chains/getAllChains", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/nfts/blockchainTypes/all`);
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const generalData = createSlice({
  name: "generalData",
  initialState,
  reducers: {
    setAllData: (state, { payload }) => {
      state = { ...payload };
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChains.fulfilled, (state, action) => {
      state.chains = action.payload;
    });
    builder.addCase(getAllChains.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setAllData, clearError } = generalData.actions;

export default generalData.reducer;
