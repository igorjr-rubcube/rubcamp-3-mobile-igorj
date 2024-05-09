import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface AddressState {
  cep: string;
  number: string;
  complement: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

const initialState: AddressState = {
  cep: '',
  number: '',
  complement: '',
  street: '',
  neighborhood: '',
  city: '',
  state: '',
};

export const balanceSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<AddressState>) => {
            state.cep = action.payload.cep;
            state.number = action.payload.number;
            state.complement = action.payload.complement;
            state.street = action.payload.street;
            state.neighborhood = action.payload.neighborhood;
            state.city = action.payload.city;
            state.state = action.payload.state;
        },
    },
});

export const {setAddress} = balanceSlice.actions;

export default balanceSlice.reducer;