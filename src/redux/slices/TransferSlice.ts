import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AccountSelect {
  number: string;
  branch: number;
  bankName: string;
  user: {
    fullName: string;
    cpf: string;
  };
}

interface TransferState {
  selectedAccount: AccountSelect | undefined;
}

const initialState: TransferState = {
  selectedAccount: undefined,
};

export const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setSelectedAccount: (state, action: PayloadAction<AccountSelect>) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const {setSelectedAccount: setSelectedAccount} = transferSlice.actions;

export default transferSlice.reducer;
