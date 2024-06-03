import React, { Suspense, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Breadcrumbs from './Breadcrumbs';
import { Outlet, useLocation } from 'react-router-dom';
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import '../../styles/layout/wrapper.scss'
import Plug from '../../Plug';
import SitePreloader from '../../pages/SitePreloader';

const Layout = () => {
  const isMobile = useCheckMobileScreen();
  const location = useLocation();
  const isHomePage = location.pathname === '/home' || location.pathname === '/';
  const isAccountPage = location.pathname.includes('my-account');

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  if (isMobile && isAccountPage) {
    return (
      <Suspense fallback={<SitePreloader/>}>
        <div className={'main-background' + (isHomePage ? ' homeM' : '')}>
          <Header />
          <div className='container accountM'>
            <Outlet />
            <SitePreloader/>
          </div>
          <Footer />
        </div>
      </Suspense>
    )
  } else {
    return (
      <Suspense fallback={<SitePreloader/>}>
      <div className={'main-background' + (isHomePage ? ' homeM' : '')}>
        <Header />
        <div className='container'>
          <Breadcrumbs />
          <Outlet />
          <SitePreloader/>
        </div>
        <Footer />
      </div>
      </Suspense>
    );
  }
};

export default Layout;
