import { useEffect, useRef, useState } from "react";
import searchIco from "../icons/Search.svg";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import styles from './ProductSearch.module.scss'
import { Link, useLocation } from "react-router-dom";
import api from "../../services/api";
import { ReactComponent as BrokeImage } from '../icons/brokeImage.svg';
import { transformPrice } from './../../utils/transformPrices';
import { useDispatch } from "react-redux";
import transliterate from "../../transliteration";
import ReturnUrlFromIp from "../../hooks/useReplaceUrl";
import { ReactComponent as CloseIcon } from "../icons/close.svg"


const ProductSearch = ({ setState, prod, newClasses, placeholder = "Поиск", isInHeader }) => {
    const inputRef = useRef(null)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const location = useLocation();
    const dispatch = useDispatch();
    const { data: searchResults, isLoading } = useQuery(
        ['searchResults', searchTerm],
        () => api.get(`/api/getProducts?&searchText=${searchTerm}&page=1&limit=40`).then((res) => res.data.objects),//search products
        { enabled: searchTerm !== '', cashTime: 0 }
    );
    useEffect(() => {
        handleSearchClose()
    }, [location])
    const onChoose = (item, e) => {
        e.preventDefault()
        const productId = {
            price: item.price,
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            promoPrice: item.promoPrice,
            id: item._id
        }
        setState(prev => {
            return {
                ...prev,
                orderItems: prev.orderItems.find(el => el._id == item._id) ? prev.orderItems.map(el => el._id == item._id ? { ...el, quantity: el.quantity + 1 } : el) : [...prev.orderItems, { ...item, quantity: 1, productId: productId }]
            }
        })
    }

    const handleSearchActive = () => {
        setSearchOpen(true)
    }
    const handleSearchClose = () => {
        setSearchOpen(false)
    }
    function debounce(func, delay) {
        let timeoutId;
        return function () {
            const context = this;
            const args = arguments;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }
    const handleSearchSelect = debounce((e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm)
    }, 500)

    const handleProductClick = (categoryId, productId) => {
        dispatch.selectCategories.setCategoryId(categoryId);
        dispatch.selectProducts.setProductId(productId);
    };
    const deleteSearchValue = () => {
        inputRef.current.value = ""
        setSearchTerm('')
    }
    return (
        <div className={`${styles.search} ${newClasses}`}>
            {searchTerm ?
                <CloseIcon width={18} height={18} className={styles.search_close} onClick={deleteSearchValue} /> :
                <img className={isInHeader ? styles.search_icon : 'categories-search-icon'} src={searchIco} alt="search" />
            }
            <input
                className={`${styles.search_input} value-delete ${searchTerm.length && searchOpen ? styles.open : ""}`}
                type="text"
                ref={inputRef}
                onChange={handleSearchSelect}
                placeholder={placeholder}
                onFocus={handleSearchActive}
            />
            <button onClick={handleSearchClose} className={`${styles.blur} ${searchTerm.length && searchOpen ? styles.open : ""}`}></button>
            <div className={`${styles.subsearch} scrollbar_primary ${searchTerm.length && searchOpen ? styles.open : ""}`}>
                <div className={styles.subsearch__items}>
                    <div className={styles.line}></div>
                    {searchResults?.length ?
                        searchResults?.map((item, index) => {
                            return (
                                <Link
                                    to={item && item?.category && item?.category?._id ?
                                        `/catalog/${transliterate(item.category.name)}/${transliterate(item.name)}` :
                                        `/catalog/product/${transliterate(item.name)}`}
                                    className={styles.subsearch__item} key={index}
                                    onClick={(e) => {
                                        prod ? onChoose(item, e) : handleProductClick(item?.category?._id, item?._id)
                                    }}
                                >
                                    <div className={styles.image}>
                                        {item.image
                                            ? <img
                                                className={styles.subsearch_image}
                                                src={ReturnUrlFromIp(item?.image)}
                                                alt={item.name}
                                            />
                                            : <BrokeImage />
                                        }
                                    </div>
                                    <div className={styles.subsearch_info}>
                                        <p className={styles.info_name}>
                                            {item.name}
                                        </p>

                                        <p className={styles.info_price}>
                                            {String(Math.round(transformPrice(item.price))).replace(/\B(?=(?:\d{3})*$)/g, ' ')} c
                                        </p>
                                    </div>
                                </Link>
                            )
                        }) :
                        <div className={styles.noresult}>
                            <svg width="26" height="25" viewBox="0 0 26 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M0.208008 1.33441C0.208008 0.827565 0.626933 0.416687 1.1437 0.416687H2.05998C3.79025 0.416687 5.24975 1.68036 5.46437 3.36429L5.71249 5.3112H23.3993C24.7341 5.3112 25.7564 6.47553 25.5584 7.7702L24.2207 16.5171C23.9688 18.1643 22.526 19.3829 20.8278 19.3829H8.90669C7.20842 19.3829 5.76569 18.1643 5.51377 16.5171L3.96114 6.36506L3.95801 6.34275L3.60743 3.59195C3.50988 2.82653 2.84647 2.25213 2.05998 2.25213H1.1437C0.626933 2.25213 0.208008 1.84125 0.208008 1.33441ZM5.973 7.14665L7.36446 16.2448C7.47897 16.9936 8.13475 17.5475 8.90669 17.5475H20.8278C21.5997 17.5475 22.2555 16.9936 22.37 16.2448L23.7077 7.49793C23.736 7.31298 23.59 7.14665 23.3993 7.14665H5.973Z"
                                    fill="#CECECE" />
                                <path
                                    d="M22.3528 23.3597C22.3528 24.0355 21.7942 24.5834 21.1052 24.5834C20.4162 24.5834 19.8576 24.0355 19.8576 23.3597C19.8576 22.6839 20.4162 22.1361 21.1052 22.1361C21.7942 22.1361 22.3528 22.6839 22.3528 23.3597Z"
                                    fill="#CECECE" />
                                <path
                                    d="M9.87685 23.3597C9.87685 24.0355 9.31828 24.5834 8.62926 24.5834C7.94023 24.5834 7.38167 24.0355 7.38167 23.3597C7.38167 22.6839 7.94023 22.1361 8.62926 22.1361C9.31828 22.1361 9.87685 22.6839 9.87685 23.3597Z"
                                    fill="#CECECE" />
                            </svg>
                            <p>Нечего не найдено</p>
                        </div>

                    }
                </div>
            </div>
            <div className={styles.search_search__result}>
                {isLoading ?
                    <Loader style={{ height: '5px' }} /> :
                    isInHeader ?
                        searchResults?.length :
                        ''
                }
            </div>
        </div>
    );
};

export default ProductSearch;