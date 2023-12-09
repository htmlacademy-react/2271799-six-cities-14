import { combineReducers } from '@reduxjs/toolkit';
import { offer } from './offer/offer';
import { offers } from './offers/offers';
import { nearPlaces } from './near-places/near-places';
import { favorites } from './favorites/favorites';
import { reviews } from './reviews/reviews';
import { user } from './user/user';

export const reducer = combineReducers({
  'FAVORITES': favorites.reducer,
  'OFFERS': offers.reducer,
  'OFFER': offer.reducer,
  'NEAR_PLACES': nearPlaces.reducer,
  'REVIEWS': reviews.reducer,
  'USER': user.reducer
});
