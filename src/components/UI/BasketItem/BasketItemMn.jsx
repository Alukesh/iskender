import { useState } from 'react';
import { ReactComponent as Plus } from '../../icons/plus.svg';
import { ReactComponent as Minus } from '../../icons/minus.svg';
import { ReactComponent as BrokeImage } from "../../../components/icons/brokeImage.svg"
import './BasketItem.scss';
import useCart from "../../../hooks/useCart";
import {useDispatch} from "react-redux";
import { baseURL } from '../../../services/api';

const BasketItemMn = ({ el ,setState }) => {
    const [options, setOptions] = useState(false);
    const dispatch = useDispatch();
    console.log(el);
    const {
        preventConextMenu,
        handleContextMenu,
        RemoveFromBasket,
        isAdded,
    } = useCart(el.productId, el.count);

    const handlePriceAndCount = (id) => {
        setState((prev) => {
            return {...prev,orderItems:prev?.orderItems?.map(item => item._id === id ? {...item,quantity:item.quantity + 1} : item )}
        })
    }
    const handleDelete = (id) => {
        console.log(id)
        setState((prev) => {
            return {...prev,orderItems:prev?.orderItems?.filter(item => item._id !== id)}
        })
    }
    const handlePriceMinusCount = (product) => {
        if(product.quantity <= 1){

        }
        else{
            setState((prev) => {
                return {...prev,orderItems:prev?.orderItems?.map(item => item._id === product._id ? {...item,quantity:item.quantity - 1} : item )}
            })
        }
    }
    const srcFromIp = (url) => {
        return String(url).replace('https://62.217.177.200:8080', baseURL)
    }
    const transformPrice = (price) => {
        return Number(price).toPrecision(4) / 100
    }

    // const handleDelete = () => dispatch.cart.removeFromCart(el)

    return (
        <div className='item'>
            <div className='top'>
                {el.productId?.image ?
                    <img
                        src={srcFromIp(el?.productId?.image)}
                        alt="#"
                        style={{objectFit:'contain'}}
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
                    <p>{el.productId?.name}</p>

                </div>
                <div className='points' onClick={() => setOptions(!options)}>
                    <div className='point'></div>
                    <div className='point'></div>
                    <div className='point'></div>
                    {options && (
                        <div className='options'>
                            <div className='opt first'>Редактирование комплекта</div>

                            <div className='line'></div>

                            <div className='opt second'>Перенести в сохраненные</div>

                            <div className='line'></div>

                            <div
                                className='opt third'
                                onClick={() => handleDelete(el._id)}
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
                <h2 className='price'>{el.productId.promoPrice > 0 ? el.productId.promoPrice : transformPrice(el.productId.price)} с</h2>
                <div className='quantity'>
                    <div
                        className='mathDiv'
                        onClick={() => {
                            handlePriceMinusCount(el)
                        }}
                        onContextMenu={preventConextMenu}
                    >
                        <Minus/>
                    </div>
                    <div className='quantity'>{el.quantity}</div>
                    <div
                        className={`mathDiv ${isAdded ? 'added' : ''}`}
                        onClick={() => handlePriceAndCount(el._id)}
                        onContextMenu={handleContextMenu}
                    >
                        <Plus />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasketItemMn;
