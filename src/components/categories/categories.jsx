import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryPlaceholder from '../placeholders/categoryPlaceholder';
import ProductSearch from '../ProductSearch/ProductSearch';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import CategoriesItemMain from './categoriesItemMain';

const Categories = () => {
  const dispatch = useDispatch()
  const isMobile = useCheckMobileScreen(768);
  // const [sortedCategories, setSortedCategories] = useState([]);
  const { data: categories, mainCategories, productsFronCategories } = useSelector((state) => state.categories);

  const {
    categories: { getCategories },
  } = useDispatch();
  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
  }, []);

  // useEffect(() => {
  //   setSortedCategories(
  //     categories.filter((category) => category.parent === null)
  //   );
  // }, [categories]);

  const handleCategoryClick = (categoryId) => {
    console.log(productsFronCategories, 'productsFronCategories-1');
    dispatch.selectCategories.setCategoryId(categoryId);
  };



  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Увеличиваем скорость прокрутки
    containerRef.current.scrollLeft = scrollLeft - walk;
  };
  return (
    <div className='categories container'>
      <div className='categories-title'>
        <h2>Категории</h2>
      </div>
      {
        isMobile &&
        <ProductSearch newClasses={'categories-search'} placeholder='Искать товар...' />
      }


      {mainCategories.length > 0
        ? <div className='categories-items'
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          {mainCategories.map((category) => {
            return (
              <React.Fragment key={category._id} >
                {/* <CategoriesItem
                  category={category}
                  categories={categories} 
                  handleCategoryClick={handleCategoryClick}
                /> */}
                <CategoriesItemMain 
                  category={category}
                  categories={categories} 
                  handleCategoryClick={handleCategoryClick}
                />
              </React.Fragment>
            )
          })}
        </div>
        : <CategoryPlaceholder itemsCount={14} />
      }
    </div>
  );
};

export default Categories;
