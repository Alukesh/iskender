import React, { useEffect } from 'react';
import BasketContent from '../components/basketContent/basketContent';
import BasketIcon from '../components/icons/Shop.svg';
import SuccessOrder from '../components/icons/seccess-order.svg';

import '../styles/components/basket.scss';
import { useDispatch, useSelector } from "react-redux";

const Basket = () => {
  const dispatch = useDispatch();
  const { cart, orderSuccess } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch.cart.setOrdersSuccessOnFalse();
  }, [])

  // корзина после заказа
  if (orderSuccess) {
    return (
      <div className='emptyBasket'>
        <img src={SuccessOrder} alt='' />
      </div>
    )
  }
  if (cart.length >= 1) {
    return (
      <div className='basket-page-container'>
        <BasketContent />
      </div>
    );
  } else {
    return (
      <div className='emptyBasket'>
        <img src={BasketIcon} alt='' />
        <p>Корзина пустая</p>
      </div>
    );
  }
};



export default Basket;
