import ListOffers from '../../components/offers/list-offers/list-offers';
import MemorizedHeader from '../../components/header/header';
import MemorizedLocations from '../../components/locations/locations';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Map from '../../components/map/map';
import Sorting from '../../components/sorting/sorting';
import { useState, useEffect} from 'react';
import { SortingType } from '../../types/sorting';
import { sorting } from '../../utils';
import { fetchOffers } from '../../store/api-action';
import { Offer } from '../../types/offer';
import MainEmpty from '../../components/main/main-empty';
import { RequestStatus } from '../../const';
import Loader from '../../components/loader/loader';
import ErrorDisplay from '../../components/error-display/error-display';
import { getActiveCity, getOffers } from '../../store/offers/selector';
import { getFetchingStatus } from '../../store/offers/selector';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);
  const offerByCity = offers.filter((offer) => offer.city?.name === activeCity.name);
  const [activeSorting, setActiveSorting] = useState<SortingType>('Popular');
  const [hoveredOfferId, setHoveredId] = useState<Offer['id'] | null>(null);
  const fetchingStatus = useAppSelector(getFetchingStatus);

  function handleCardHover(offerId: Offer['id'] | null) {
    setHoveredId(offerId);
  }
  function handleSortingChange(type: SortingType) {
    setActiveSorting(type);
  }

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities. Choose your place!</title>
      </Helmet>

      <MemorizedHeader />
      <main className={`page__main page__main--index ${!offers.length && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <MemorizedLocations />
        </div>
        {fetchingStatus === RequestStatus.Error && (
          <ErrorDisplay />
        )}
        {fetchingStatus === RequestStatus.Pending && <Loader />}
        {fetchingStatus === RequestStatus.Success && (
          <div className="cities">
            {offers.length === 0 ?
              <MainEmpty /> :
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offerByCity.length} places to stay in {activeCity.name}</b>
                  <Sorting activeSorting={activeSorting} onChange={handleSortingChange}/>
                  <div className="cities__places-list places__list tabs__content">
                    <ListOffers size='large' onCardHover={handleCardHover} offers={sorting[activeSorting](offerByCity)} block={'cities'}/>
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map offers={offerByCity} block='cities' location={activeCity.location} specialOfferId={hoveredOfferId}/>
                </div>
              </div>}
          </div>)}
      </main>
    </div>
  );
}

export default MainScreen;
