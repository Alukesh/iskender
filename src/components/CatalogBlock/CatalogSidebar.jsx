import React, { useState, useEffect, useMemo } from "react";
import Slider from "rc-slider";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as IcoArrow } from "../icons/arrowCategory.svg";
import "rc-slider/assets/index.css";
import { useQuery } from "react-query";
import api from './../../services/api/index';
import { useDispatch, useSelector } from "react-redux";
import transliterate from "../../transliteration";
import { transformPrice } from "../../utils/transformPrices";

const CatalogSidebar = ({ title, display }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    categories: { getMainCounts },
    products: { getProductById },
  } = useDispatch();

  const { user } = useSelector(store => store.cart);
  const selectedCategoryId = useSelector(store => store.selectCategories);
  const { productById: products } = useSelector(store => store.products);
  const { data: categoriesPast, 
    counts: categoriesCounts, 
    mainCategories: mainCategories,
    productsFronCategories,
    subCategories
  } = useSelector((state) => state.categories);

  const id = selectedCategoryId.categoryId;
  const idMain = selectedCategoryId.queryString;
  const isClient = user.role === 'client' || !user.role;

  const [price, setPrice] = useState([0, 100]);
  const [aPriceRange, aPSetPriceRange] = useState([0, 100]);
  const [openCategories, setOpenCategories] = useState([]);

  const handleSliderChange = (value) => {
    aPSetPriceRange(value);
  };

  // const { data: products } = useQuery(
  //   ['products', id],
  //   () => api.get(`/api/getProducts?categoryId=${idMain ? idMain : id}&page=1&limit=511`).then((res) => res.data.objects),
  //   { enabled: id != null }
  // );

  const sortedProducts = useMemo(() => {
    return products?.filter(prod => prod.quantity > 0)
  }, [products]);

  const toggleCategory = async ({ _id, name = '' }) => {
    navigate(`/catalog/${transliterate(name)}`);
    handleCategoryClick(_id)

    if (openCategories.includes(_id)) {
      setOpenCategories(openCategories.filter((id) => id !== _id));
    } else {
      setOpenCategories([...openCategories, _id]);
    }
  };
  console.log(categoriesCounts, 'categoriesCounts!');
  console.log(subCategories, 'categoriesCounts!-2');
  const notEmptyCategory = useMemo(() => {
    return categoriesPast?.filter(category => categoriesCounts[category.name] && categoriesCounts[category.name]?.itemCount !== 0);
  }, [categoriesPast, categoriesCounts])
  
  console.log(notEmptyCategory, 'notEmptyCategory');

  const hasSubCategory = useMemo(() => {
    return categoriesPast?.filter(category => categoriesPast.some((subCategory) => subCategory.parent === category._id));
  }, [categoriesPast, categoriesCounts])
  console.log(hasSubCategory, 'hasSubCategory');
  console.log(mainCategories, 'mainCategories');
  const filteredCategories = categoriesPast?.filter(
    (category) =>
      !category.parent &&
      categoriesCounts[category.name] &&
      categoriesCounts[category.name]?.itemCount !== 0  
  );

  const checkForProductsPrice = (product) => {
    return (product?.salePriceTypesSimple[2]) ?
      Math.round(transformPrice(isClient ? Number(product?.salePriceTypesSimple[2].value) : product.price)) :
      Math.round(transformPrice(isClient ? Number(product?.promoPrice) : product.price))
  }

  const handleSaveLimit = () => {
    dispatch.cart.changeSearchParams(aPriceRange)
  }
  const handleRemoveLimit = () => {
    dispatch.cart.changeSearchParams([0, false])
    aPSetPriceRange(price)
  }

  const handleCategoryClick = (categoryId) => {
    dispatch.selectCategories.setCategoryId(categoryId);
  };


  useEffect(() => {
    const productId = idMain ? idMain : id;
    console.log(productsFronCategories, 'productsFronCategories--')
    getProductById({id: productId, products: productsFronCategories})
  }, [idMain])

  useEffect(() => {
    if (!categoriesCounts) return;
    let selectedCategoryId = id
    if (categoriesPast.length && id) {
      getMainCounts({data: categoriesPast, id: selectedCategoryId});
    }
  }, [categoriesPast, id])

  useEffect(() => {
    if (products?.length > 0) {
      const allPrices = sortedProducts.map(checkForProductsPrice);
      if (!allPrices.length) allPrices.push(0)
      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      setPrice([minPrice, maxPrice]);
      aPSetPriceRange([minPrice, maxPrice]);
    }
  }, [products]);
  const mainCategoryCunts = {
    'Ванны': 15,
    'Водонагреватели': 59,
    'Душевые': 34,
    'Инструменты': 12,
    'Конвекторы': 1,
    'Led зеркала': 6,
    'Полотенцесушители': 13,
    'Радиаторы': 3,
    'Сифоны и гофры': 6,
    'Комплектующие': 102,
    'Трубы и фитинги': 170,
    'Экран для ванны': 3,
    'Унитазы': 85,
    'Смесители': 7,
    'Умывальники': 205,
    'Кухонные вытяжки': 5,
    'Столешницы из керамогранита': 4,
    'Мебель крашенная': 75,
    'Мебель стандарт': 383,
  }

  return (
    <div
      className="category-sidebar"
      style={display ? { display: "block" } : null}
    >
      <div className="category-sidebar_title">
        <h2>{title}</h2>
      </div>

      <div className="category-sidebar_blocks">
        <div className="category-sidebar_block">
          {mainCategories?.map((category) => {
            if (mainCategoryCunts[category.name]) {
              return (
                <div className="block-item" key={category._id}>
                  {!category.parent && (
                    <button onClick={() => {
                      toggleCategory(category);
                      // console.log(category)
                    }}>
                      {category.name}
                      {hasSubCategory.some(subCategory => subCategory.name === category.name) && <IcoArrow />}
                    </button>
                  )}
                  <ul className={openCategories?.includes(category._id) ? "open" : "closed"}>
                    {notEmptyCategory
                      .filter((subCategory) => subCategory.parent === category._id)
                      .map((subCategory) => (
                        <li
                          key={subCategory._id}
                          onClick={() => { }}
                        >
                          <Link
                            to={`/catalog/${transliterate(subCategory.name)}`}
                            onClick={() => handleCategoryClick(subCategory._id)}
                          >
                            {subCategory.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )
            }
            return (<></>);
          })}
        </div>
        <div className="slider">
          <h4>По цене</h4>
          <p className="price-range">
            <span>{aPriceRange[0]}&nbsp;с</span>
            <span>{aPriceRange[1]}&nbsp;с</span>
          </p>
          <Slider
            range
            min={price[0]}
            max={price[1]}
            value={aPriceRange}
            onChange={handleSliderChange}
            className="slider-block"
          />
          <div className="slider-buttons">
            <button className="btn-show" onClick={handleSaveLimit}>Показать</button>
            <button className="btn-reset" onClick={handleRemoveLimit}>Х Сбросить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogSidebar;
