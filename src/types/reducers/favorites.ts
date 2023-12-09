import { RequestStatus } from '../../const';
import { Offer } from '../offer';
import { OfferPreviewType } from '../offer-preview';

export type FavoritesType = {
  favorites: OfferPreviewType[];
  favoritesFetchingStatus: RequestStatus;
  offer: Offer | null;
}
