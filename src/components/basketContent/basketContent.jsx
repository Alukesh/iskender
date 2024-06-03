import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as NotificationIcon } from '../../components/icons/notification.svg';
// import BasketIcon from "../../components/icons/Shop.svg";
// import { transformPrice } from "../../utils/transformPrices";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "../../styles/pages/ManageOrders.scss";
import BasketTable from "../../components/BasketTable/BasketTable";
import { UseEnterShow } from "../../context/EnterContext";
import api, { createClientOrder } from "../../services/api";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import BasketItem from "../UI/BasketItem/BasketItem";
import { Toast } from "primereact/toast";

const BasketContent = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { setOpenEnter } = UseEnterShow();
  const { cart, user, prices, len, lenString } = useSelector(
    (state) => state.cart
  );
  const isClient = user.role === 'client' || !user.role;
  const isMobile = useCheckMobileScreen();
  const [bonusInput, setBonusInput] = useState("");
  const max_value = prices;
  useEffect(() => {
    dispatch.cart.countPrices();
    dispatch.cart.countLenString();
    dispatch.cart.countLen();
  }, [cart]);

  function handleOrder(params) {
    if (!user?.name) {
      window.scrollTo(0, 0);
      setOpenEnter(true);
    } else {
      SubmitOrders();
    }
  }
  const showToast = (msg) => {
    toast.current.show({
      detail: msg,
      className: 'toaster Gilroy-m',
      icon: <NotificationIcon style={{ marginRight: '36px' }} />
    });
  };
  const SubmitOrders = () => {
    const set = cart?.map((prod) => {
      return { id: prod.product._id, quantity: prod.count };
    });
    console.log("submit orders");
    createClientOrder({
      clientId: user?._id,
      points: bonusInput || 0,
      notes:
        "TEST_MOORE: remote time user main to agent updated, Optovik test, this test note from backend test",
      products: set,
      deliveryPlannedMoment: "2024-10-17 15:17:00",
      status: "949070dc-eb02-11ec-0a80-0234000c96a0",
    })
      .then((res) => {
        console.log(res);
        window.scrollTo(0, 0);
        dispatch.cart.setOrdersSuccessOnTrue();
        dispatch.cart.removeAllCart();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        api.get(`/getClient/${user?._id}`)
          .then(({ data }) => {
            dispatch.cart.afterLoginUser(data?.object)
          })
      })
  };
  function handleOrder(params) {
    if (!user?.name) {
      window.scrollTo(0, 0);
      setOpenEnter(true);
    } else {
      SubmitOrders();
    }
  }

  const handleBonusChange = (event) => {
    const value = event.target.value;
    if (isNaN(value)) return setBonusInput('');
    if (value >= user?.points) return showToast("недостаточно бонусов");
    if (value >= max_value) return showToast('Количество бонусов для списание превышает сумму заказа');

    if (value >= 0) {
      setBonusInput(value);
    }
  };


  return (
    <div className="manage_orders">      
      <Toast ref={toast}/>
      <div className="left">
        <h1 className="heading">Ваши товары ({lenString})</h1>
        {isMobile ? (
          cart.map((el) => <BasketItem el={el} key={el.product.id} isClient={isClient} />)
        ) : (
          <BasketTable cart={cart} />
        )}
      </div>

      <div className="right">
        <h1 className="heading details">Детали заказа</h1>

        <div className="form">
          <div className="form_bonus">
            <p className="form_label form_label__line">Бонусы к списанию</p>

            <div className="form_bonus__content justify-between">
              <p className="form_account__label">На вашем счету:</p>

              <p className="form_account__money">{user?.points || 0} c</p>
            </div>
          </div>
          {/*<div className='line'></div>*/}
          {/*<h3>Бонусы к списанию</h3>*/}
          <div className="bonus">
            {/*<p >*/}
            {/*  <span className='first'>На вашем счету:</span>*/}
            {/*  <span className='second'>{user?.points} сом</span>*/}
            {/*  /!*<span className='second noty'>{balance < 0 ? `-${balance}` : balance || 0} сом</span>*!/*/}
            {/*</p>*/}
            {/*<p style={{display: user.points > transformPrice(prices) ? "none" : "flex"}}>*/}
            {/*  <span className='first'>Не хватает на вашем счету:</span>*/}
            {/*  /!*<span className='second noty'>{balance < 0 ? `-${balance}` : balance || 0} сом</span>*!/*/}
            {/*  <span className='second noty'*/}
            {/*        >{transformPrice(prices) - user?.points} сом</span>*/}
            {/*</p>*/}
            <label htmlFor="annul">Сумма списания</label>
            <input
              value={bonusInput}
              onChange={handleBonusChange}
              type="text"
              id="annul"
            />

            <div className="form_sum" style={{ marginTop: '30px' }}>
              <p className="form_sum__label Gilroy-m black">Комментарии к заказу</p>
              <input type="text" className="form_account__input  Gilroy-m black" />
            </div>
          </div>

          <div className="form_results">
            <p className="form_label form_label__line">Итого</p>

            <div className="justify-between form_results__between">
              <p className="form_account__label grey">Кол-во товаров:</p>

              <p className="form_results__money">{lenString.replace(/\D/g, '')}</p>
            </div>

            <div className="justify-between">
              <p className="form_results__label">Итого</p>

              <p className="form_account__money">{prices} c</p>
            </div>
          </div>

          <button onClick={handleOrder} className="generic_button">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketContent;
