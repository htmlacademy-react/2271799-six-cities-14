import MemorizedLogo from '../logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
// import { AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { logout } from '../../store/api-action';
import { memo } from 'react';
import { getIsAuthorized, getUser } from '../../store/user/selector';
import { getFavorites } from '../../store/favorites/selector';

function Header(): JSX.Element {
  const status = useAppSelector(getIsAuthorized);
  const userData = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const favoritesCount = useAppSelector(getFavorites);

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <MemorizedLogo />
          </div>
          <nav className='header__nav'>
            {status ?
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper" style={{'backgroundImage': `url(${userData?.avatarUrl})`}}>
                    </div>
                    <span className="header__user-name user__name">{userData?.email}</span>
                    <span className="header__favorite-count">{favoritesCount.length}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link onClick={handleLogoutClick} className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Log Out</span>
                  </Link>
                </li>
              </ul>
              :
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>}
          </nav>
        </div>
      </div>
    </header>
  );
}

const MemorizedHeader = memo(Header);

export default MemorizedHeader;
