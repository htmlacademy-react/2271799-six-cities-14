import MemorizedHeader from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Helmet} from 'react-helmet-async';
import ListOffers from '../../components/offers/list-offers/list-offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import { fetchFavorites } from '../../store/api-action';
import FavoritesEmpty from '../../components/favorites/favorites-empty';
import { getFavorites } from '../../store/favorites/selector';

function getFavoritesByCity(favorites: Offer[]) {
  return favorites.reduce<{ [key: string]: Offer[] }>((acc, curr) => {
    const city = curr.city ? curr.city.name : '';

    if (!(city in acc)) {
      acc[city] = [];
    }
    acc[city].push(curr);

    return acc;
  }, {});
}

function FavoritesScreen(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const favoritesByCity = getFavoritesByCity(favorites);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites offers</title>
      </Helmet>
      <MemorizedHeader />
      {
        favorites.length === 0 ? <FavoritesEmpty /> :
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.entries(favoritesByCity).map(
                    ([city, groupedFavorites])=>(
                      <li className="favorites__locations-items" key={city}>
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <Link className="locations__item-link" to={'http://localhost:5173/'}>
                              <span>{city}</span>
                            </Link>
                          </div>
                        </div>
                        <div className="favorites__places">
                          <ListOffers size='small' offers={groupedFavorites} block={'favorites'} onCardHover={() => {}}/>
                        </div>
                      </li>))}
                </ul>
              </section>
            </div>
          </main>
      }
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
