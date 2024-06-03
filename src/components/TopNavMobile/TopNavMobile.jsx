import React from 'react';
import { ReactComponent as ArrowIcon } from '../icons/Arrow 6.svg';
import {NavLink, useLocation} from "react-router-dom";
import '../../styles/components/TopNav.scss';

const TopNavMobile = ({isLightColor, additionalClass = '', title = 'Профиль'}) => {
  const location = useLocation()
  return (
      <NavLink
          className={`profileAdaptive_top ${isLightColor ? 'light' : ''} ${additionalClass}`}
          to={location.pathname ==='/my-account' ? '/home' : '/my-account'}
      >
        <ArrowIcon/>

        <p className={`profileAdaptive_text ${isLightColor ? 'light' : ''} ${additionalClass}`}>
          {title}
        </p>
      </NavLink>
  );
};

export default TopNavMobile;