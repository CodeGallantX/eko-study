// lib/redux/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  token: string;
  college?: string;
  department?: string;
  avatarUrl?: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  _id: '',
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  token: '',
  college: '',
  department: '',
  avatarUrl: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: Boolean(action.payload._id),
      };
    },
    clearUserData: () => initialState,
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;