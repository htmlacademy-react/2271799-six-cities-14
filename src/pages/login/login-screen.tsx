import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import {Helmet} from 'react-helmet-async';
import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { login } from '../../store/api-action';
import MemorizedLogo from '../../components/logo/logo';
import { getIsAuthorized } from '../../store/user/selector';

function LoginScreen(): JSX.Element {
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setValueEmail(evt.target.value);
  };
  const authorizationStatus = useAppSelector(getIsAuthorized);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const newPassword = evt.target.value;
    setValuePassword(newPassword);

    if ((!/(?=.*[A-Za-zА-Яа-я])(?=.*\d)/.test(newPassword))) {
      setPasswordError('Password must contain at least one letter and one number');
    } else {
      setPasswordError('');
    }
  };

  useEffect(() => {
    if (authorizationStatus) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(login({
      email: valueEmail,
      password: valuePassword
    }));
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. Choose your place!</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <MemorizedLogo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  value={valueEmail}
                  onChange={handleChangeEmail}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  value={valuePassword}
                  onChange={handleChangePassword}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              {passwordError && (
                <p style={{ color: 'red', marginTop: '5px' }}>{passwordError}</p>
              )}
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
