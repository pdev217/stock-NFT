import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    walletPopup: {
        isOpened: false
    }
};

export const walletPopup = createSlice({
    name: 'walletPopup',
    initialState,
    reducers: {
        toggleIsOpened: (state, action) => {
            state.walletPopup.isOpened = action.payload.walletPopup.isOpened;
        }
    }
});

export const { toggleIsOpened } = walletPopup.actions;

export default walletPopup.reducer;