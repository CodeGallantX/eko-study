// lib/redux/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  college: string;
  department: string;
  avatarUrl?: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  id: '',
  firstName: '',
  lastName: '',
  email: '',
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
        isAuthenticated: Boolean(action.payload.id),
      };
    },
    clearUser: () => initialState,
  },
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;