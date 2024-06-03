import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoSmall from "../icons/logoSmall";
import ProfileSVG from "../icons/profile.svg";
import { ReactComponent as MarketIcon } from "../icons/market.svg";
import burgerC from "../icons/burgCatal.svg";
import { UseEnterShow } from "../../context/EnterContext";
import { useSelector } from "react-redux";
import MobileMenu from "./MobileMenu";
import ProductSearch from "../ProductSearch/ProductSearch";
import LogIn from "../../pages/Enter/LogIn";
import EnterPopup from "../../pages/Enter/EnterPopup";
import Reset from "../../pages/Enter/Reset";
import ReturnUrlFromIp from "../../hooks/useReplaceUrl";
import SendNewPassword from "../../pages/Enter/SendNewPassword";

const Header = () => {
  const navigate = useNavigate()
  const { ShowLoginPhone, ShowLoginEmail, enterMethod, HandleEndAuth, openEnter, setOpenEnter } = UseEnterShow();
  const location = useLocation();
  const [isShowSidebar, setIsShowSideBar] = useState(false);
  const { cart, user } = useSelector(state => state.cart);
  const cartQuantity = cart?.reduce((acc, rec) => acc + rec.count, 0)


  function ShowCategoriesMobile() {
    setIsShowSideBar(!isShowSidebar);
    if (!isShowSidebar) {
      document.body.style.overflow = 'hidden'
      return
    }
    document.body.style.overflow = 'auto'
  }
  useEffect(() => {
    setIsShowSideBar(false)
    document.body.style.overflow = 'auto'
    setOpenEnter(false);
  }, [location]);

  const handleClickProfile = () => {
    if (user?.name) return navigate('/my-account');
    handleLoginClick()
  }
  const OpenLoginWithPhone = () => {
    ShowLoginPhone()
  };
  const OpenLoginWithEmail = () => {
    ShowLoginEmail()
  };


  const handleLoginClick = () => {
    setOpenEnter(!openEnter);
  };
  const handleCloseModal = () => {
    setOpenEnter(false);
    HandleEndAuth()
  };
  const avatarImage = useMemo(() => {
    return ReturnUrlFromIp(user?.avatar) || ProfileSVG
  }, [user])
  const isHomePage = location.pathname === "/";

  return (
    <>
      <div className={"header-background" + (isHomePage ? " homeH" : "")}>
        <div className="header container  header-pos">
          <div className="header-left">
            <div className="header-logo">
              <Link aria-label="На главную" to="/home">
                <LogoSmall />
              </Link>
            </div>
            <Link to="/catalog" className="header-right_catalog">
              <img src={burgerC} alt="burger" />
              Каталог
            </Link>
          </div>

          <ProductSearch newClasses={'header-search'} isInHeader />

          <div className="header-right">
            <div className="header-left_login" onClick={handleClickProfile}>
              <div className="header-left_block-text">
                <p>Добро пожаловать</p>
                {!user?.name ?
                  <span>Вход/Регистирация</span> :
                  <span>{user?.name}</span>
                }
              </div>
              <div className="avatarBlock">
                <img width={30} height={30} className='avatar' src={avatarImage} alt='your photo' />
              </div>
            </div>

            <div className={`header-left_login-modal scrollbar_primary ${openEnter ? "open" : ""}`}>
              <button
                aria-label="закрыть окно авторизации"
                className="close-button"
                onClick={handleCloseModal}
              />
              {(['loginWithPhone', 'loginWithEmail', 'register'].includes(enterMethod)) ? <LogIn /> :
                enterMethod === 'resetWithPhone' ? <Reset /> :
                  enterMethod === 'sendNewPassword' ? <SendNewPassword /> :
                    <EnterPopup
                      OpenLoginWithPhone={OpenLoginWithPhone}
                      OpenLoginWithEmail={OpenLoginWithEmail}
                    />
              }
            </div>
            <Link to="/basket">
              <div className="header-right_cartButton">
                <div className="header-right_market">
                  <MarketIcon />
                  <span className="market-count">
                    {cartQuantity}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div
            className={"header-burger " + isShowSidebar}
            onClick={() => {
              ShowCategoriesMobile();
            }}
          >
            <span className={"header-burger_line " + isShowSidebar}></span>
            <span className="header-burger__text">{isShowSidebar ? '' : 'Меню'}</span>
          </div>
        </div>
      </div>

      <MobileMenu displey={isShowSidebar} setShow={ShowCategoriesMobile} />
    </>
  );
};

export default Header;
