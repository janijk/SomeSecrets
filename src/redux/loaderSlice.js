import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        username: "",
        isAuth: false,
        pinEnabled: false,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        }

    }
})
export const { setUsername } = loaderSlice.actions
export default loaderSlice.reducer