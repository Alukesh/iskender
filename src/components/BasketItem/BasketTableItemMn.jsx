import React from 'react'
import { ReactComponent as IconProductDefault } from '../icons/product-default.svg';
import { ReactComponent as TrashIcon } from "../icons/Trash Bin.svg";
import { ReactComponent as Minus } from "../icons/minus.svg";
import { ReactComponent as Plus } from "../icons/plus.svg";
import {useDispatch, useSelector} from 'react-redux';
import { transformPrice } from '../../utils/transformPrices';
import useCart from './../../hooks/useCart';
import BrokeImage from "../../components/icons/brokeImage.svg"
import styles from '../BasketTable/BasketTable.module.scss'
import { Link } from 'react-router-dom';
import { baseURL } from '../../services/api';
import transliterate from '../../transliteration';

const BasketTableItemMn = ({product,setState}) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.cart)
    const isManager = user.role === 'manager';
    const {
        preventConextMenu,
        handleContextMenu,
        RemoveFromBasket,
        isAdded,
    } = useCart( product.productId);

    const handlePriceAndCount = (id) => {
        setState((prev) => {
            return {...prev,orderItems:prev?.orderItems?.map(item => item._id === id ? {...item,quantity:item.quantity + 1} : item )}
        })
    }


    const srcFromIp = (url) => {
        return String(url).replace('https://62.217.177.200:8080', baseURL)
    }
    const handleDelete = (id) => {
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

    const handleProductClick = (categoryId,  productId) => {
        dispatch.selectCategories.setCategoryId(categoryId);
        dispatch.selectProducts.setProductId(productId);
    };
    if(!product) return null
    return (
        <div className={styles.table_item}>
            <Link
                to={{
                    pathname:  product.productId &&  product.productId.category &&  product.productId.category._id ? `/catalog/${transliterate( product.productId.category?.name)}/${transliterate( product.productId?.name)}` : `/catalog/ productId/${transliterate( product.productId?.name)}`,
                    // search: `?name=${encodeURIComponent( productId. productId.name.replace(/\s/g, '-'))}`,
                }}
                onClick={() => handleProductClick( product.productId.category._id,  product.productId._id)}
                className={styles.table_item__image}
            >

                { product.productId?.image ?
                    <img
                        src={srcFromIp( product?.productId?.image)}
                        alt="#"
                        // style={{objectFit:'contain', width:'100%'}}
                        className="img"
                    /> :
                    <img
                        src={BrokeImage}
                        className="img"
                    />
                }
            </Link>

            <Link
                to={{
                    pathname:  product?.productId &&  product.productId?.category &&  product.productId.category._id ? `/catalog/${transliterate( product.productId.category?.name)}/${transliterate( product.productId?.name)}` : `/catalog/ productId/${transliterate( product.productId?.name)}`,
                    // search: `?name=${encodeURIComponent( productId. productId.name.replace(/\s/g, '-'))}`,
                }}
                onClick={() => handleProductClick( product.productId.category._id,  product.productId._id)}
                className={styles.table_item__name}>
                { product.productId.name.length > 34
                    ?  product.productId?.name.substring(0, 34) + '...'
                    :  product.productId?.name
                }
            </Link>
            <div className={styles.table_item__quantity}>
                <div
                    className={styles.mathDiv}
                    onClick={() => {
                        handlePriceMinusCount(product)
                    }}
                    onContextMenu={preventConextMenu}
                >
                    <Minus />
                </div>
                <div className={styles.quantity}>{product.quantity}</div>
                <div
                    className={`${styles.mathDiv} ${isAdded ? styles.added : ''}`}
                    onClick={() => handlePriceAndCount(product._id)}
                >
                    <Plus />
                </div>
            </div>

            <p className={styles.table_item__price}>
                {
                    isManager ?
                         product.productId.promoPrice > 0 ? Math.round( product.productId.promoPrice) + 'c' : Math.round(Number( product.productId?.price).toPrecision(4) / 100) :  product.productId.promoPrice > 0 ? Math.round( product.productId.promoPrice) + 'c' : Math.round(Number( product?.productId.salePriceTypesSimple[2].value).toPrecision(4) / 100)
                }
            </p>
            <TrashIcon onClick={() => handleDelete(product._id)} />
        </div>
    )
}

export default BasketTableItemMn
