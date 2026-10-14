import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import authReducer from './slices/authSlice';
import { api } from '../services/api';
import { publicApi } from '../services/publicApi';


export const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: authReducer,
    [api.reducerPath]: api.reducer,
    [publicApi.reducerPath]: publicApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([api.middleware, publicApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

