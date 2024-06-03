import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesItem from '../categories/categoriesItem';
import { ReactComponent as CatalogLocation } from '../icons/catalogLocation.svg';

const CatalogBlock = () => {
  const dispatch = useDispatch();
  const [sortedCategories, setSortedCategories] = useState([]);
  const categories = useSelector((state) => state.categories.data);
  const {
    categories: { getCategories },
  } = useDispatch();

  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
  }, []);

  useEffect(() => {
    setSortedCategories(categories.filter((category) =>  category.parent === null));
  }, [categories]);

  const handleCategoryClick = (categoryId) => {
    if (categoryId.parent == null) {
      const childCategories = categories.filter((category) => category.parent == categoryId._id);
      if (childCategories.length > 0) {
        const childCategoryIds = childCategories.map((category) => `${category._id}`);
        const queryString = `${categoryId._id}&categoryId=${childCategoryIds.join('&categoryId=')}`;
        dispatch.selectCategories.setCategoryId(categoryId._id, queryString);
      } else {
        dispatch.selectCategories.setCategoryId(categoryId._id);
      }
    } else {
      dispatch.selectCategories.setCategoryId(categoryId._id);
    }
  };
  return (
    <div className='catalogBlock container'>
      <div className='catalogBlock-title'>
        <h2>Выберите категорию</h2>
        <div className='catalogBlock-title_right'>
          Бишкек
          <CatalogLocation/>
        </div>
      </div>
      <div className='catalogBlock-content'>
        <div className='catalogBlock-items'>
          {sortedCategories.length > 0 &&
            sortedCategories.map((category) => (
              <CategoriesItem key={category._id} category={category} handleCategoryClick={handleCategoryClick} categories={categories} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogBlock;
