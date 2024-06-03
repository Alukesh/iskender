import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as WalletIcon } from "../components/icons/wallet.svg";
import BasketIcon from "../components/icons/Shop.svg";
import { ReactComponent as NotificationIcon } from '../components/icons/notification.svg';
import { statuses } from "../utils/orderStatuses";
import { createClientOrder } from "../services/api";
import { ReactComponent as SuccessOrder } from "../components/icons/seccess-order.svg";
import ManagerClientsInput from "../components/ManagerInput/ManagerClientsInput";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "../styles/pages/ManageOrders.scss";
import BasketTable from "../components/BasketTable/BasketTable";
import { transformPrice } from "../utils/transformPrices";
import ManagerInput from "./../components/ManagerInput/ManagerInput";
import useCheckMobileScreen from "../hooks/useCheckMobileScreen";
import BasketItem from "../components/UI/BasketItem/BasketItem";
import { Toast } from "primereact/toast";

const ManageOrders = () => {
  const dispatcher = useDispatch();
  const toast = useRef(null);
  const {
    cart,
    user: manager,
    prices,
    len,
    lenString,
    orderSuccess,
  } = useSelector((state) => state.cart);
  const showToast = (msg) => {
    toast.current.show({
      // severity: 'info',
      detail: msg,
      className: 'toaster Gilroy-m',
      icon: <NotificationIcon style={{ marginRight: '36px' }} />
    });
  };

  const [user, setUser] = useState(null);
  const [isDelegatedCustomer, setIsDelegatedCustomer] = useState(null);
  const [status, setStatus] = useState(null);
  const [bonusInput, setBonusInput] = useState("");
  const max_value = transformPrice(prices);

  const isMobile = useCheckMobileScreen();

  useEffect(() => {
    dispatcher.cart.countPrices();
    dispatcher.cart.countLenString();
    dispatcher.cart.countLen();
    dispatcher.cart.setOrdersSuccessOnFalse();
  }, []);

  if (orderSuccess) {
    return (
      <div className="emptyBasket">
        {/* <img src={SuccessOrder} alt="" /> */}
        <SuccessOrder/>
      </div>
    );
  }


  const handleBonusChange = (event) => {
    const value = event.target.value;
    if (isNaN(value)) return setBonusInput('');
    if (value >= user?.bonusPoints?? manager?.points) return showToast("недостаточно бонусов");
    if (value >= max_value) return showToast('Количество бонусов для списание превышает сумму заказа');

    if (value >= 0) {
      setBonusInput(value);
    }
  };
  const SubmitOrders = () => {
    if (!status) return showToast('Не выбран статус заказа');
    const set = cart?.map((prod) => {
      return { id: prod.product._id, quantity: prod.count };
    });
    createClientOrder({
      clientId: user?.id || manager?._id,
      userId: manager?._id,
      points: bonusInput || 0,
      notes: "",
      products: set,
      deliveryPlannedMoment: "2024-10-17 15:17:00",
      status: status.id,
    })
      .then((res) => {
        window.scrollTo(0, 0);
        dispatcher.cart.setOrdersSuccessOnTrue();
        dispatcher.cart.removeAllCart();
      })
      .catch((err) => console.log(err));
  };

  const renderClients = (item, handleClick) => {
    return (
      <div class="client_item  Gilroy-n" onClick={() => handleClick(item)}>
        <p className="text"> {item?.name.substring(0, 30) + "..."}</p>
        {item?.phone && <p className="text">{item?.phone.split(',')[0]}</p>}
        <WalletIcon />
      </div>
    );
  };

  const renderOrderStatuses = (item, handleClick) => {
    return (
      <p
        className="status_item"
        style={{ background: item.color }}
        onClick={() => handleClick(item)}
      >
        {item.text}
      </p>
    );
  };

  const clientsClickValue = (item) => {
    setUser(item);
    item ? setIsDelegatedCustomer(true) : setIsDelegatedCustomer(false);
    setBonusInput('')
// console.log(item);
    return item?.name;
  };

  const orderStatusesClickValue = (item) => {
    setStatus(item);
    return item.text;
  };

  return (
    <div className="manage_orders">
      <Toast
        ref={toast}
      />
      <div className="left">
        <h1 className="heading Gilroy-b black">Ваши товары ({lenString})</h1>

        {!cart.length ? (
          <div className="emptyBasket">
            <img src={BasketIcon} alt="" />
            <p>Корзина пустая</p>
          </div>
        ) : isMobile ? (
          cart.map((el) => <BasketItem el={el} key={el.product.id} />)
        ) : (
          <BasketTable cart={cart} />
        )}
      </div>

      {cart.length ?
        <div className="right">
          <h2 className="heading details Gilroy-b black">Детали заказа</h2>

          <div className="form">
            <ManagerClientsInput
              label="Выберите клиента"
              isClient={true}
              renderJsx={renderClients}
              clickValue={clientsClickValue}
            />

            <ManagerInput
              label="Выберите статус заказа"
              data={statuses}
              renderJsx={renderOrderStatuses}
              clickValue={orderStatusesClickValue}
              customClass="statuses"
            />

            <div className="form_bonus">
              <p className="form_label  Gilroy-n form_label__line">Бонусы к списанию</p>

              <div className="form_bonus__content justify-between">
                <p className="form_account__label Gilroy-m black">
                  { isDelegatedCustomer ? 'На счету клиента' : 'На вашем счету:' }
                </p>

                <p className="form_account__money Gilroy-m ">
                  { isDelegatedCustomer ? user?.balance : manager?.points } c
                  </p>
              </div>
            </div>

            <div className="form_sum">
              <p className="form_sum__label Gilroy-m black">Сумма списания</p>

              <input
                value={bonusInput}
                onChange={handleBonusChange}
                className="form_account__input  Gilroy-m black"
                type="text"
                id="annul"
              />
            </div>
            <div className="form_sum">
              <p className="form_sum__label Gilroy-m black">Комментарии к заказу</p>

              <input type="text" className="form_account__input  Gilroy-m black" />
            </div>

            <div className="form_results">
              <p className="form_label  Gilroy-n form_label__line">Итого</p>

              <div className="justify-between form_results__between">
                <p className="form_account__label grey">Кол-во товаров:</p>

                <p className="form_results__money Gilroy-m ">{lenString.replace(/\D/g, '')}</p>
              </div>

              <div className="justify-between">
                <p className="form_results__label Gilroy-b">Итого</p>

                <p className="form_account__money">{transformPrice(prices)} c</p>
              </div>
            </div>

            <button className="generic_button Gilroy-m " onClick={SubmitOrders}>
              Оформить заказ
            </button>
          </div>
        </div>
        : ''}

    </div>
  );
};

export default ManageOrders;
