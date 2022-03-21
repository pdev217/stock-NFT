import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authorization: {
        isAuthorized: false
    }
};

export const authorization = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        login: (state) => {
            state.authorization.isAuthorized = true;
        },
        logout: (state) => {
            state.authorization.isAuthorized = false;
        }
    }
});

export const { login, logout } = authorization.actions;

export default authorization.reducer;