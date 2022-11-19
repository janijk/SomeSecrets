import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        user: "",
        remember: "",
        pincode: "",
        isAuth: false,
        isPin: false,
        pinCorrect: true,
        reload: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.remember = action.payload;
        },
        setPincode: (state, action) => {
            state.pincode = action.payload;
        },
        setIsAuth: (state) => {
            state.isAuth = true;
        },
        setIsPin: (state) => {
            if (state.isPin == true) state.pincode = ""
            state.isPin = !state.isPin;
        },
        setIsPinFalse: (state) => {
            state.pincode = ""
            state.isPin = false;
            state.pinCorrect = true;
        },
        setPinCorrect: (state, action) => {
            state.pinCorrect = action.payload;
        },
        resetState: (state) => {
            state.user = "";
            state.pincode = "";
            state.isAuth = false;
            state.isPin = false;
        },
        reloadCredentials: (state, action) => {
            state.reload = !state.reload;
        },
    }
})
export const { setUser, setPincode, setIsPinFalse, setIsAuth, setIsPin, setPinCorrect, resetState, reloadCredentials } = loaderSlice.actions
export default loaderSlice.reducer