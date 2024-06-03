import React, { useState, useMemo, useEffect } from "react";
import { ReactComponent as IconSortSlider } from "../icons/slider.svg";
import { ReactComponent as IconClose } from "../icons/close.svg";
import "../../styles/components/CatalogProducts.scss";
import Loader from "../Loader/Loader";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import api from "../../services/api";
import { ReactComponent as arrowR } from "../icons/arrowPaginationR.svg";
import { ReactComponent as arrowL } from "../icons/arrowPaginationL.svg";
import ProductsItem from "../products/productsItem";
import CategoriesItem from "../categories/categoriesItem";
import Search from "../UI/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { transformPrice } from './../../utils/transformPrices';
import transliterate from "../../transliteration";
import CategoriesItemMain from "../categories/categoriesItemMain";

export default function CatalogProducts({ title }) {

  const { data: categoriesPast, 
    counts, mainCategories, 
    currentCategorySubCategories 
  } = useSelector((state) => state.categories);

  // const {
  //   categories: { getFromCategorySubcategories },
  // } = useDispatch();

  console.log(counts, 'CHECK');
  // const {
  //   categories: { getCategories },
  // } = useDispatch();
  // useEffect(() => {
  //   getCategories();
  //   console.log('CALL-2');
  // }, []);
  const categorySlug = useParams();
  useEffect(() => {
    const foundCategory = categoriesPast.find(category => transliterate(category.name) === categorySlug.id);
    if (foundCategory) {
      if (foundCategory.parent == null) {
        const childCategories = categoriesPast.filter((category) => category.parent == foundCategory._id);
        if (childCategories.length > 0) {
          // console.log('found =>', foundCategory, childCategories);
          const childCategoryIds = childCategories.map((category) => `${category._id}`);
          const queryString = `${foundCategory._id}&categoryId=${childCategoryIds.join('&categoryId=')}`;
          dispatch.selectCategories.setCategoryId(foundCategory._id, queryString);
        } else {
          dispatch.selectCategories.setCategoryId(foundCategory._id);
        }
      }
      else {
        dispatch.selectCategories.setCategoryId(foundCategory._id);
      }
    } else {
      console.log('Категория не найдена');
    }
  }, [categorySlug, categoriesPast]);


  const selectedCategoryId = useSelector(store => store.selectCategories);
  const { searchParams, user } = useSelector(store => store.cart);
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const isClient = user.role === 'client' || !user.role;
  const id = selectedCategoryId.categoryId;
  const idMain = selectedCategoryId.queryString;
  useEffect(() => {
    setPage(1)
    dispatch.cart.changeSearchParams([0, false])
  }, [id])
  const searchPriceQuery = `min=${searchParams.min}00&max=${searchParams.max}00&`
  const { data: products, isLoading, isError } = useQuery(
    ['products', id, page, searchParams, idMain],
    () => api.get(`/api/getProducts?categoryId=${idMain ? idMain : id}&${searchParams.max ? searchPriceQuery : ''}&page=1&limit=512`).then((res) => res.data.objects),// products
    { enabled: id != null }
  );
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [isLoading])

  const { data: category } = useQuery(
    ['category', id],
    () => api.get(`/api/getCategory/${id}`).then((res) => res.data.object),
    { enabled: id != null }
  );
    console.log(category, 'category--');
    console.log(mainCategories, 'category--store');

  // useEffect(() => {
  //   if (categoriesPast.length) {
  //     getFromCategorySubcategories(categoriesPast, mainCategories)
  //   }
  // }, [categoriesPast])

  const subCategories = categoriesPast?.filter((subCategory) => {
    return category?.parent == null ?
      subCategory.parent === category?._id :
      subCategory.parent === category?.parent
  })
  console.log(subCategories, 'check-1');
  const [price, setPrice] = useState([0, 100]);
  const [aPriceRange, aPSetPriceRange] = useState([0, 100]);
  const [sortPopup, setSortPopup] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const checkForProductsPrice = (product) => {
    return (product?.salePriceTypesSimple[2]) ?
      transformPrice(isClient ? Math.round(Number(product?.salePriceTypesSimple[2].value)) : product.price) :
      transformPrice(isClient ? Math.round(Number(product?.promoPrice)) : product.price)
  }
  console.log(products, 'products--');
  const sortedProducts = useMemo(() => {
    const sorted = products?.filter(prod => {
      return prod.quantity > 0
    }).sort((a, b) => {
      const priceA = checkForProductsPrice(a);
      const priceB = checkForProductsPrice(b);
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    })
    return sorted;
  }, [products, sortOrder]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  // console.log(idMain, selectedCategoryId, currentProducts, '<= currentProducts');

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  useEffect(() => {
    if (products?.length > 0) {
      const allPrices = sortedProducts?.map((product) => checkForProductsPrice(product));
      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      setPrice([minPrice, maxPrice]);
      aPSetPriceRange([minPrice, maxPrice]);
    }
    setCurrentPage(1)
  }, [products]);

  const paginate = {
    input: (pageNumber) => {
      setCurrentPage(pageNumber);
    },
    nextPage: () => {
      setCurrentPage((prev) =>
        Math.min(prev + 1, Math.ceil(sortedProducts?.length / productsPerPage))
      );
    },
    prevPage: () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    },
  }
  const handleClickSort = () => {
    setSortPopup(!sortPopup)
  }
  function changeMinPrice(e) {
    aPSetPriceRange([e.target.value, aPriceRange[1]])
  }
  function changeMaxPrice(e) {
    aPSetPriceRange([aPriceRange[0], e.target.value])
  }
  const handleSaveLimit = () => {
    dispatch.cart.changeSearchParams(aPriceRange)
  }
  const handleRemoveLimit = () => {
    dispatch.cart.changeSearchParams([0, false])
    aPSetPriceRange(price)
  }
  if (isLoading) {
    return <div className="loader-wrapper"><Loader /></div>
  }
  if (isError) {
    return <div>Вышла ошибка при получении товаров</div>
  }

  console.log(currentCategorySubCategories, 'currentCategorySubCategories');

  return (
    <div className="catalogProducts container">
      <div className="catalogProducts-title">
        <Search extraClass={'catalogProducts-search'} />
        <div onClick={handleClickSort} className="catalogProducts-buttonSort">
          <IconSortSlider />
          Фильтр
          <div onClick={e => e.stopPropagation()} className={`catalogProducts-sortPopup  ${sortPopup ? 'open' : ''}`}>
            <p className="primary-text">Сортировка цен</p>
            <button onClick={handleClickSort} aria-label="закрыть" className="close-button">
              <IconClose className="close-button-icon" />
            </button>
            <label>
              <input type="radio" onChange={toggleSortOrder} name="sortBy" />
              От минимальной до максимальной
            </label>
            <label>
              <input type="radio" onChange={toggleSortOrder} defaultChecked name="sortBy" />
              От максимальной до минимальной
            </label>
            <div className="line"></div>
            <p className="primary-text">Ручная сортировка</p>
            <div className="price-labels">
              <label>
                От
                <input
                  className="circle "
                  type="text"
                  onChange={changeMinPrice}
                  placeholder={`${aPriceRange[0]} c`}
                />
              </label>
              <label>
                До
                <input
                  className="circle "
                  type="text"
                  onChange={changeMaxPrice}
                  placeholder={`${aPriceRange[1]} c`}
                />
              </label>
            </div>
            <div className="price-submit">
              <button className="circle default" onClick={handleRemoveLimit}>Сбросить</button>
              <button className="circle default" onClick={handleSaveLimit}>Применить</button>
            </div>
          </div>
        </div>


        <h2>{category?.name || title}</h2>
        <p className="catalogProducts-sorted" onClick={toggleSortOrder}>
          Сортировать по: &nbsp;
          <span>
            {sortOrder === "asc" ? "Возрастанию" : "Убыванию"}
            &nbsp;цены
          </span>
        </p>
      </div>


      <div className='categories container'>
        <div className='catalogBlock-items subCategories'>
          {subCategories?.length > 0 &&
            subCategories?.map((category) => { 
              return (
                <CategoriesItem key={category._id} category={category} handleCategoryClick={() => { }} /> 
                // <CategoriesItemMain
                //   key={category._id}
                //   category={category}
                //   handleCategoryClick={() => { }}
                // />
            )})}
        </div>
      </div>
      <div className="catalogProducts-content">
        <div className="catalogProducts-items">
          {currentProducts?.length ? currentProducts?.map((product) => (
            <ProductsItem key={product._id} product={product} />
          )) :
            <p>Товаров пока нет</p>
          }
        </div>

        {
          productsPerPage < sortedProducts?.length && (
            <div className="pagination">
              <button onClick={paginate?.prevPage} disabled={currentPage === 1}>
                <img src={arrowL} alt="ico" />
              </button>
              {Array.from(
                { length: Math.ceil(sortedProducts?.length / productsPerPage) },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate.input(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                )
              )}
              <button
                onClick={paginate?.nextPage}
                disabled={currentPage === Math.ceil(sortedProducts?.length / productsPerPage)}
              >
                <img src={arrowR} alt="ico" />
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}
