import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../../types/state';
import { NameSpace } from '../../const';
import { OfferType } from '../../types/reducers/offer';

export const getOffer = createSelector(
  (state: StateType) => state[NameSpace.Offer],
  (state: OfferType) => state.offer
);

export const getFetchingStatus = createSelector(
  (state: StateType) => state[NameSpace.Offer],
  (state: OfferType) => state.offerFetchingStatus
);
