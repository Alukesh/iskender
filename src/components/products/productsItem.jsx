import React from 'react';
import BrokeImage from "../../components/icons/brokeImage.svg";
import { ReactComponent as Plus } from '../icons/plus.svg';
import { ReactComponent as Minus } from '../icons/minus.svg';
import { ReactComponent as Heart } from '../icons/heart.svg';
import { ReactComponent as HeartFilled } from '../icons/heart_filled.svg';
import { useNavigate } from 'react-router-dom';
import useCart from "../../hooks/useCart";
import { LightTooltip } from "../LightTooltip/LightTooltip";
import { useDispatch, useSelector } from 'react-redux';
import ReturnUrlFromIp from '../../hooks/useReplaceUrl';
import transliterate from '../../transliteration';
import { transformPrice } from '../../utils/transformPrices';

const ProductsItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user, cart } = useSelector(store => store.cart)
  const { favourites } = useSelector(store => store.favourites)
  const quantityInCart = cart.find(x => x.product._id === product._id)?.count;
  const isClient = user.role === 'client' || !user.role;

  const {
    handleContextMenu,
    handleAddNow,
    handleRemoveNow,
    prompt,
    isAdded,
  } = useCart(product, quantityInCart);
  const isFavourite = () => {
    return favourites?.filter(prod => prod._id === product._id).length > 0
  }
  const HandleHeartClick = () => {
    if (isFavourite()) return dispatch.favourites.removeFromFavourites(product._id)
    dispatch.favourites.addToFavourites(product)
  }
  const checkForClientsPrice = (product) => {
    return (product?.salePriceTypesSimple[2]) ?
      transformPrice(isClient ? Number(product?.salePriceTypesSimple[2].value) : product.price) :
      transformPrice(isClient ? Number(product?.promoPrice) : product.price)
  }
  const navigateToDetail = () => {
    if (product && product.category && product.category._id) {
      navigate({
        pathname: `/catalog/${transliterate(product.category.name)}/${transliterate(product.name)}`,
      });
    } else {
      navigate({
        pathname: `/catalog/product/${transliterate(product.name)}`,
      });
      console.error("Невозможно получить _id из product.category");
    }
    dispatch.selectCategories.setCategoryId(product?.category?._id);
    dispatch.selectProducts.setProductId(product._id);
  };

  return (
    <>
      <div className='products-item'>
        <div className='products-item_imgdiv'>
          <div className='heart' onClick={HandleHeartClick}>
            {isFavourite() ? <HeartFilled width={20} height={20} /> : <Heart width={20} height={20} />}
          </div>

          {!!product.image ? (
            <img
              onClick={navigateToDetail}
              src={ReturnUrlFromIp(product?.image)}
              alt={product.name}
              loading='lazy'
            />
          ) : (
            <img
              style={{ minWidth: '100%', objectFit: 'cover' }}
              onClick={navigateToDetail}
              src={BrokeImage}
              alt={product.name}

            />
          )}
        </div>
        <h3 onClick={navigateToDetail}>{product.name}</h3>
        <h2>
          <span className={product.promoPrice > 0 ? 'redPrice' : 'normalPrice'}>
            {
              checkForClientsPrice(product)
            } c
          </span>
          <span className='discountPrice'>
            {product.promoPrice > 0 && `${Number(product?.price).toPrecision(4) / 100} с`}
          </span>
        </h2>

        {isClient ?
          <>
            {product?.quantity > 0 ?
              <p className='item_inStock Gilroy-m'>В наличии</p> :
              <p className='item_notinStock'>нет в наличии</p>
            }
          </> :
          <h4 style={{ color: '#000' }}>
            <span style={{ color: 'grey' }} className='second-grey'>доступно:</span> {product?.quantity}
          </h4>
        }
        <ul className='Gilroy-b'>
          {product?.productSet?.length ?
            <li className="second-li" >В комплекте</li> :
            <li className="second-li" style={{ color: !product?.productSet?.length && 'grey' }}>Без комплекта</li>
          }
        </ul>
        <div className='products-item_bottom'>
          <div
            className='mathDiv'
            onClick={handleRemoveNow} >
            <Minus />
          </div>
          <div className='quantity'>{quantityInCart || 0}</div>
          <LightTooltip title={prompt} arrow placement="bottom">
            <div
              className={`mathDiv ${isAdded ? 'added' : ''}`}
              onClick={handleAddNow}
              onContextMenu={handleContextMenu}>
              <Plus />
            </div>
          </LightTooltip>
        </div>
      </div>
    </>
  );
};

export default ProductsItem;