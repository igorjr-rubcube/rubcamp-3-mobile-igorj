import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface UserData {
  cpf: string;
  fullName: string;
  email: string;
  phone: string;
  birthdate: string;
}

interface AddressData {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface AccountData {
  transactionPassword: string;
  type: string;
}

interface OnboardingState {
  userData: UserData;
  addressData: AddressData;
  password: string;
  accountData: AccountData;
  initialTime: string;
}

const initialState: OnboardingState = {
  userData: {
    cpf: '',
    fullName: '',
    email: '',
    phone: '',
    birthdate: '',
  },
  addressData: {
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  },
  password: '',
  accountData: {
    transactionPassword: '',
    type: '',
  },
  initialTime: '',
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    setAddressData: (state, action: PayloadAction<AddressData>) => {
      state.addressData = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setAccountData: (state, action: PayloadAction<AccountData>) => {
      state.accountData = action.payload;
    },
    setInitialTime: (state, action: PayloadAction<string>) => {
      state.initialTime = action.payload;
    }
  },
});

export const {setUserData, setAddressData, setPassword, setAccountData, setInitialTime} = onboardingSlice.actions;

export default onboardingSlice.reducer;
