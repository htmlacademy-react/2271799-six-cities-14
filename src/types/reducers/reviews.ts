import { RequestStatus } from '../../const';
import { ReviewType } from '../review';

export type ReviewsType = {
  reviews: ReviewType[];
  reviewsFetchingStatus: RequestStatus;
  reviewsSendingStatus: RequestStatus;
}
