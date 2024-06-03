import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../icons/Logo.svg';
import { ReactComponent as Insta } from '../icons/insta.svg';
// import { ReactComponent as Facebook } from '../icons/facebook.svg';
import { ReactComponent as GoogP } from '../icons/googlePlay.svg';
import { ReactComponent as AppS } from '../icons/appStore.svg';
import { ReactComponent as WhatsA } from '../icons/whatsappBut.svg';
import { UseEnterShow } from '../../context/EnterContext';
import { useSelector } from 'react-redux';

const Footer = () => {
  const { setOpenEnter } = UseEnterShow();
  const { user } = useSelector(state => state.cart);
  const handleLink = (e) => {
      if (!user?.name) {
          e.preventDefault()
          window.scrollTo(0, 0)
          setOpenEnter(true)
      }
  }
  return (
    <div className='background'>
      <div className='footer container'>
        <div className='footer-logo'>
          <Link aria-label="На главную" to={'/home'} className='logo' >
            <Logo />
          </Link>
          <div className='footer-logo_text'>
            Первый отечественный бренд Iskender на рынке сантехники от компании
            ОсОО «Стройдом.кг»
          </div>
          <div className='footer-download'>
            <a aria-label="Скачать через App store" target='_blank' href='https://apps.apple.com/kg/app/iskender-homes/id6468029366'>
              <AppS />
            </a>
            <a aria-label="Скачать через Google Play" target='_blank' href='https://play.google.com/store/apps/details?id=com.iskender.shop'>
              <GoogP />
            </a>
          </div>
        </div>
        <div className='footer-columns-column'>
          <div className='footer-columns-column_title Gilroy-b'>Адреса</div>
          <div className='footer-columns-column_content'>
            <div className='Gilroy-n grey'>
              ЭлитСтрой <strong className='Gilroy-m white'>ул. Ден-Сяопина 18/1</strong>
            </div>
            <div className='Gilroy-n grey'>
              Баткен <strong className='Gilroy-m white'>ул. Льва-Толстого 19</strong>
            </div>
            <div className='Gilroy-n grey'>
              ТааТан <strong className='Gilroy-m white'>ул. Лермонтова 6</strong>
            </div>
          </div>
        </div>
        <div className='footer-columns-column footer-columns-page'>
          <div className='footer-columns-column_title Gilroy-b'>Компания</div>
          <div className='footer-columns-column_content'>
            <Link className='Gilroy-n grey' to='/catalog'>Каталог</Link>
            <Link onClick={handleLink} to={'/my-account/favourites'} className='Gilroy-n grey'>Избранное</Link>
            <Link onClick={handleLink} to={'/my-account'} className='Gilroy-n grey'>Личный кабинет</Link>
          </div>
        </div>
        <div className='footer-columns-column'>
          <div className='footer-columns-column_title Gilroy-b'>Контакты</div>
          <div className='footer-columns-column_content'>
            <div className='Gilroy-n grey'>
              Email:
              <a href="mailto:stroydom.kg@mail.ru">
                <strong className='Gilroy-m white'>iskender.kg@gmail.com</strong>
              </a>
            </div>
            <div className='Gilroy-n grey'>
              Телефон:
              <a href="tel:+996500000104">
                <strong className='Gilroy-m white'>+996 (500) 000-104</strong>
              </a>
              <a href="tel:+996997000104">
                <strong className='Gilroy-m white'>+996 (997) 000-104</strong>
              </a>
              <a href="tel:+996222000104">
                <strong className='Gilroy-m white'>+996 (222) 000-104</strong>
              </a>
            </div>
          </div>
          <a aria-label="Открыть чат в WhatsApp" href='https://wa.me/+996500000104'>
            <WhatsA />
          </a>
        </div>
      </div>
      <div className='footer-copyright container'>
        <p>© 2023 Iskender.kg - Отечественный бренд сантехники</p>
        <div className='footer-icons'>
          <a aria-label="открыть Instagram" target='_blank' href='https://www.instagram.com/iskender_home?igsh=Z21xaXJ2ZDZocGR1'>
            <Insta />
          </a>
          {/* <a href=''>
            <Facebook />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
