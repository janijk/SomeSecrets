import { createSlice } from '@reduxjs/toolkit'

export const credentialsSlice = createSlice({
    name: 'credentials',
    initialState: {
        credentials: true,
        pwdHistory: []
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
        },
        addToHistory: (state, action) => {
            state.pwdHistory.push(action.payload);
        }
    }
})
export const { reloadCredentials, addCredential, removeCredential, addToHistory } = credentialsSlice.actions
export default credentialsSlice.reducer