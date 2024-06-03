import React from 'react';
import {ReactComponent as HomeIcon} from '../icons/HomeNav.svg';
import {ReactComponent as CalendarIcon} from '../icons/Notebook.svg';
import {ReactComponent as LocationIcon} from '../icons/location.svg';
import {ReactComponent as CartIcon} from '../icons/cart.svg';
import '../../styles/components/NavBarMobile.scss';
import {NavLink} from "react-router-dom";

const NavBarMobile = () => {
  const navLinksFirst = [
    {
      icon: HomeIcon,
      label: 'Главная',
      href: '/',
    },
    {
      icon: CalendarIcon,
      label: 'Каталог',
      href: '/catalog',
    },
    {
      icon: LocationIcon,
      label: 'Адреса',
      href: '/addresses',
    },
  ];

  return (
      <div className='nav'>
        {navLinksFirst.map((item, index) => (
            <NavLink
                key={index}
                className='nav_link'
                to={item.href}
                end
            >
                <item.icon/>

                <p className='nav_label'>{item.label}</p>
            </NavLink>
        ))}

        <NavLink
            className='nav_link last'
            to='/basket'
            end
        >
          <CartIcon/>
        </NavLink>
      </div>
  );
};

export default NavBarMobile;