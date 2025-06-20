// lib/redux/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for better organization
type UserProfile = {
  college?: string;
  department?: string;
  avatarUrl?: string;
};

interface UserState {
  isAuthenticated: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  token: string;
  profile: UserProfile;
}

const initialState: UserState = {
  isAuthenticated: false,
  _id: '',
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  token: '',
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
    setUserData: (state, action: PayloadAction<Partial<Omit<UserState, 'profile'> & { profile?: Partial<UserProfile> }>>) => {
      const { profile, ...rest } = action.payload;
      
      return {
        ...state,
        ...rest,
        profile: {
          ...state.profile,
          ...profile,
        },
        isAuthenticated: Boolean(action.payload._id),
        fullName: action.payload.firstName && action.payload.lastName 
          ? `${action.payload.firstName} ${action.payload.lastName}`
          : state.fullName,
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

// Selectors
export const selectUser = (state: { user: UserState }) => state.user;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectUserProfile = (state: { user: UserState }) => state.user.profile;

export default userSlice.reducer;