import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fees: {
        stokeFee: 2.5,
        creatorRoyalty: 10
    }
};

export const administration = createSlice({
    name: 'administration',
    initialState,
    reducers: {
        setFees: (state, action) => {
            state.fees = {...action.payload}
        }
    }
});

export const { setFees } = administration.actions;

export default administration.reducer;