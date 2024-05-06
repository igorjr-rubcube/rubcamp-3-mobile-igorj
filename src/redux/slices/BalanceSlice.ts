import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface BalanceState {
  balance: number | undefined;
}

const initialState: BalanceState = {
  balance: undefined,
};

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
});

export const {setBalance: setBalance} = balanceSlice.actions;

export default balanceSlice.reducer;
