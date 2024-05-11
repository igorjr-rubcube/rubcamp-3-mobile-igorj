import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface AddressState {
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

export const addressSlice = createSlice({
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

export const {setAddress} = addressSlice.actions;

export default addressSlice.reducer;
