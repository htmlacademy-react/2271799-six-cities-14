import { createSlice } from '@reduxjs/toolkit';
import { CityMapData, NameSpace, RequestStatus } from '../../const';
import { fetchOffers } from '../api-action';
import { Offers } from '../../types/reducers/offers';
import { setActiveCity } from '../actions';

const initialState: Offers = {
  offers: [],
  offersFetchingStatus: RequestStatus.Idle,
  activeCity: CityMapData.Paris,
};

export const offers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.offersFetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offersFetchingStatus = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.offersFetchingStatus = RequestStatus.Error;
      })
      .addCase(setActiveCity, (state, action) => {
        state.activeCity = action.payload;
      });
  }
});
