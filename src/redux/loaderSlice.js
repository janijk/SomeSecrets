import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        user: "",
        remember: "",
        isAuth: false,
        isSignout: false,
        pinEnabled: false,
        reload: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.remember = action.payload;
        },
        setIsAuth: (state) => {
            state.isAuth = true;
        },
        setIsSignout: (state) => {
            state.isSignout = true;
        },
        setPinEnabled: (state) => {
            state.pinEnabled = true;
        },
        resetState: (state) => {
            state.user = "";
            state.isAuth = false;
            state.isSignout = false;
            state.pinEnabled = false;
        },
        reloadCredentials: (state, action) => {
            state.reload = !state.reload;
        },
    }
})
export const { setUser, setIsAuth, setIsSignout, setPinEnabled, resetState, reloadCredentials } = loaderSlice.actions
export default loaderSlice.reducer