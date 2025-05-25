// lib/redux/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  _id: string;
  fullName: string;
  email: string;
  username: string;
  token: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  _id: '',
  fullName: '',
  email: '',
  username: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUserData: () => initialState,
  },
});

export const { setUserData, setAuthToken, clearUserData } = userSlice.actions;
export default userSlice.reducer;