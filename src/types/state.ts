import { AuthorizationStatus, RequestStatus } from '../const';
import { store } from '../store';
import { CityType } from './city';
import { Offer } from './offer';
import { OfferPreviewType } from './offer-preview';
import { OffersType } from './offers';
import { ReviewType } from './review';
import { UserType } from './user';

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;

export type InitialState = {
  offers: OffersType[];
  offersFetchingStatus: RequestStatus;
  nearPlaces: OffersType[];
  reviews: ReviewType[];
  reviewsFetchingStatus: RequestStatus;
  reviewsSendingStatus: RequestStatus;
  offer: Offer | null;
  offerFetchingStatus: RequestStatus;
  favorites: OfferPreviewType[];
  favoriteSendingStatus: RequestStatus;
  favoritesFetchingStatus: RequestStatus;
  activeCity: CityType;
  authorizationStatus: AuthorizationStatus;
  user: UserType | null;
  loginSendingStatus: RequestStatus;
}
