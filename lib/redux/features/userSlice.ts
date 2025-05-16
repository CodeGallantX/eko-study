import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  fullName: string;
  email: string;
  username: string;
  token?: string;
}

const initialState: UserState = {
  isAuthenticated: false,
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