import ReviewList from '../../review/review-list';
import ImageOffer from '../image-offer/image-offer';
import InsideOffers from '../inside-offer/inside-offer';
import { Offer } from '../../../types/offer';
import BookmarkButton from '../../bookmark-button/bookmark-button';
import { ReviewType } from '../../../types/review';
import ReviewForm from '../../review/review-form';
import { useAppSelector } from '../../../hooks';
import { MAX_IMAGES_COUNT } from '../../../const';
import { getIsAuthorized } from '../../../store/user/selector';

type OfferTypeProps = {
  offer: Offer | null;
  offerId: Offer['id'];
  reviews: ReviewType[];
  reviewsRender: ReviewType[];
}

function OfferDetails ({offer, offerId, reviews, reviewsRender}: OfferTypeProps) {
  const status = useAppSelector(getIsAuthorized);
  if(!offer) {
    return null;
  }

  const ratingPercentage: number = (Math.round(offer.rating) * 100) / 5;
  return (
    <>
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {offer.images.slice(0, MAX_IMAGES_COUNT).map((item) => <ImageOffer src={item} key={item} />)}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {offer.isPremium ?
            <div className="offer__mark">
              <span>Premium</span>
            </div>
            : ''}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {offer.title}
            </h1>
            <BookmarkButton offer={offer} id={offer.id} isActive={offer.isFavorite} block={'offer'} size={'large'} />
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: `${ratingPercentage}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{offer.rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {offer.bedrooms} {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
            </li>
            <li className="offer__feature offer__feature--adults">
                Max {offer.maxAdults} {offer.maxAdults === 1 ? 'adult' : 'adults'}
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{offer.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {offer.goods.map((item) => <InsideOffers insideOffer={item} key={item}/>)}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                <img
                  className="offer__avatar user__avatar"
                  src={offer.host.avatarUrl}
                  width="74"
                  height="74"
                  alt="Host avatar"
                />
              </div>
              <span className="offer__user-name">
                {offer.host.name}
              </span>
              <span className="offer__user-status">
                {offer.host.isPro ? 'Pro' : ''}
              </span>
            </div>
            <div className="offer__description">
              <p className="offer__text">
                {offer.description}
              </p>
            </div>
          </div>
          <section className="offer__reviews reviews">
            <ReviewList reviewsRender={reviewsRender} reviews={reviews}/>
            {status ?
              <ReviewForm offerId={offerId}/>
              : ''}
          </section>
        </div>
      </div>
    </>
  );
}

export default OfferDetails;
