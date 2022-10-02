import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        username: "",
        isAuth: false,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        }

    }
})
export const { setUsername } = currentUserSlice.actions
export default currentUserSlice.reducer