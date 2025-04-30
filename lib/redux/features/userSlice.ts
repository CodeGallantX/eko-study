// lib/redux/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  _id: '',
  fullName: '',
  email: '',
  username: '',
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{
      _id: string;
      fullName: string;
      email: string;
      username: string;
    }>) => {
      state._id = action.payload._id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
    clearUserData: (state) => {
      state._id = '';
      state.fullName = '';
      state.email = '';
      state.username = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;