import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

// export type AuthState = {
//   access_token: string;
//   token_type: 'bearer' | string;
//   expires_in: number;
// };

export type AuthState = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};

const initState: AuthState = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  image: '',
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
      return state;
    },
    resetAuth: state => {
      state = initState;
      return state;
    },
  },
});

export const {setAuth, resetAuth} = authSlice.actions;

export default authSlice.reducer;
