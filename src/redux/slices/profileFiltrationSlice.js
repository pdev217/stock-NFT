import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStatuses: [],
  selectedPrice: {
    min: undefined,
    max: undefined,
    currency: "usd",
  },
  selectedCollections: { filter: "", rows: [] },
  selectedChains: [],
  selectedOnSaleIn: { filter: "", rows: [] },
  filterText: "",
  itemsSelect: "Single Items",
  readyFilterOption: "Recently Recieved",
  tokensGridScale: "large",
  isShownAllOffers: true,
};

export const profileFiltration = createSlice({
  name: "profileFiltration",
  initialState,
  reducers: {
    setData: (state, { payload: { field, data } }) => {
      state[field] = data;
    },
    deleteFromArray: (state, { payload: { field, data } }) => {
      if (data.rows) {
        state[field] = { ...state[field], rows: state[field].rows.filter((elem) => elem !== data.rows)  };
      } else {
        state[field] = state[field].filter((elem) => elem !== data);
      }
    },
    deletePrice: (state) => {
      state.selectedPrice = {
        min: undefined,
        max: undefined,
        currency: "usd",
      };
    },
  },
});

export const { setData, deleteFromArray, deletePrice } = profileFiltration.actions;

export default profileFiltration.reducer;
