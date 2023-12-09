import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../../types/state';
import { NameSpace } from '../../const';
import { Offers } from '../../types/reducers/offers';

export const getOffers = createSelector(
  (state: StateType) => state[NameSpace.Offers],
  (state: Offers) => state.offers
);

export const getFetchingStatus = createSelector(
  (state: StateType) => state[NameSpace.Offers],
  (state: Offers) => state.offersFetchingStatus
);

export const getActiveCity = createSelector(
  (state: StateType) => state[NameSpace.Offers],
  (state: Offers) => state.activeCity
);
