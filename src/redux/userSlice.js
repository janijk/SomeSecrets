import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: "",
        credentials: [],
        //nesting slices??

    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        addCredential: (state, action) => {
            state.credentials.push(action.payload);
        },

    }
})
export const { setUsername, addCredential } = userSlice.actions
export default userSlice.reducer