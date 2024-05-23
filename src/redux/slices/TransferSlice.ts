import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AccountSelect {
  number: string;
  branch: string;
  bankName: string;
  user: {
    fullName: string;
    cpf: string;
  };
}

interface TransferState {
  selectedAccount: AccountSelect | undefined;
  description: string;
  amount: number;
  date: string | null;
}

const initialState: TransferState = {
  selectedAccount: undefined,
  description: '',
  amount: 0,
  date: null,
};

export const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setSelectedAccount: (state, action: PayloadAction<AccountSelect>) => {
      state.selectedAccount = action.payload;
    },
    setTransferAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setTransferDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setTransferDate: (state, action: PayloadAction<string | null>) => {
      state.date = action.payload;
    },
  },
});

export const {
  setSelectedAccount: setSelectedAccount,
  setTransferAmount: setTransferAmount,
  setTransferDescription: setTransferDescription,
  setTransferDate: setTransferDate,
} = transferSlice.actions;

export default transferSlice.reducer;
