import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  _id: string;
  fullName: string;
  email: string;
  username: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  _id: '',
  fullName: '',
  email: '',
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      // Explicitly merge the state with the payload
      return {
        ...state,
        ...action.payload,
        // Ensure isAuthenticated is always set if not provided
        isAuthenticated: action.payload.isAuthenticated ?? state.isAuthenticated
      };
    },
    clearUser: () => initialState,
  },
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;