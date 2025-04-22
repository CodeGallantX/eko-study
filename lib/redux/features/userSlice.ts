import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  token: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  username: '',
  token: '',
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{ username: string; token: string }>) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearUserData: (state) => {
      state.username = '';
      state.token = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer; 