import React, { useMemo, useState } from 'react';
import { ReactComponent as Icon } from '../../../components/icons/Frame 48095518.svg';
import '../../../styles/components/OrderHistory.scss';
import EmptySection from "../../EmptySection/EmptySection";
import clock_icon from '../../icons/clock-nohistory.svg';
import useCheckMobileScreen from "../../../hooks/useCheckMobileScreen";
import TopNavMobile from "../../TopNavMobile/TopNavMobile";
import { locale, addLocale } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import api from '../../../services/api';
import OrderItemLink from '../../OrderItemLink/OrderItemLink';

const ManagerOrdersHistory = () => {
  const { data: orderList } = useQuery(
    'orders',
    () => api.get(`/orders/${'65a26f1cf32e6690cfa98c3f'}`).then((res) => res.data.data),
  );
  const sortedProducts = useMemo(() => {
    const sorted = {}
    orderList?.sort((a, b) => {
      const dateA = new Date(a.moment).getTime();
      const dateB = new Date(b.moment).getTime();
      return dateB - dateA
    }).forEach((order) => {
      const dateOfOrder = String(order.moment).slice(0, 10)?.split('-').reverse().join('.')
      if (!sorted[dateOfOrder]) {
        sorted[dateOfOrder] = [order]
        return
      }
      sorted[dateOfOrder].push(order)
    });
    return Object.entries(sorted)
  }, [orderList]);

  // console.log(orderList, 'sorted => ', sortedProducts);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const isMobile = useCheckMobileScreen();
  addLocale('ru', {
    firstDayOfWeek: 1,
    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayNamesShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    dayNamesMin: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
    monthNames: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    monthNamesShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    today: 'Сегодня',
    clear: 'Очистить',
  });
  locale('ru')



  return (
    <div className='orders_history'>
      {isMobile &&
        <TopNavMobile title='История заказов' additionalClass='profileEdit_nav' />
      }

      <h1 className='Gilroy-w'>История заказов</h1>
      <div className='date_order'>
        <span className='gray_text'>Выберите даты:</span>
        <div className='dates'>
          <Calendar className='datepicker' value={startDate} onChange={(e) => setStartDate(e.value)} />
          <Calendar className='datepicker' value={endDate} onChange={(e) => setEndDate(e.value)} />
        </div>
        <div className='orders'>

          {sortedProducts?.length !== 0
            ? sortedProducts?.map(([date, orders]) => (
              <React.Fragment key={date}>
                <span className='gray_text'>{date}</span>
                {orders.map(el => (
                  <OrderItemLink key={el._id} icon={<Icon />} el={el} />
                ))}
                <br />
              </React.Fragment>
            ))
            : <EmptySection icon={clock_icon} title='История заказов пустая' />
          }
        </div>
      </div>
    </div>
  );
};

export default ManagerOrdersHistory;
