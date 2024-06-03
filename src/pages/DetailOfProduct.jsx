import React, { useEffect, useState } from "react"
import { ReactComponent as Heart } from "../components/icons/heart.svg"
import { ReactComponent as BrokeImage } from "../components/icons/brokeImage.svg"
import { ReactComponent as ActiveHeart } from "../components/icons/activeHeart.svg"
import { Skeleton } from 'primereact/skeleton';
import Products from "../components/products/products"

import brokenImage from '../assets/brokenImage.jpg'
import { ReactComponent as img2 } from "../components/icons/detail-img2.svg"

import "../styles/components/DetailOfProduct.scss"
import { useParams } from "react-router"
import { useQuery } from "react-query"
import api from "../services/api"
import Loader from './../components/Loader/Loader';
import useCart from "../hooks/useCart";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import BasketButtons from "../components/ProductPageSections/BasketButtons/BasketButtons"
import ReturnUrlFromIp from '../hooks/useReplaceUrl';
import ProductDetailsThird from "../components/ProductDetails/ProductDetailsThird/ProductDetailsThird";
import transliterate from "../transliteration";
import { useLocation } from 'react-router-dom';
import { transformPrice } from "../utils/transformPrices";

const DetailOfProduct = () => {
    const location = useLocation()
    const categoriesPast = useSelector((state) => state.categories.data);
    // const productsPast = useSelector((state) => state.products.data);
    const { user } = useSelector((state) => state.cart)
    const isClient = user.role === 'client' || !user.role;
    const {
        categories: { getCategories },
    } = useDispatch();
    useEffect(() => {
        if (!categoriesPast.length) {
            getCategories();
            console.log('CALL-4');
        }
    }, []);

    const { data: productsPast } = useQuery(
        ['productsPast', location],
        () => api.get(`/api/getProductsAll`).then((res) => res.data.objects),
        { enabled: true }
    );
    // console.log(productsPast, 'ALL-products')
    const categorySlug = useParams();
    
    useEffect(() => {
        if (productsPast) {
            const foundCategory = categoriesPast.find(category => transliterate(category.name) === categorySlug.category);
            const foundProduct = productsPast.find(product => transliterate(product.name) === categorySlug.id);
            
            if (foundCategory && foundProduct) {
                dispatch.selectCategories.setCategoryId(foundCategory?._id);
                dispatch.selectProducts.setProductId(foundProduct?._id);
            } else {
                dispatch.selectProducts.setProductId(foundProduct?._id);
                console.log('Категория не найдена');
            }
        }
    }, [categorySlug, categoriesPast, productsPast]);



    const selectProductsId = useSelector(store => store.selectProducts);
    const id = selectProductsId.productId;
    const dispatch = useDispatch()
    const [complects, setComplects] = useState([])
    const [complectsCheck, setComplectsCheck] = useState([])
    const { favourites } = useSelector(store => store.favourites)
    const { cart } = useSelector(store => store.cart)
    const { data: product, isLoading: pending, } = useQuery(
        ['product', id],
        () => api.get(`/api/getProduct/${id}`).then((res) => res.data.object),
        { enabled: id != null }
    );
    let isLoading = pending || id == null

    useEffect(() => {
        setComplects([])
        window.scrollTo(0, 0)
    }, [id])
    useEffect(() => {
        const hoo = async (complectId) => {
            const response = await api.get(`/api/getProduct/${complectId}`)
            setComplects(prev => [...prev, response.data.object])
            return response.data.object;
        }
        product?.productSet?.map(async (el) => {
            hoo(el)
        })
    }, [isLoading, id, product?.productSet])
    const quantityInCart = cart.find(x => x.product._id === id)?.count;
    console.log(complects, '<= complects | product => ', product);


    const {
        preventContextMenu,
        handleContextMenu,
        RemoveFromBasket,
        AddToBasket,
        prompt,
        isAdded,
        countCart
    } = useCart(product, quantityInCart, complectsCheck, setComplectsCheck);

    const isFavourite = () => {
        return favourites?.filter(prod => prod?._id === product?._id).length > 0
    }
    const HandleHeartClick = () => {
        if (!product?._id) return console.log('product id issue', product, id);
        if (isFavourite()) return dispatch.favourites.removeFromFavourites(product?._id)
        dispatch.favourites.addToFavourites(product)
    }
    const complectInCart = (e, compl) => {
        if (e.target.checked && compl.quantity > 0) {
            setComplectsCheck(prev => [...prev, compl])
            return
        }
        setComplectsCheck(prev => prev.filter(el => el._id !== compl._id))
    }

    const checkForProductsPrice = (product) => {
        return (product?.salePriceTypesSimple[2]) ?
            transformPrice(isClient ? Number(product?.salePriceTypesSimple[2].value) : product?.price) :
            transformPrice(isClient ? Number(product?.promoPrice) : product?.price)
    }
    return (
        <>
            <div className="detail_page">
                <div className="about_product">
                    <div className="left">
                        <div className="first-c">
                            {product?.images ?
                                <img2/> :
                                new Array(4).fill(0).map((_, idx) => (
                                    <BrokeImage/>
                                ))
                            }
                        </div>
                        <div className="second-c">
                            <img
                                src={product?.image ? ReturnUrlFromIp(product?.image) : brokenImage}
                                style={{ width: product?.image ? '' : "100%" }}
                                alt=""
                                className="second-c__image"
                            />
                            <div
                                onClick={HandleHeartClick}
                                className="heart"
                            >
                                {isFavourite() ? <ActiveHeart /> : <Heart />}
                            </div>
                        </div>
                    </div>
                    <ProductDetailsThird
                        product={product}
                        isLoading={isLoading}
                        complects={complects}
                        complectsCheck={complectsCheck}
                        complectInCart={complectInCart}
                    />

                    <div className="fourth-c">
                        {isLoading ?
                            <div className="loader-wrapper">
                                <Loader />
                            </div> : <>
                                <div className="top">
                                    <p>
                                        <span className="discount" style={{ display: product?.promoPrice == 0 && 'none' }}>{product?.promoPrice} c</span>
                                        <span className={"price"}>
                                            {product?.promoPrice > 0 ?
                                                <s>{checkForProductsPrice(product)} c </s> :
                                                <b className="noDiscount">{checkForProductsPrice(product)} c</b>
                                            }
                                        </span>
                                    </p>
                                    <p className="articul">Артикул: ZGW131240</p>
                                    <div className="line"></div>
                                    <div className="statuslists">
                                        <ul>
                                            {product?.quantity > 0 ?
                                                <li className="first-li">В наличии</li> :
                                                <li className="first-li" style={{ color: '#df5333' }}>нет в наличии</li>
                                            }
                                        </ul>
                                        <ul>
                                            <li className="status second-li" style={{ color: !product?.productSet?.length && 'grey' }}>Комплект</li>
                                        </ul>
                                    </div>
                                </div>
                                <BasketButtons
                                    prompt={prompt}
                                    RemoveFromBasket={RemoveFromBasket}
                                    countCart={countCart}
                                    AddToBasket={AddToBasket}
                                    isAdded={isAdded}
                                    handleContextMenu={handleContextMenu}
                                    preventContextMenu={preventContextMenu}
                                /> </>
                        }
                    </div>
                </div>
                <div className="description">
                    <div className="onMobile">
                        {isLoading ?
                            <Skeleton height="2rem" className="mb-2"></Skeleton> :
                            <h2 className="product-name">
                                {/* {product?.name} */}
                            </h2>
                        }
                        <div className="statuslists">
                            <ul>
                                {product?.quantity > 0 ?
                                    <li className="first-li">В наличии</li> :
                                    <li className="first-li" style={{ color: '#df5333' }}>нет в наличии</li>
                                }
                            </ul>
                            <ul>
                                <li className="status second-li" style={{ color: !product?.productSet?.length && 'grey' }}>Комплект</li>
                            </ul>
                        </div>
                    </div>
                    <h2>Описание:</h2>
                    {isLoading && (
                        <>
                            <Skeleton className="mb-2"></Skeleton>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                        </>
                    )}
                    {product?.description || isLoading ?
                        <p>{product?.description}</p> :
                        <p className="empty">Описание временно отсутствует</p>
                    }
                    <div className="onMobile">
                        <div className="description-priceBlock">
                            <span className="discount">{product?.promoPrice > 0 ? product?.promoPrice + 'c' : ''}</span>
                            <span className={"price"}>
                                {product?.promoPrice > 0 ?
                                    <s>{checkForProductsPrice(product)} c </s> :
                                    <b className="noDiscount">{checkForProductsPrice(product)} c</b>
                                }
                            </span>
                        </div>
                        <BasketButtons
                            prompt={prompt}
                            RemoveFromBasket={RemoveFromBasket}
                            countCart={countCart}
                            AddToBasket={AddToBasket}
                            isAdded={isAdded}
                            handleContextMenu={handleContextMenu}
                            preventContextMenu={preventContextMenu}
                        />
                    </div>
                </div>

                <div className="same">
                    {
                        product?.allCategories &&
                        <Products title="Похожие товары" categories={product?.allCategories} />
                    }
                </div>
            </div>
        </>
    )
}

export default DetailOfProduct
