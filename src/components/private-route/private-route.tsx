import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

export type TProtectedRoute = {
    redirectPage: AppRoute;
    children: JSX.Element;
  }

export function PrivateRoute(props: TProtectedRoute): JSX.Element {
  const { redirectPage, children } = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    isAuth ? children : <Navigate to={redirectPage} />
  );
}
