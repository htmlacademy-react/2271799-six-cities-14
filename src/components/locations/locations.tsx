import { CityMapData } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveCity } from '../../store/actions';
import { memo } from 'react';
import { getActiveCity } from '../../store/offers/selector';

const cities = Object.values(CityMapData);

function Locations(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={city.name} className="locations__item">
            <button
              className={`locations__item-link tabs__item ${activeCity.name === city.name ? 'tabs__item--active' : '' }`}
              style={{border:'0', backgroundColor: activeCity.name === city.name ? '' : 'inherit', cursor: 'pointer'}}
              onClick={() => dispatch(setActiveCity(city))}
            >
              <span>{city.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

const MemorizedLocations = memo(Locations);

export default MemorizedLocations;
