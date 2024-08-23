import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';

export const store = configureStore({
    reducer: {
        userData: userReducer, // Asegúrate de que esto se refiera al reducer, no al slice completo
    },
});

// Inferir los tipos `RootState` y `AppDispatch` a partir del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
