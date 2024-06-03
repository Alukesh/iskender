import React from 'react';
import { transformPrice } from './../../utils/transformPrices';
import { Link } from 'react-router-dom';
import transliterate from '../../transliteration';
import {useDispatch} from "react-redux";

const OrderItemLink = ({icon, el, name}) => {
    const dispatch = useDispatch()
  const orderStatuses = {
    'Новый': '#E68116',
    'Резерв не собирать': '#6F4BFF',
    'Подтвержден юг': '#0063A9',
    'Самовывоз': '#7EC0EE',
    'Отгружен': '#82CF6F',
    'Отменен': '#000'
  }
  // console.log(el);
  // console.log(new Date(el.date).getTime());
  const statusColor = orderStatuses[el.statusName]
  const orderer = name ? name : `${el?.clientId?.name} ${el.clientId?.middleName?.slice(0,1) || ''}`
  return (
      <Link to={`/my-account/manager-history/client-${transliterate(el?.clientId?.name) || ''}`} onClick={() => {
          dispatch.orders.changeUserId(el._id)
          localStorage.setItem("orderId",el._id)
      }} className='order' key={el.id}>
        <div className='user'>
          {icon}
          <div className='user__name'>
            <p>{orderer}</p>
            <span>{el.name}</span>
          </div>
        </div>
        <h3>{String(transformPrice(el.sum)).replace(/\B(?=(?:\d{3})*$)/g, ' ')} {el.currency}</h3>
        <div className='button_wrap'>
          <button className={'first'} style={{backgroundColor: statusColor}}>{el.statusName}</button>
        </div>
      </Link>
  );
};

export default OrderItemLink;