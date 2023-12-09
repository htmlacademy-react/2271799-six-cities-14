import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { fetchOffer } from '../api-action';
import { OfferType } from '../../types/reducers/offer';

const initialState: OfferType = {
  offer: null,
  offerFetchingStatus: RequestStatus.Idle,
};

export const offer = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.offerFetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offerFetchingStatus = RequestStatus.Success;
        state.offer = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.offerFetchingStatus = RequestStatus.Error;
      });
  }
});
