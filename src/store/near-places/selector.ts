import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../../types/state';
import { NameSpace } from '../../const';
import { NearPlaces } from '../../types/reducers/near-places';

export const getNearPlaces = createSelector(
  (state: StateType) => state[NameSpace.NearPlaces],
  (state: NearPlaces) => state.nearPlaces
);
