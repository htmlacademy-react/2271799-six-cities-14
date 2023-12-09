import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../../types/state';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UsersType } from '../../types/reducers/user';

export const getUser = createSelector(
  (state: StateType) => state[NameSpace.User],
  (state: UsersType) => state.user
);

export const getAuthorizationStatus = createSelector(
  (state: StateType) => state[NameSpace.User],
  (state: UsersType) => state.authorizationStatus
);

export const getIsAuthorized = createSelector(
  (state: StateType) => state[NameSpace.User],
  (state: UsersType) => state.authorizationStatus === AuthorizationStatus.Auth
);

export const getSendingStatus = createSelector(
  (state: StateType) => state[NameSpace.User],
  (state: UsersType) => state.loginSendingStatus
);
