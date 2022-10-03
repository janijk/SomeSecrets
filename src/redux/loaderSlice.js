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
            state.username = true;
        },
        setIsSignout: (state) => {
            state.username = true;
        },
        setPinEnabled: (state) => {
            state.username = true;
        },
    }
})
export const { setUsername, setIsAuth, setIsSignout, setPinEnabled} = loaderSlice.actions
export default loaderSlice.reducer