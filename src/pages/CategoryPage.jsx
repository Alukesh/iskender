import React, { useEffect } from 'react';
import CatalogProducts from '../components/CatalogBlock/CatalogProducts';
import CatalogSidebar from '../components/CatalogBlock/CatalogSidebar';
import { useDispatch, useSelector } from 'react-redux';

function CategoryPage() {
  const {
    categories: { getCategories, getSubCategories },
  } = useDispatch();
  
  const { data: categoriesPast, subCategories, mainCategories } = useSelector((state) => state.categories);
  console.log(subCategories, 'asd');
  useEffect(() => {
    if (!categoriesPast.length) {
      getCategories();
    }
  }, []);
  
  // useEffect (() => {
  //   if (!subCategories.length, categoriesPast.length) {
  //     getSubCategories (mainCategories)
  //   }
  // }, [categoriesPast])

  return (
    <>
      <div className='category-page'>
        <CatalogSidebar title='Категории' />
        <CatalogProducts title='Категория' />
      </div>
    </>
  );
}

export default CategoryPage;
