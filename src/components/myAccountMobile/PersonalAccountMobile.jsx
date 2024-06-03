import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Favourites from "../myAccount/pages/Favourites";
import OrderHistory from "../myAccount/pages/OrderHistory";
import PrivacyPolicy from "../myAccount/pages/PrivacyPolicy";
import ProfileMobile from "./pages/ProfileMobile";
import ProfileEditMobile from "./pages/ProfileEditMobile";
// import NavBarMobile from "../NavBarMobile/NavBarMobile";
import { useSelector } from 'react-redux';
import ManagerOrdersHistory from '../myAccount/pages/ManagerOrdersHostory';
import ManageClientOrders from '../../pages/ManagerClientOrders';

const PersonalAccountMobile = () => {
  const { user } = useSelector(state => state.cart)
  const isManager = user.role === 'manager';

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('isk user')).name) {
      window.location.pathname = '/home'
    }
  }, [user])
  // useEffect(() => {
  //   setIsProfile(location.pathname === '/my-account' || location.pathname === '/my-account/')
  // }, [location.pathname])
  return (
    <>
      <Routes>
        <Route path='/' element={<ProfileMobile />} />
        <Route path='/edit' element={<ProfileEditMobile />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/order-history' element={<OrderHistory />} />
        <Route path='/manager-history' element={isManager ? <ManagerOrdersHistory /> : ""} />
        <Route path='/manager-history/*' element={isManager ? <ManageClientOrders /> : ""} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      </Routes>

      {/* {isProfile
        ? ''
        : <NavBarMobile />
      } */}
    </>
  );
};

export default PersonalAccountMobile;