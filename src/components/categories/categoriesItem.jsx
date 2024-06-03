import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import api, { baseURL } from '../../services/api';
import BrokeImage from "../../components/icons/brokeImage.svg"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import transliterate from '../../transliteration';
import CategoryItemPlaceholder from '../placeholders/categoryItemPlaceholder';

const CategoriesItem = ({ category, handleCategoryClick }) => {
  const dispatch = useDispatch()
  const { data: categoriesPast, counts } = useSelector((state) => state.categories);
  const [idMain, setIdMain] = useState(null);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const foundCategory = categoriesPast.find(el => el.name === category.name);
    if (!foundCategory) return console.log(`Категория ${category.name} в categoriesPast не найдена`);
    if (foundCategory.parent !== null) return;
    const childCategories = categoriesPast.filter((category) => category.parent == foundCategory._id);
    if (childCategories.length > 0) {
      const childCategoryIds = childCategories.map((category) => `${category._id}`);
      const queryString = `${foundCategory._id}&categoryId=${childCategoryIds.join('&categoryId=')}`;
      setIdMain(queryString);
    }
  }, [category, categoriesPast]);

  const { data: categoryCount, isLoading } = useQuery(
    [`categoryCount-${category._id}`, idMain],
    () => api.get(`/api/getProducts?categoryId=${idMain ? idMain : category._id}&page=1&limit=521`).then((res) => res.data),
    { enabled: true }
  );

  let sortCategoryCount = categoryCount?.objects.filter(prod => {
    return prod.quantity > 0
  }) 

  useEffect(() => {
    let count = 0
    if (categoryCount?.pagesCount > 0) {
      setItemCount(categoryCount.pagesCount * sortCategoryCount?.length)
      count = categoryCount.pagesCount * sortCategoryCount?.length;
    } else {
      setItemCount(sortCategoryCount?.length)
      count = sortCategoryCount?.length;
    }
    // dispatch save item count on name
    dispatch.categories.setCounts({ isLoaded: !isLoading, name: category.name, itemCount: count })
  }, [categoryCount])

  const allCategoriesLoading = useMemo(() => {
    if (Object.keys(counts).length === 0) return true
    return Object.values(counts).some(saved => saved.isLoaded === false)
  }, [counts])


  if (isLoading) {
    return <CategoryItemPlaceholder />
  }
  if (itemCount > 0) {
    return (
      <Link
        draggable="false"
        to={`/catalog/${transliterate(category.name)}`}
        onClick={() => handleCategoryClick(category._id)}
      >
        <div className='categories-item' style={{ background: !category.img && '#F0F1F3' }}>
          <div className="categories-item-wrap">
            <h3 className="categories-item-wrap-title" title={category.name}>{category.name} ASD </h3>
            <p className=''>{itemCount} товаров</p>

          </div>
          {category.img ?
            <img style={{ objectFit: 'cover' }} src={String(category.img).replace('http://62.217.177.200:8080', baseURL)} alt={category.name} /> :
            <img
              style={{ objectFit: 'cover', }}
              src={BrokeImage}
              alt={category.name}
              loading='lazy'
            />
          }
        </div>
      </Link>
    )
  };
};

export default CategoriesItem;
