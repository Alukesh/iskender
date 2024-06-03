import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationPanel from '../components/myAccount/NavigationPanel';
import Profile from '../components/myAccount/pages/Profile';
import Favourites from '../components/myAccount/pages/Favourites';
import OrderHistory from '../components/myAccount/pages/OrderHistory';
import PrivacyPolicy from '../components/myAccount/pages/PrivacyPolicy';
import { useSelector } from 'react-redux';
import ManagerOrdersHistory from '../components/myAccount/pages/ManagerOrdersHostory';
import ManageClientOrders from './ManagerClientOrders';

const MyAccount = () => {
  const { user } = useSelector(store => store.cart)
  const isManager = user.role === 'manager';
  
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('isk user')).name) {
      window.location.pathname = '/home'
    }
  }, [user])
  return (
    <div className='my_account'>
      <NavigationPanel />
      <div className='my_account_pages'>
        <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/manager-history' element={isManager ? <ManagerOrdersHistory /> : <Profile />} />
          <Route path='/manager-history/*' element={<ManageClientOrders />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyAccount;
