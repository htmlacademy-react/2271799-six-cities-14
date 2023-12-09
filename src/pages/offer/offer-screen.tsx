import MemorizedHeader from '../../components/header/header';
import { useParams } from 'react-router-dom';
import ListOffers from '../../components/offers/list-offers/list-offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchNearPlaces, fetchOffer, fetchReviews } from '../../store/api-action';
import { dropOffer } from '../../store/actions';
import OfferDetails from '../../components/offers/offers-details/offers-details';
import { MAX_NEAR_PLACES_COUNT, MAX_REVIEWS_COUNT } from '../../const';
import Map from '../../components/map/map';
import { getOffer } from '../../store/offer/selector';
import { getNearPlaces } from '../../store/near-places/selector';
import { getReviews } from '../../store/reviews/selector';

function OfferScreen(): JSX.Element {
  const offer = useAppSelector(getOffer);
  const dispatch = useAppDispatch();
  const nearPlaces = useAppSelector(getNearPlaces);
  const nearPlacesToRender = nearPlaces.slice(0, MAX_NEAR_PLACES_COUNT);
  const reviews = useAppSelector(getReviews);
  const reviewsToRender = reviews
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS_COUNT);
  const {id} = useParams();
  const isLoading = !offer;

  useEffect(() => {
    if (id) {
      dispatch(fetchNearPlaces(id));
      dispatch(fetchOffer(id));
      dispatch(fetchReviews(id));
    }

    return () => {
      dispatch(dropOffer());
    };
  }, [id, dispatch]);

  return (
    <div className='page'>
      {isLoading ? (
        <p style={{textAlign: 'center', fontSize: '50px'}}>Loading...</p>) : (
        <>
          <MemorizedHeader />
          <main className="page__main page__main--offer">
            <section className="offer">
              <OfferDetails offer={offer}
                reviews={reviews} offerId={offer?.id} reviewsRender={reviewsToRender}
              />
              <Map block={'offer'} currentOffer={offer} location={offer.location} offers={nearPlacesToRender} specialOfferId={offer.id} />
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighborhood</h2>
                <div className="near-places__list places__list">
                  <ListOffers size='large' offers={nearPlacesToRender} block={'near-places'}/>
                </div>
              </section>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default OfferScreen;
