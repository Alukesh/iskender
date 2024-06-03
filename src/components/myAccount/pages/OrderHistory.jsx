import React, { useMemo, useState } from 'react';
import { ReactComponent as Icon } from '../../../components/icons/Frame 48095518.svg';
import '../../../styles/components/OrderHistory.scss';
import OrderItem from "../../OrderItem/OrderItem";
import EmptySection from "../../EmptySection/EmptySection";
import clock_icon from '../../icons/clock-nohistory.svg';
import useCheckMobileScreen from "../../../hooks/useCheckMobileScreen";
import TopNavMobile from "../../TopNavMobile/TopNavMobile";
import { locale, addLocale } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import api from '../../../services/api';

const OrderHistory = () => {
  const { user } = useSelector(store => store.cart)
  const { data: orderList, } = useQuery(
    'orderHistory',
    () => api.get(`sklad/client/order/${user?._id}`).then((res) => res.data),
    { enabled: user?._id !== undefined }
  );

  const sortedProducts = useMemo(() => {
    const sorted = {}
    orderList?.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA
    }).forEach((order) => {
      const dateA = String(order.date).slice(0, 10).split('-').reverse().join('.')
      if (!sorted[dateA]) {
        sorted[dateA] = [order]
        return
      }
      sorted[dateA].push(order)
      // console.log(dateA);
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

      <h1 className=' Gilroy-w'>История заказов</h1>
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
                {orders.map((el, id) => (
                  <OrderItem icon={<Icon />} el={el} key={id} name={user?.name} />
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

export default OrderHistory;

{/* <span className='gray_text'>15.10.2023</span>
  {orderList?.length !== 0
    ? orderList?.map(el => <OrderItem icon={<Icon />} el={el} name={user?.name} />)
    : <EmptySection icon={clock_icon} title='История заказов пустая' />
  } */}