import { createSlice } from '@reduxjs/toolkit'

export const credentialsSlice = createSlice({
    name: 'credentials',
    initialState: {
        credentials: true,
    },
    reducers: {
        addCredential: (state, action) => {
            state.credentials.push(action.payload);
        },
        reloadCredentials: (state, action) => {
            state.credentials = !state.credentials;
        },
        removeCredential: (state, action) => {
            state.credentials = state.credentials.filter(cred => cred !== action.payload);
        }
    }
})
export const { reloadCredentials, addCredential, removeCredential } = credentialsSlice.actions
export default credentialsSlice.reducer