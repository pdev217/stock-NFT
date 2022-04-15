import { createSlice } from "@reduxjs/toolkit";
import { getExpirationString } from "../../helpers/getExpirationString";

const initialState = {
  offers: [],
};

export const offers = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setOffers: (state, action) => {
      const array = [...action.payload].map((elem) => {
        return { ...elem, expirationDate: getExpirationString(elem.expirationDate) };
      });
      state.offers = array;
    },
    addOffer: (state, action) => {
      state.offers = [
        ...state.offers,
        {
          ...action.payload,
          expirationDate: getExpirationString(action.payload.expirationDate),
          user: { username: action.payload.username },
        },
      ];
    },
  },
});

export const { setOffers, addOffer } = offers.actions;

export default offers.reducer;
