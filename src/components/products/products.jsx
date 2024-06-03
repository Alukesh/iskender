import React from 'react';

// Import css files
import Slider from 'react-slick';
import ProductsItem from './productsItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { useQuery } from 'react-query';
import ProductItemPlaceholder from '../placeholders/productItemPlaceholder';

export default function Products({ title, categories, type }) {
  const location = useLocation()
  const actualCategory = !categories?.length ? null : categories.join('&categoryId=')
  const { data: products, isLoading } = useQuery(
    ['products', location],
    () => api.get(`/api/getProducts?${type ? `${type}=true&` : ''}${actualCategory ? `categoryId=${actualCategory}&` : ''}page=1&limit=20`).then((res) => res.data.objects),
    { enabled: true }
  );
  const sortedProducts = products?.filter(prod => {
    return prod.quantity > 0
  })

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: sortedProducts?.length > 5 ? 5 : sortedProducts?.length,
    slidesToScroll: 3,
    arrows: true,
    variableWidth: sortedProducts?.length < 5, // Позволяет слайдам иметь разные ширины
    centerMode: false, // Отключает центрирование слайдов
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: sortedProducts?.length > 4 ? 4 : sortedProducts?.length,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: sortedProducts?.length > 3 ? 3 : sortedProducts?.length,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: sortedProducts?.length > 2 ? 2 : sortedProducts?.length,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          variableWidth: false,
        },
      },
    ],
  };
  if (isLoading) {
    return (
      <div className='products container'>
        <div className='products-title'>
          <h2>{title}</h2>
          <Link to='/catalog' className='product-catalog'>
            перейти в каталог
          </Link>
        </div>
        <Slider {...settings}>
          {[...Array(6)].map((_, i) => (
            <ProductItemPlaceholder key={i} />
          ))}
        </Slider>
      </div>
    )
  }

  if (sortedProducts?.length) {
    return (
      <div className='products container'>
        <div className='products-title'>
          <h2>{title}</h2>
          <Link to='/catalog' className='product-catalog'>
            перейти в каталог
          </Link>
        </div>

        <Slider {...settings}>
          {sortedProducts?.map((product) => (
            <ProductsItem key={product.id} product={product} />
          ))}
        </Slider>
      </div>
    );
  }
}