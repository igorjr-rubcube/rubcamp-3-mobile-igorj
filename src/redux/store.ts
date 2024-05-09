import {configureStore} from '@reduxjs/toolkit';
import loadingReducer from './slices/LoadingSlice';
import tokenReducer from './slices/TokenSlice';
import userIdReducer from './slices/UserIdSlice';
import balanceReducer from './slices/BalanceSlice';
import accountIdReducer from './slices/AccountIdSlice';
import userDataReducer from './slices/UserInfoSlice';
import addressReducer from './slices/AddressSlice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    token: tokenReducer,
    userId: userIdReducer,
    accountId: accountIdReducer,
    balance: balanceReducer,
    userInfo: userDataReducer,
    address: addressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;