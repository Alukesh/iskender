import React from 'react';
import { ReactComponent as WhatsA } from '../icons/whatsappBut.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as Ellipse1 } from '../icons/ellipseInsideCard1.svg';
import { ReactComponent as Ellipse2 } from '../icons/ellipseInsideCard2.svg';
import { ReactComponent as Ellipse3 } from '../icons/ellipseInsideCard3.svg';
import { UseEnterShow } from '../../context/EnterContext';
import { useSelector } from 'react-redux';

const MobileMenu = ({ displey, setShow }) => {
    const { setOpenEnter } = UseEnterShow();
    const { user } = useSelector(state => state.cart);
    const handleLink = (e) => {
        if (!user?.name) {
            e.preventDefault()
            window.scrollTo(0, 0)
            setShow(false)
            setOpenEnter(true)
        }
    }
    return (
        <div className={`mobile_menu ${displey ? 'open' : 'close'}`}>
            <Ellipse1 className='ellipce circle1' />
            <Ellipse2 className='ellipce circle2' />
            <Ellipse3 className='ellipce circle3' />
            <Ellipse2 className='ellipce circle4' />
            <div className=' mobile_menu-wrapper'>
                <nav>
                    <ul className='mobile_menu-links'>
                        <li>
                            <NavLink className='mobile_menu-link' to={'/catalog'}>Каталог</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={handleLink} className='mobile_menu-link' to={'/my-account'}>Мой аккаунт</NavLink>
                        </li>
                        <li>
                            <NavLink className='mobile_menu-link' to={'/news-and-promotions'}>Новости</NavLink>
                        </li>
                        <li>
                            <NavLink className='mobile_menu-link' to={'/addresses'}>Контакты</NavLink>
                        </li>
                    </ul>
                    <div className='footer-columns-column'>
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
                        <a href='https://wa.me/+996500000104'>
                            <WhatsA />
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;