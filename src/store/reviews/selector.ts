import { createSelector } from '@reduxjs/toolkit';
import { StateType } from '../../types/state';
import { NameSpace } from '../../const';
import { ReviewsType } from '../../types/reducers/reviews';

export const getReviews = createSelector(
  (state: StateType) => state[NameSpace.Reviews],
  (state: ReviewsType) => state.reviews
);

export const getFetchingStatus = createSelector(
  (state: StateType) => state[NameSpace.Reviews],
  (state: ReviewsType) => state.reviewsFetchingStatus
);

export const getSendingStatus = createSelector(
  (state: StateType) => state[NameSpace.Reviews],
  (state: ReviewsType) => state.reviewsSendingStatus
);
