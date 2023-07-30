import { createSlice } from "@reduxjs/toolkit";

const DefaultState = {
  userId: null,
  userName: null,
  email: null,
  avatar: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: DefaultState,
  reducers: {
    addUser: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      email: payload.userEmail,
      avatar: payload.avatar,
      isLoggedIn: true,
    }),

    LogOut: () => DefaultState,
    addUserAvatar: (state, { payload }) => ({
      ...state,
      avatar: payload.avatar,
    }),
  },
});

export const authReducer = authSlice.reducer;
