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
  emailVerified: boolean;
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
  emailVerified: false,
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
        // Ensure emailVerified is properly set
        emailVerified: action.payload.emailVerified ?? state.emailVerified,
      };
    },
    clearUser: () => initialState,
    // Additional reducer for Supabase auth state sync
    updateFromSupabaseSession: (state, action: PayloadAction<any>) => {
      const session = action.payload;
      if (!session?.user) return initialState;

      return {
        isAuthenticated: true,
        id: session.user.id,
        email: session.user.email || '',
        firstName: session.user.user_metadata?.first_name || '',
        lastName: session.user.user_metadata?.last_name || '',
        college: session.user.user_metadata?.college || '',
        department: session.user.user_metadata?.department || '',
        avatarUrl: session.user.user_metadata?.avatar_url || '',
        emailVerified: Boolean(session.user.email_confirmed_at),
      };
    },
  },
});

export const { setUserData, clearUser, updateFromSupabaseSession } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state: { user: UserState }) => state.user;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectUserEmailVerified = (state: { user: UserState }) => state.user.emailVerified;

export default userSlice.reducer;