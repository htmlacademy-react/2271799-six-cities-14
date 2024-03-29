import { createAction } from '@reduxjs/toolkit';
import { CityType } from '../types/city';
import { Offer } from '../types/offer';
import { NameSpace } from '../const';
import { ReviewType } from '../types/review';

export const fetchOffers = createAction(`${NameSpace.Offers}/fetchOffers`);

export const fetchOffer = createAction<Offer['id']>(`${NameSpace.Offer}/fetchOffer`);

export const fetchNearPlaces = createAction<Offer['id']>(`${NameSpace.NearPlaces}/fetchNearPlaces`);

export const fetchReviews = createAction<ReviewType[]>(`${NameSpace.Reviews}/fetchReviews`);

export const dropOffer = createAction(`${NameSpace.Offer}/dropOffer`);

export const setActiveCity = createAction<CityType>(`${NameSpace.Offers}/setActiveCity`);

export const fetchFavorites = createAction(`${NameSpace.Favorites}/fetchFavorites`);

export const dropReviewSendingStatus = createAction(`${NameSpace.Reviews}/dropReviewSendingStatus`);
