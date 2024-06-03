import React from 'react';

import Slider from 'react-slick';
import ProductsItem from './productsItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useQuery } from 'react-query';
import ProductPlaceholder from '../placeholders/productPlaceholder'
import { useSelector } from 'react-redux';

export default function ProductsPromo({ title }) {
    const {data: products} = useSelector(store => store.products)
    
    const productsPast = [];
    const isLoading = [];
    const sortedProducts = productsPast?.filter(prod => {
        return prod.quantity > 0 && Number(prod.promoPrice) > 0
    })

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: sortedProducts?.length > 5 ? 5 : sortedProducts?.length,
        slidesToScroll: 3,
        arrows: true,
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (sortedProducts?.length) {
        return (

            <div className='products container'>
                <div className='products-title'>
                    <h2>{title}</h2>
                    <Link to='/catalog' className='product-catalog'>
                        перейти в каталог
                    </Link>
                </div>

                {isLoading
                    ? <ProductPlaceholder itemsCount={5} />
                    : <Slider {...settings}>
                        {sortedProducts?.map((product) => (
                            <ProductsItem key={product.id} product={product} />
                        ))}
                    </Slider>
                }
            </div>
        );
    }
}