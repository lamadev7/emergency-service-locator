import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './slices/index.ts';

const store = configureStore({
    reducer: {
        service: serviceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
