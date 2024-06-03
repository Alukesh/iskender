import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import * as Icons from '../icons/myAccount';
import { useSelector } from 'react-redux';
import ModalMobileB from '../ModalMobile/ModalMobileB';

const NavigationPanel = () => {
  const { user } = useSelector(state => state.cart);
  const isManager = user.role === 'manager';
  const { favourites } = useSelector(store => store.favourites)
  const [logout, setLogout] = useState(false)

  const navLinksFirst = [
    {
      icon: Icons.ProfileIcon,
      label: 'Мои данные',
      href: '/my-account',
      show: true,
    },
    {
      icon: Icons.HeartIcon,
      label: 'Избранные товары',
      href: '/my-account/favourites',
      show: true,
      fav_count: favourites.length
    },
    // {
    //   icon: Icons.PaperNoteV1Icon,
    //   label: 'Новости и Акции',
    //   href: '/my-account/news-and-promotions',
    //   show: true,
    // },
    {
      icon: Icons.ClockSquareIcon,
      label: 'История заказов',
      href: '/my-account/order-history',
      show: true,
    },
    {
      icon: Icons.ClockSquareIcon,
      label: 'История по клиентским заказам',
      href: '/my-account/manager-history',
      show: isManager,
    },
    {
      icon: Icons.ShieldDoneIcon,
      label: 'Политика конфиденциальности',
      href: '/my-account/privacy-policy',
      show: true,
    },
  ];
  function toggleAskLogout() {
    setLogout(prev => !prev)
  }
  return (
    <div className='my_account_navigation'>
      <div className='my_account_navigation_block'>
        {navLinksFirst.map((item, index) => {
          if (!item.show) return
          return (
            <NavLink key={index} to={item.href} end
              className={`my_account_navigation_block_link ${index !== navLinksFirst.length - 1 && 'line'}`}
            >
              <div className='my_account_navigation_block_label'>
                <img src={item.icon} alt='Test' /> {item.label}
              </div>

              {item.fav_count &&
                <div className='fav_count'>
                  {item.fav_count}
                </div>
              }
            </NavLink>
          )
        })}
      </div>

      <div className='my_account_navigation_block'>
        <button onClick={toggleAskLogout} className='my_account_navigation_block_link logout_button'>
          <img src={Icons.LogoutIcon} alt='LogoutIcon' />
          Выйти
        </button>

        <ModalMobileB
          isActive={logout}
          handleClick={toggleAskLogout}
        />
      </div>

    </div>
  );
};

export default NavigationPanel;
