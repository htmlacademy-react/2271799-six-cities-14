import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { AppRoute } from '../../const';
import {HelmetProvider} from 'react-helmet-async';
import MainScreen from '../../pages/main/main-screen';
import LoginScreen from '../../pages/login/login-screen';
import FavoritesScreen from '../../pages/favorites/favorites-screen';
import OfferScreen from '../../pages/offer/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { PrivateRoute } from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import { getIsAuthorized } from '../../store/user/selector';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getIsAuthorized);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainScreen />} />
          <Route path={AppRoute.Login} element={
            <PrivateRoute redirectPage={AppRoute.Main} isAuth={!authorizationStatus}>
              <LoginScreen />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute redirectPage={AppRoute.Login} isAuth={authorizationStatus}>
              <FavoritesScreen />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Offer} element={<OfferScreen />} />
          <Route path={AppRoute.NotFound} element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
