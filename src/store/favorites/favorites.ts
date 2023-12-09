import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { fetchFavorites, postFavorites } from '../api-action';
import { FavoritesType } from '../../types/reducers/favorites';

const initialState: FavoritesType = {
  favorites: [],
  favoritesFetchingStatus: RequestStatus.Idle,
  offer: null,
};

export const favorites = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoritesFetchingStatus = RequestStatus.Success;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.favoritesFetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.favoritesFetchingStatus = RequestStatus.Error;
      })
      .addCase(postFavorites.fulfilled, (state, {payload})=>{
        if(payload.isFavorite){
          state.favorites.push(payload);
        } else {
          state.favorites = state.favorites.filter((favorite)=> favorite.id !== payload.id);
        }
      });
  }
});
