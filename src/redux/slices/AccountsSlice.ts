import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface Account {
    id: string;
    balance: number;
    type: string;
    branch: string;
    number: string;
    bankName: string;
    incomeRate: number;
    incomeTotal: number;
}

interface AccountsSlice {
  accounts: Account[];
}

const initialState: AccountsSlice = {
  accounts: [],
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
  },
});

export const {setAccounts} = accountsSlice.actions;

export default accountsSlice.reducer;
