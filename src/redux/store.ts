import {configureStore} from '@reduxjs/toolkit';
import loadingReducer from './slices/LoadingSlice';
import tokenReducer from './slices/TokenSlice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;