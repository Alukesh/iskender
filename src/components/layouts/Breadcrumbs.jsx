import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from "react-query";
import api from '../../services/api';
import transliterate from '../../transliteration';


const pathMapping = {
  catalog: 'Каталог',
  addresses: 'Адреса магазинов',
  category: 'Категория',
  basket: 'Корзина',
  'my-account': 'Мой аккаунт',
  favourites: 'Избранные товары',
  // 'news-promotions': 'Новости и акции',
  'order-history': 'История заказов',
  'manager-history': 'История по клиентским заказам',
  'privacy-policy': 'Политика конфиденциальности',
  'terms-use': 'Условия использования',
  settings: 'Настройки',
  contacts: 'Контакты',
  product: 'Детали товара',
  login: 'Логин',
  register: 'Регистрация',
  manager: 'Корзина менеджера',
  'news-and-promotions': 'Новости и акции',
};

const Breadcrumbs = () => {


  const location = useLocation();
  const dispatch = useDispatch();
  const productsPast = useSelector((state) => state.products.data);
  // const { data: productsPast, isError } = useQuery(
  //   ['productsPast', location],
  //   () => api.get(`/api/getProductsAll`).then((res) => res.data.objects),
  //   { enabled: true }
  // );

  const categories = useSelector((state) => state.categories.data);
  // useEffect(() => {
  //   if (!categories.length) {
  //     console.log(categories, 'CHECK');
  //     dispatch.categories.getCategories();
  //     console.log('CALL-5');
  //   }
  // }, [dispatch]);
  // const searchParams = new URLSearchParams(location.search);
  const pathnames = location.pathname.split('/').filter((x) => x);
  if (pathnames.length === 0 || pathnames.includes('home')) {
    return;
  }


  const categoryId = pathnames[1];
  const category = categories.find(cat => transliterate(cat.name) === categoryId);
  const categoryName = category ? category.name : null;

  const productId = pathnames[2];
  const product = productsPast?.find(product => transliterate(product.name) === productId);
  const productName = product ? product.name : null;

  /* -------------------------------- for news -------------------------------- */
  const searchParams = new URLSearchParams(location.search);
  const searchName = searchParams.get('name');
  /* ----------------------------------- -- ----------------------------------- */
  return (
    <div className='breadcrumbs'>
      <Link to='/home'>Главная</Link>
      {pathnames.map((name, index) => {

        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = getDisplayName(searchName || name, location.state);
        if (!pathMapping.hasOwnProperty(categoryId) && categoryName) {
          pathMapping[categoryId] = categoryName;
        }
        if (!pathMapping.hasOwnProperty(productId) && productsPast) {
          pathMapping[productId] = productName;
        }
        const displayText = pathMapping[name.toLowerCase()] || displayName;
        return isLast ? (
          <span key={name}>{displayName}</span>
        ) : (
          <span key={name}>
            <Link to={routeTo}>{displayText}</Link>
          </span>
        );
      })}
    </div>
  );
};
// searchParams
const getDisplayName = (name, state) => {
  if (state && state.breadcrumbText) {
    return state.breadcrumbText;
  }
  // if (searchParams && searchParams.has('name')) {
  //   return searchParams.get('name');
  // }
  return pathMapping[name.toLowerCase()] || name;
};

export default Breadcrumbs;
