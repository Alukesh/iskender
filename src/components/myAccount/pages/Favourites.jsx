import React from 'react';
import ProductsItem from '../../products/productsItem';
import '../../../styles/components/favourites.scss';
import EmptySection from "../../EmptySection/EmptySection";
import heart_icon from '../../icons/heart_nofav.svg';
import TopNavMobile from "../../TopNavMobile/TopNavMobile";
import useCheckMobileScreen from "../../../hooks/useCheckMobileScreen";
import { useSelector } from 'react-redux';

const Favourites = () => {
  const isMobile = useCheckMobileScreen();
  const { favourites } = useSelector(store => store.favourites)

  return (
    <div className='favourites_container'>
      {isMobile ?
        <TopNavMobile title='Избранные товары' additionalClass='profileEdit_nav' /> :
        <h1 className='Gilroy-w'>Избранные товары</h1>
      }


      {favourites.length !== 0
        ? <div className='favourites'>
          {
            favourites.map((favourite, idx) => (
              <ProductsItem key={idx} product={favourite} />
            ))
          }
        </div>
        : <EmptySection icon={heart_icon} title='Избранных товаров нет' />
      }
    </div>
  );
};

export default Favourites;
