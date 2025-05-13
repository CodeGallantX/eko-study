import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignInForm from '@/components/auth/SignInForm'; // Adjust the import path as needed
import { RootState } from '@/lib/redux/store'; // Adjust the import path as needed
import { setUserData } from '@/lib/redux/features/userSlice'; // Adjust the import path as needed

// Mock the next/navigation router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

const mockStore = configureStore([]);
const mockAxios = new MockAdapter(axios);
const API_BASE_URL = 'https://ekustudy.onrender.com';

const initialState: RootState = {
  user: {
    isAuthenticated: false,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  },
};

describe('Authentication Integration Tests', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
    mockAxios.reset(); // Reset mock adapter before each test
    // Mock localStorage if needed for specific tests
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully log in a user with correct credentials', async () => {
    const mockUser = {
      _id: 'user123',
      fullName: 'Test User',
      email: 'test@example.com',
      username: 'testuser',
    };

    // Mock the successful login API response
    mockAxios.onPost(`${API_BASE_URL}/users/login`).reply(200, {
      message: 'Login successful',
      user: mockUser,
    });

    // Mock the profile fetch after login
    mockAxios.onGet(`${API_BASE_URL}/users/profile`).reply(200, mockUser);

    render(
      <Provider store={store}>
        <SignInForm />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Wait for the API call and subsequent actions to complete
    await waitFor(() => {
      // Check if the login API was called
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockAxios.history.post[0].data).toContain('"email":"test@example.com"');
      expect(mockAxios.history.post[0].data).toContain('"password":"password123"');

      // Check if the profile API was called
      expect(mockAxios.history.get.length).toBe(1);
      expect(mockAxios.history.get[0].url).toBe(`${API_BASE_URL}/users/profile`);

      // Check if the Redux store was updated with user data
      const actions = store.getActions();
      expect(actions).toContainEqual(setUserData(mockUser));

      // In a real E2E test, you might check for redirection here.
      // For integration, we focus on the state and API interactions.
      // Example: expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  // Add more test cases for:
  // - Invalid login credentials
  // - Network errors during login
  // - Sign up flow
  // - Forgot password flow
  // - Reset password flow
  // - OTP verification flow
});