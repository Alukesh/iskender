import { useState } from 'react';
import { ReactComponent as Plus } from '../../icons/plus.svg';
import { ReactComponent as Minus } from '../../icons/minus.svg';
import { ReactComponent as BrokeImage } from "../../../components/icons/brokeImage.svg"
import './BasketItem.scss';
import useCart from "../../../hooks/useCart";
import { useDispatch } from "react-redux";
import { baseURL } from '../../../services/api';

const BasketItem = ({ el, isClient }) => {
  const [options, setOptions] = useState(false);
  const dispatch = useDispatch();
  // console.log(el);
  const {
    preventConextMenu,
    handleContextMenu,
    RemoveFromBasket,
    isAdded,
  } = useCart(el.product, el.count);

  const handlePriceAndCount = () => {
    if (el.count < el.product.quantity) {
      dispatch.cart.increment(el)
      dispatch.cart.countPrices()
    }
  }

  const srcFromIp = (url) => {
    return String(url).replace('https://62.217.177.200:8080', baseURL)
  }
  const transformPrice = (price) => {
    return Number(price).toPrecision(4) / 100
  }
  const checkForProductsPrice = (product) => {
    return (product?.salePriceTypesSimple[2]) ?
      transformPrice(isClient ? Math.round(Number(product?.salePriceTypesSimple[2].value)) : product?.price) :
      transformPrice(isClient ? Math.round(Number(product?.promoPrice)) : product?.price)
  }

  const handleDelete = () => dispatch.cart.removeFromCart(el)

  return (
    <div className='item'>
      <div className='top'>
        {el.product?.image ?
          <img
            src={srcFromIp(el?.product?.image)}
            alt="#"
            style={{ objectFit: 'contain' }}
            width={80}
            height={80}
            className="img"
          /> :
          <img
            src={BrokeImage}
            className="img"
            width={80}
            height={80}
          />
        }
        <div className='title'>
          <p>{el.product.name}</p>
        </div>
        <div className='points' onClick={() => setOptions(!options)}>
          <div className='point'/>
          <div className='point'/>
          <div className='point'/>
          {options && (
            <div className='options'>
              <div className='opt first'>Редактирование комплекта</div>

              <div className='line'></div>

              <div className='opt second'>Перенести в сохраненные</div>

              <div className='line'></div>

              <div
                className='opt third'
                onClick={handleDelete}
              >
                Удалить
              </div>

              <div className='line'></div>

              <div className='opt fourth'>Отмена</div>
            </div>
          )}

        </div>
      </div>
      <div className='bottom'>
        <h2 className='price'>{checkForProductsPrice(el.product)} с</h2>
        <div className='quantity'>
          <div
            className='mathDiv'
            onClick={() => {
              if (el.count > 1) {
                dispatch.cart.decrement(el)
              }
            }}
            onContextMenu={preventConextMenu}
          >
            <Minus />
          </div>
          <div className='quantity'>{el.count}</div>
          <div
            className={`mathDiv ${isAdded ? 'added' : ''}`}
            onClick={handlePriceAndCount}
            onContextMenu={handleContextMenu}
          >
            <Plus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
