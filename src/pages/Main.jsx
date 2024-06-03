import React, { useLayoutEffect } from "react"
import Stories from "../components/stories/stories"
import Categories from "../components/categories/categories"
import News from "../components/news/news"
import Products from "../components/products/products"
import Branches from "../components/branches/branches"
import BonusCurd from "../components/bonusCurd/bonusCurd"
import ProductsPromo from "../components/products/productsPromo"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

function Main() {
    const {
        products: { getAllProducts },
        categories: { getCategories, getCategoryList, getProductsFromCategories },
    } = useDispatch()

    const {data: categoriesPast, mainCategories } = useSelector((state) => state.categories);

    function test (main, allCategories) {
      const childrenCategories = {};

      for (let i = 0; i < main.length; i++) {
        const mainCategory = main[i];

        for (let j = 0; j < allCategories.length; j++) {
          const element = allCategories[j];

          if (element.parent === mainCategory._id) {
            // console.log(element, 'element'); 
            // console.log(mainCategory, 'mainCategory');

            let property = mainCategory._id;
            if (!childrenCategories.hasOwnProperty(property)) {
                childrenCategories[property] = [];
            }
            childrenCategories[property].push(element);
          }
        }
        if (!childrenCategories.hasOwnProperty(mainCategory._id)) {
            console.log(mainCategory, 'CHECK-2');
            childrenCategories[mainCategory._id] = [];
            childrenCategories[mainCategory._id].push(mainCategory);
        }
      }
      getCategoryList (childrenCategories)
      getProductsFromCategories (childrenCategories)
      console.log(childrenCategories, 'test-2');
    }

    useLayoutEffect (() => {
        getAllProducts();
        if (!categoriesPast.length) {
            getCategories ();
        }
    }, []);
    
    useEffect (() => {
        if (categoriesPast.length) {
            let res = test (mainCategories, categoriesPast);
            console.log(res, 'WS');
        }
    }, [categoriesPast])

    return (
        <>
            <Stories />
            <BonusCurd />
            <div className="main-bottom">
                <Categories />
                <Products title="Хиты продаж" type="bestseller" />
                <News />
                <ProductsPromo title="Акционные товары" type="bestseller" />
                <Branches />
            </div>
        </>
    )
}

export default Main
