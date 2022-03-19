import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profilePopup: {
        isOpened: false
    }
};

export const profilePopup = createSlice({
    name: 'profilePopup',
    initialState,
    reducers: {
        toggleIsOpened: (state, action) => {
            state.profilePopup.isOpened = action.payload.profilePopup.isOpened;
        }
    }
});

export const { toggleIsOpened } = profilePopup.actions;

export default profilePopup.reducer;