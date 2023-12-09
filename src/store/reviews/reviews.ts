import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { ReviewsType } from '../../types/reducers/reviews';
import { fetchReviews, postReviews } from '../api-action';

const initialState: ReviewsType = {
  reviews: [],
  reviewsFetchingStatus: RequestStatus.Idle,
  reviewsSendingStatus: RequestStatus.Idle,
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsFetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.reviewsFetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.reviewsFetchingStatus = RequestStatus.Error;
      })
      .addCase(postReviews.pending, (state) => {
        state.reviewsSendingStatus = RequestStatus.Pending;
      })
      .addCase(postReviews.fulfilled, (state, action) => {
        state.reviewsSendingStatus = RequestStatus.Success;
        state.reviews.push(action.payload);
      })
      .addCase(postReviews.rejected, (state) => {
        state.reviewsSendingStatus = RequestStatus.Error;
      });
  }
});
