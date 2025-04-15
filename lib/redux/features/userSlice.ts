import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  firstName: string;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: UserState = {
  firstName: '',
  isAuthenticated: false,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{ firstName: string; token: string }>) => {
      state.firstName = action.payload.firstName;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearUserData: (state) => {
      state.firstName = '';
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer; 