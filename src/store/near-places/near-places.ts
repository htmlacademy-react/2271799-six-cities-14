import { createSlice } from '@reduxjs/toolkit';
import { NearPlaces } from '../../types/reducers/near-places';
import { NameSpace } from '../../const';
import { fetchNearPlaces } from '../api-action';

const initialState: NearPlaces = {
  nearPlaces: [],
};

export const nearPlaces = createSlice({
  name: NameSpace.NearPlaces,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNearPlaces.fulfilled, (state, action) => {
        state.nearPlaces = action.payload;
      });
  }
});
