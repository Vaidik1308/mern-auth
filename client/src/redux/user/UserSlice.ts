import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../../types';

export type InitialUserState = {
  currentUser: UserInfo | null;
  loading: boolean | undefined;
  status: {
    success: boolean | undefined;
    message: string;
  } | undefined;
};

const initialState: InitialUserState = {
  currentUser: null,
  loading: undefined,
  status: {
    success: undefined,
    message: ''
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.status = {
        success: true,
        message: 'Login Successfully',
      };
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.status = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
