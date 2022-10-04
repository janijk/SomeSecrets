import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        user: "",
        isAuth: false,
        isSignout: false,
        pinEnabled: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
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
    }
})
export const { setUser, setIsAuth, setIsSignout, setPinEnabled, resetState} = loaderSlice.actions
export default loaderSlice.reducer