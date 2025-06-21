// lib/redux/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserProfile = {
  college?: string;
  department?: string;
  avatarUrl?: string;
};

interface UserState {
  isAuthenticated: boolean;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profile: UserProfile;
}

const initialState: UserState = {
  isAuthenticated: false,
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  fullName: '',
  profile: {
    college: '',
    department: '',
    avatarUrl: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{
      id?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      profile?: Partial<UserProfile>;
    }>) => {
      const { id, email, firstName, lastName, profile } = action.payload;
      return {
        ...state,
        isAuthenticated: Boolean(id),
        id: id || state.id,
        email: email || state.email,
        firstName: firstName || state.firstName,
        lastName: lastName || state.lastName,
        fullName: [firstName, lastName].filter(Boolean).join(' ') || state.fullName,
        profile: {
          ...state.profile,
          ...profile,
        },
      };
    },
    clearUserData: () => initialState,
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
  },
});

export const { setUserData, clearUserData, updateProfile } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectUserProfile = (state: { user: UserState }) => state.user.profile;

export default userSlice.reducer;