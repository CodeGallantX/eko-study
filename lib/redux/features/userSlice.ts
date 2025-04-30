// lib/redux/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  token: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  _id: '',
  fullName: '',
  email: '',
  username: '',
  token: '',
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, isAuthenticated: true };
    },
    clearUserData: () => initialState,
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
});

export const { setUserData, clearUserData, setAuthToken } = userSlice.actions;
export default userSlice.reducer;