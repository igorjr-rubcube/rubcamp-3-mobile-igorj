import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface UserInfoState {
  id: string;
  cpf: string;
  fullName: string;
  email: string;
  phone: string;
  birthdate: string;
}

const initialState: UserInfoState = {
  id: '',
  cpf: '',
  fullName: '',
  email: '',
  phone: '',
  birthdate: '',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
      state.id = action.payload.id;
      state.cpf = action.payload.cpf;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.birthdate = action.payload.birthdate;
    },
  },
});

export const {setUserInfo: setUserInfo} = userInfoSlice.actions;

export default userInfoSlice.reducer;
