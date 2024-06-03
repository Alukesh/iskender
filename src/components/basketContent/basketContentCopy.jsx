import React, { useState, useEffect } from 'react';
import { ReactComponent as TrashIcon } from '../icons/Trash Bin.svg';
import BasketItem from '../UI/BasketItem/BasketItem.jsx';
import '../../styles/components/basket.scss';
import { useDispatch, useSelector } from "react-redux";
import { UseEnterShow } from './../../context/EnterContext';
import { useLocation } from 'react-router-dom';
import { transformPrice } from './../../utils/transformPrices';
import BasketTable from '../BasketTable/BasketTable.jsx';
import { baseURL, createClientOrder } from '../../services/api/index.js';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen.js';
import BrokeImage from "../../components/icons/brokeImage.svg"

const BasketContent = () => {
  const { setOpenEnter } = UseEnterShow();
  const dispatch = useDispatch();
  const { cart, user, prices, lenString, orderSuccess } = useSelector(state => state.cart);
  const [click, setclick] = useState(false);
  const balance = user?.balance || 0

  const isMobile = useCheckMobileScreen();
  // const removeFromCart = (productId) => {
  //   dispatch.cart.removeFromCart(productId);
  // };
  useEffect(() => {
    dispatch.cart.countPrices()
    dispatch.cart.countLenString()
    dispatch.cart.countLen()
    dispatch.cart.setOrdersSuccessOnFalse()
    console.log(orderSuccess);
  }, [cart])

  const openAsk = () => {
    setclick(true);
  };

  const closeAsk = () => {
    setclick(false);
  };
  const clearCart = () => {
    closeAsk()
    dispatch.cart.removeAllCart()
    dispatch.cart.countPrices(); // Обновление цен после удаления продукта

  }
  const SubmitOrders = () => {
    const set = cart?.map(prod => {
      return { id: prod.product._id, quantity: prod.count }
    })
    console.log(user, cart);
    console.log(set);
    // deliveryPlannedMoment: 2024-09-08 22:19:00
    // status: '20ac279a-08ba-11ed-0a80-06490018891f'
    createClientOrder({
      clientId: user?._id,
      points: 0,
      notes: 'TEST_MOORE: remote time user main to agent updated, Optovik test, this test note from backend test',
      products: set,
      deliveryPlannedMoment: '2024-10-17 15:17:00',
      status: '5ca5f71d-bfc5-11ed-0a80-00c300161a21'
    })
      // [{"id":"65798368f6bb9d336aea6f6f","quantity":1}],
      .then(res => {
        console.log(res);
        window.scrollTo(0,0)
        dispatch.cart.setOrdersSuccessOnTrue()
        dispatch.cart.removeAllCart()
      })
      .catch(err => console.log(err))
  }
  function handleOrder(params) {
    if (!user?.name) {
      window.scrollTo(0, 0)
      setOpenEnter(true)
    } else {
      SubmitOrders()
    }
  }
  const srcFromIp = (url) => {
    return String(url).replace('https://62.217.177.200:8080', baseURL)
  }
  return (
    <>
      <div className='delete'>
        <div onClick={openAsk}>
          <TrashIcon />
        </div>
        {click && (
          <div className='ask'>
            <p>Вы действительно хотите очистить корзину?</p>
            <div className='btns'>
              <button className='clear' onClick={clearCart}>Очистить</button>
              <button className='cencel' onClick={closeAsk}>
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>

      <div className='content'>
        <div className='content_left'>

          {isMobile ? cart.map((el) => (
            <BasketItem el={el} key={el.product.id} />
          )) :
            <BasketTable cart={cart}/>
          }
        </div>


        <div className='content_right'>
          <div className='orders'>
            <div className='orders_left'>
              <p>Сумма заказа:</p>
              <div className='images'>
                {cart.map((obj, id) => {
                  const zIndex = id === cart.length ? cart.length : cart.length - 1; // Check if it's the first element
                  const left = 20 * id; // Increase left by 20px each iteration

                  return (
                    <img
                      key={id}
                      src={obj.product.image ? srcFromIp(obj.product.image) : BrokeImage}
                      alt='#'
                      className='orders-icon'
                      style={{ zIndex, left }}
                    />
                  );
                })}
              </div>
            </div>
            <div className='orders_right'>
              <h4>{transformPrice(prices)} сом</h4>
              <p>{lenString}</p>
            </div>
          </div>
          <div className='line'></div>
          <h3>Бонусы к списанию</h3>
          <div className='bonus'>
            <p>
              <span className='first'>На вашем счету:</span>
              <span className='second'>{user?.points} сом</span>
              {/* <span className='second'>{balance < 0 ? `-${balance}` : balance || 0} сом</span> */}
            </p>
            <label htmlFor='annul'>Cколько списать</label>
            <input type='text' id='annul' />
          </div>

          <div className='quantity'>
            <p>
              <span className='first'>Кол-во товаров:</span>
              <span className='second'>{lenString}</span>
            </p>
            <p>
              <span className='third'>Общая сумма:</span>
              <span className='fourth'>{transformPrice(prices)} сом</span>
            </p>
            <button onClick={handleOrder}>Оформить заказ</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasketContent;


