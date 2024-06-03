import React, {useEffect, useState} from "react";
// import {ReactComponent as ArrowDown} from "../components/icons/arrow-down.svg";
// import {ReactComponent as XIcon} from "../components/icons/x.svg";
import {ReactComponent as WalletIcon} from "../components/icons/wallet.svg";
import { ReactComponent as BasketIcon } from '../components/icons/Shop.svg'
import {statuses} from '../utils/orderStatuses'

import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useClients} from "../hooks/useClients";

import "../styles/pages/ManageOrders.scss";
import BasketTable from "../components/BasketTable/BasketTable";
import {transformPrice} from '../utils/transformPrices';
import ManagerInput from '../components/ManagerInput/ManagerInput';
import useCheckMobileScreen from "../hooks/useCheckMobileScreen";
import BasketItem from "../components/UI/BasketItem/BasketItem";
import ProductSearch from "../components/ProductSearch/ProductSearch";
import {useQuery} from "react-query";
import api from "../services/api";
import BasketItemMn from "../components/UI/BasketItem/BasketItemMn";

const ManageClientOrders = () => {
    const {data: clients} = useClients()
    const isMobile = useCheckMobileScreen();
    const dispatcher = useDispatch();
    const {cart, user, prices, len, lenString} = useSelector(state => state.cart);
    const {userId} = useSelector(state => state.orders);
    const { data: orderList } = useQuery(
        ['getOrder', userId],
        () => api.get(`/getOrder/${userId}`).then((res) => res.data.data),
        { enabled: true }
    );
    const [state, setState] = useState(orderList)
    useEffect(() => {
        setState(orderList)
    }, [orderList])
    useEffect(() => {
        dispatcher.cart.countPrices()
        dispatcher.cart.countLenString()
        dispatcher.cart.countLen()
    }, [])
    console.log(state)
    const renderClients = (item, handleClick) => {
        return (
            <div class="client_item" onClick={() => handleClick(item)}>
                <p className="text">{item.user.lastName} {item.user.name.substring(0, 12) + '...'}</p>
                <p className="text">{item.user.phone}</p>
                <WalletIcon/>
            </div>
        )
    }

    const renderOrderStatuses = (item, handleClick) => {
        return (
            <p className="status_item" style={{background: item.color}} onClick={() => handleClick(item)}>
                {item.text}
            </p>
        )
    }

    const clientsClickValue = (item) => {
        return item.user.lastName + ' ' + item.user.name
    }
    const orderStatusesClickValue = (item) => {
        return item.text
    }
    const handlerChangeOrder = (product) => {
        api.patch(`/orders/${product._id}`, product)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
    const price = state?.orderItems?.reduce((acc, rec) => (+rec.productId.price * rec.quantity) + acc, 0)
    return (
        <div className='manage_orders clients'>
            <div className='left'>
                <h1 className="heading">
                    Товары ({state?.orderItems?.length})
                </h1>
                <div className="manager__label">
                    <span className={"manager__search"}>
                        Добавить товар
                    </span>
                    <ProductSearch setState={setState} prod={true}/>
                </div>
                {!state?.orderItems?.length
                    ? <div className='emptyBasket'>
                        <img src={BasketIcon} alt=''/>
                        <p>Корзина пустая</p>
                    </div>
                    : isMobile ? state?.orderItems && state?.orderItems?.length > 0 ?
                        state?.orderItems.map((el) => (<BasketItemMn setState={setState} el={el} key={el.productId._id}/>)):
                        cart.map((el) => (<BasketItem el={el} key={el.product.id}/>))
                    : <BasketTable cart={state} setState={setState}/>
                }
            </div>

            <div className='right'>
                <h1 className="heading details">
                    Детали заказа
                </h1>

                <div className="form">
                    <label htmlFor="" style={{width: "100%"}}>
                    <span className="form_label">
                        Выберите клиента
                    </span>
                        <input className="form_select__input apps" type="text" value={orderList?.clientId?.name}/>
                    </label>
                    <ManagerInput
                        state={state}
                        setState={setState}
                        label='Выберите статус заказа'
                        data={statuses}
                        renderJsx={renderOrderStatuses}
                        clickValue={orderStatusesClickValue}
                        customClass='statuses'
                    />

                    <div className="form_bonus">
                        <p className="form_label form_label__line">
                            Бонусы к списанию
                        </p>

                        <div className="form_bonus__content justify-between">
                            <p className="form_account__label">
                                На вашем счету:
                            </p>

                            <p className="form_account__money">
                                1200 c
                            </p>
                        </div>
                    </div>

                    <div className="form_sum">
                        <p className="form_sum__label">
                            Сумма списания
                        </p>

                        <input type="text" className="form_account__input"/>
                    </div>

                    <div className="form_results">
                        <p className="form_label form_label__line">
                            Итого
                        </p>

                        <div className="justify-between form_results__between">
                            <p className="form_account__label grey">
                                Кол-во товаров:
                            </p>

                            <p className="form_results__money">
                                {state?.orderItems?.length}
                            </p>
                        </div>

                        <div className="justify-between">
                            <p className="form_results__label">
                                Итого
                            </p>

                            <p className="form_account__money">
                                {Math.round(transformPrice(price))} c
                            </p>
                        </div>
                    </div>

                    <button className="generic_button">
                        Изменить заказ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageClientOrders;