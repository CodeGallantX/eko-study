import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  id: string;
  fullName: string;
  email: string;
  username: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  id: '',
  fullName: '',
  email: '',
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      return { 
        ...state, 
        ...action.payload,
        isAuthenticated: Boolean(action.payload.id) 
      };
    },
    clearUser: () => initialState,
  },
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;