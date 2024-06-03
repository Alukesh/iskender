import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import categories from './models/categories';
import products from './models/products';
import stories from './models/stories';
import branches from './models/branches';
import news from './models/news';
import orders from './models/orders';
import cart from './models/cart';
import favourites from './models/favourites';

import selectCategories from './models/selectCategories';
import selectProducts from './models/selectProducts';

const loadingPlugin = createLoadingPlugin();

const store = init({
  plugins: [loadingPlugin],
  models: {
    categories,
    products,
    stories,
    branches,
    news,
    orders,
    cart,
    favourites,
    selectCategories,
    selectProducts,
  },
});

export default store;
