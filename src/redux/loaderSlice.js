import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({ // Shouldnt persist
    name: 'loader',
    initialState: {
        user: {},
        isAuth: false,
        isLoading: true,
        isSignout: false,
        pinEnabled: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsAuth: (state) => {
            state.username = true;
        },
        setIsLoading: (state) => {
            state.username = false;
        },
        setIsSignout: (state) => {
            state.username = true;
        },
        setPinEnabled: (state) => {
            state.username = true;
        },
    }
})
export const { setUsername } = loaderSlice.actions
export default loaderSlice.reducer