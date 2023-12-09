import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../../types/state';
import { NameSpace } from '../../const';
import { FavoritesType } from '../../types/reducers/favorites';

export const getFavorites = createSelector(
  (state: StateType) => state[NameSpace.Favorites],
  (state: FavoritesType) => state.favorites
);

export const getFetchingStatus = createSelector(
  (state: StateType) => state[NameSpace.Favorites],
  (state: FavoritesType) => state.favoritesFetchingStatus
);
