import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Helmet} from 'react-helmet-async';
import CardOffer from '../../components/offers/card-offer/card-offer';
import { OffersType } from '../../types/offers';

type FavoritesProps = {
  favorites: OffersType[];
}

function FavoritesScreen({favorites}: FavoritesProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites offers</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {favorites.map((item) => (
                    <CardOffer key={item.id} src={item.previewImage} price={item.price} title={item.title} id={item.id} block={'favorites'} />
                  ))}
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {favorites.map((item) => (
                    <CardOffer key={item.id} src={item.previewImage} price={item.price} title={item.title} id={item.id} block={'favorites'} />
                  ))}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
