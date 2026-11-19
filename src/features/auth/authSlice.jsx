
import { createSlice } from "@reduxjs/toolkit";

// Get registered users from localStorage
const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("eventflow-users")) || [];
  } catch {
    return [];
  }
};

// Get logged-in user from localStorage or sessionStorage
const getCurrentUser = () => {
  try {
    const user =
      localStorage.getItem("eventflow-currentUser") ||
      sessionStorage.getItem("eventflow-currentUser");

    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const initialState = {
  users: getUsers(),
  user: getCurrentUser(),
  isAuthenticated: !!getCurrentUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Register new user
    registerUser: (state, action) => {
      state.users.push(action.payload);

      localStorage.setItem(
        "eventflow-users",
        JSON.stringify(state.users)
      );
    },

    // Login user
    loginUser: (state, action) => {
      const { user, rememberMe } = action.payload;

      state.user = user;
      state.isAuthenticated = true;

      // Clear previous session
      localStorage.removeItem("eventflow-currentUser");
      sessionStorage.removeItem("eventflow-currentUser");

      if (rememberMe) {
        localStorage.setItem(
          "eventflow-currentUser",
          JSON.stringify(user)
        );
      } else {
        sessionStorage.setItem(
          "eventflow-currentUser",
          JSON.stringify(user)
        );
      }
    },

    // Logout user
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("eventflow-currentUser");
      sessionStorage.removeItem("eventflow-currentUser");
    },
  },
});

export const {
  registerUser,
  loginUser,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
    