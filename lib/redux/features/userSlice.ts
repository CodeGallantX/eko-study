import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: UserState = {
  username: '',
  isAuthenticated: false,
  token: null,
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
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer; 