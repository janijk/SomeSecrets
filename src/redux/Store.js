import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import credentialsSlice from './credentialsSlice';
import loaderSlice from './loaderSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    //blacklist: ['username']
}

const rootReducer = combineReducers({
    credentials: credentialsSlice,
    loader: loaderSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);