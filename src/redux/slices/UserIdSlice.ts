import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface UserIdState {
  userId: string;
}

const initialState: UserIdState = {
  userId: '',
};

export const userIdSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const {setUserId: setUserId} = userIdSlice.actions;

export default userIdSlice.reducer;
