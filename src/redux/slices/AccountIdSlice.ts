import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface AccountIdState {
  accountId: string;
}

const initialState: AccountIdState = {
  accountId: '',
};

export const accountIdSlice = createSlice({
  name: 'accountId',
  initialState,
  reducers: {
    setAccountId: (state, action: PayloadAction<string>) => {
      state.accountId = action.payload;
    },
  },
});

export const {setAccountId: setAccountId} = accountIdSlice.actions;

export default accountIdSlice.reducer;
