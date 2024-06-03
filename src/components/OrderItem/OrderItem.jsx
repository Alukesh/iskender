import React from 'react';
import { transformPrice } from './../../utils/transformPrices';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

const OrderItem = ({icon, el, name}) => {
    const { user } = useSelector(state => state.cart);
  const orderStatuses = {
    'Новый': '#E68116',
    'Резерв не собирать': '#6F4BFF',
    'Подтвержден юг': '#0063A9',
    'Самовывоз': '#7EC0EE',
    'Отгружен': '#82CF6F',
    'Отменен': '#000',
  }
  // console.log(new Date(el.date).getTime());
  const statusColor = orderStatuses[el.stateName]
  return (
      <div  className='order' key={el.id}>
        <div className='user'>
          {icon}
          <div className='user__name'>
            <p>{name}</p>
            <span>{el.name}</span>
          </div>
        </div>
        <h3>{String(transformPrice(el.sum)).replace(/\B(?=(?:\d{3})*$)/g, ' ')} {el.currency}</h3>
        <div className='button_wrap'>
          <button className={'first'} style={{backgroundColor: statusColor}}>{el.stateName}</button>
        </div>
      </div>
  );
};

export default OrderItem;