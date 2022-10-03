import { createSlice } from '@reduxjs/toolkit'

export const credentialsSlice = createSlice({
    name: 'credentials',
    initialState: {      
        credentials: [],
    },
    reducers: {
        addCredential: (state, action) => {
            state.credentials.push(action.payload);
        },
        setCredentials:(state, action) => {
            state.credentials = (action.payload);
        },
        removeCredential: (state, action) => {
            state.credentials = state.credentials.filter(cred => cred !== action.payload);
        }
    }
})
export const { setCredentials, addCredential, removeCredential } = credentialsSlice.actions
export default credentialsSlice.reducer