import React from 'react'
import { ReactComponent as IconProductDefault } from '../icons/product-default.svg';
import { ReactComponent as TrashIcon } from "../icons/Trash Bin.svg";
import { ReactComponent as MinusIcon} from "../icons/minus.svg";
import { ReactComponent as Plus } from "../icons/plus.svg";
import { useDispatch, useSelector } from 'react-redux';
import { transformPrice } from '../../utils/transformPrices';
import useCart from './../../hooks/useCart';
import BrokeImage from "../../components/icons/brokeImage.svg"
import styles from '../BasketTable/BasketTable.module.scss'
import { Link } from 'react-router-dom';
import { baseURL } from '../../services/api';
import transliterate from '../../transliteration';

const BasketTableItem = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.cart)
  const isManager = user.role === 'manager';
  const {
    preventConextMenu,
    handleContextMenu,
    RemoveFromBasket,
    isAdded,
  } = useCart(product.product);

  const handlePriceAndCount = () => {
    if (product.count < product.product.quantity) {
      dispatch.cart.increment(product)
      dispatch.cart.countPrices()
    }
  }
  const srcFromIp = (url) => {
    return String(url).replace('https://62.217.177.200:8080', baseURL)
  }
  const handleDelete = () => {
    dispatch.cart.removeFromCart(product)
    dispatch.cart.countPrices()
    dispatch.cart.countLenString()
  }


  const handleProductClick = (categoryId, productId) => {
    dispatch.selectCategories.setCategoryId(categoryId);
    dispatch.selectProducts.setProductId(productId);
  };

  if (!product.product) return null
  return (
    <div className={styles.table_item}>
      <Link
        to={{
          pathname: product.product && product.product.category && product.product.category._id ?
            `/catalog/${transliterate(product.product.category.name)}/${transliterate(product.product.name)}` :
            `/catalog/product/${transliterate(product.product.name)}`,
        }}
        onClick={() => handleProductClick(product.product.category._id, product.product._id)}
        className={styles.table_item__image}
      >

        <img
          src={product.product?.image ?
            srcFromIp(product?.product?.image) :
            BrokeImage
          }
          alt={product.product?.name}
          className="img"
        // style={{objectFit:'contain', width:'100%'}}
        />
      </Link>

      <Link
        to={{
          pathname: product.product && product.product.category && product.product.category._id ?
            `/catalog/${transliterate(product.product.category.name)}/${transliterate(product.product.name)}` :
            `/catalog/product/${transliterate(product.product.name)}`,
        }}
        onClick={() => handleProductClick(product.product.category._id, product.product._id)}
        className={styles.table_item__name}>
        {product.product.name.length > 34
          ? product.product?.name.substring(0, 34) + '...'
          : product.product?.name
        }
      </Link>

      <div className={styles.table_item__quantity}>
        <div
          className={styles.mathDiv}
          onClick={() => {
            if (product.count > 1) dispatch.cart.decrement(product)
            dispatch.cart.countPrices()
          }}
          onContextMenu={preventConextMenu}
        >
          <MinusIcon />
        </div>
        <div className={styles.quantity}>{product.count}</div>
        <div
          className={`${styles.mathDiv} ${isAdded ? styles.added : ''}`}
          onClick={handlePriceAndCount}
          onContextMenu={handleContextMenu}
        >
          <Plus />
        </div>
      </div>

      <p className={styles.table_item__price}>
        {
          isManager ?
            product.product.promoPrice > 0 ? Math.round(product.product.promoPrice) + 'c' : Math.round(Number(product.product?.price).toPrecision(4) / 100)
            :
            product.count ?
              product.product.promoPrice > 0 ? Math.round(product.product.promoPrice) * product.count + 'c' : Math.round(Number(product?.product.salePriceTypesSimple[2].value).toPrecision(4) / 100) * product.count
              :
              product.product.promoPrice > 0 ? Math.round(product.product.promoPrice) + 'c' : Math.round(Number(product?.product.salePriceTypesSimple[2].value).toPrecision(4) / 100)
        }
        {/*{product.product.promoPrice > 0 ? product.product.promoPrice : transformPrice(product.product.price)} c*/}
      </p>

      <TrashIcon onClick={handleDelete} />
    </div>
  )
}

export default BasketTableItem
