import { NavLink } from "react-router-dom";
import s from './Navigation.module.css';
import clsx from 'clsx';

  const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
    };
    

const Navigation = () => {
  
  return (
      <nav className={s.nav}>
        <ul className={s.navList}>
          <li>
            <NavLink to="/" className={buildLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={buildLinkClass}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
  )
}

export default Navigation
