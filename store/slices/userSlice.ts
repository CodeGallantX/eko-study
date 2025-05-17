// @/store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  _id: string;
  fullName: string;
  email: string;
  username: string;
  token?: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  _id: '',
  fullName: '',
  email: '',
  username: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    clearUserData: () => initialState,
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
});

export const { setUserData, clearUserData, setAuthToken } = userSlice.actions;
export default userSlice.reducer;