import { RequestStatus } from '../../const';
import { CityType } from '../city';
import { OffersType } from '../offers';

export type Offers = {
  offers: OffersType[];
  offersFetchingStatus: RequestStatus;
  activeCity: CityType;
};
