import { RequestStatus } from '../../const';
import { Offer } from '../offer';

export type OfferType = {
  offer: Offer | null;
  offerFetchingStatus: RequestStatus;
}
