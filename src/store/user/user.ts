import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, RequestStatus } from '../../const';
import { checkAuth, login, logout } from '../api-action';
import { UsersType } from '../../types/reducers/user';

const initialState: UsersType = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  loginSendingStatus: RequestStatus.Idle,
};

export const user = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loginSendingStatus = RequestStatus.Pending;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginSendingStatus = RequestStatus.Success;
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.loginSendingStatus = RequestStatus.Error;
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.pending, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuth.pending, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
