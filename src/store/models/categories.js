import api from '../../services/api/index';
import products from './products';

const categories = {
  state: {
    data: [],
    mainCategories: [],
    subCategories: [],
    counts: {},
    currentCategorySubCategories: [],
    categoryList: [],
    productsFronCategories: []
  },
  reducers: {
    setCategories: (state, payload) => ({
      ...state,
      data: payload,
    }),
    setMainCategories: (state, payload) => ({
      ...state,
      mainCategories: payload,
    }),
    setSubCategories: (state, payload) => ({
      ...state,
      subCategories: payload,
    }),
    setCounts: (state, payload) => ({
      ...state,
      counts: { ...state.counts, [payload.name]: payload },
    }),
    setCategoryList: (state, payload) => ({
      ...state,
      categoryList: { ...state.counts, [payload.name]: payload },
    }),
    setProductsFronCategories: (state, payload) => ({
      ...state,
      productsFronCategories: payload,
    }),
    
  },
  effects: (dispatch) => ({
    async getCategories() {
      const {
        data: { objects },
      } = await api.get('/api/getCategories');

      dispatch.categories.setCategories(objects || []);
      const mainCategories = objects.filter((category) => category.parent === null)

      dispatch.categories.setMainCategories(mainCategories || []);
    },
    getCategoryList (list) {
      dispatch.categories.setCategoryList(list || []);
    },

    async getProductsFromCategories (list) {
      const products = {}
      console.log(list, 'res-1');
      for (let key in list) {
        const queryString = await list[key].map((item) => `${item._id}`)
        console.log(queryString, 'what-1');
        console.log(key, 'what-2');
        const res = await api.get(`/api/getProducts?categoryId=${queryString.join('&categoryId=')}&page=1&limit=517`);
        if (res?.data?.objects.length) {
          products[key] = [];
          products[key].push(res.data.objects)
          // products.push(res.data.objects)
        }
      }
      console.log(products, 'res-2');
      dispatch.categories.setProductsFronCategories(products);
    },

    async getSubCategories (categories) {
      console.log(categories, 'categories--');
      const subCategories = categories.map( async(item) => {
        return await api.get(`/api/getCategory/${item._id}`);
      })

      const res = await Promise.all(subCategories)
      console.log(res, 'SubCategory');
      dispatch.categories.setSubCategories(res || []);
    },

    async getFromCategorySubcategoriesProducts (mainCategories, allCategories) {
      // const foundCategory = categoriesPast.find(el => el.name === category.name);
      // if (!foundCategory) return console.log(`Категория ${category.name} в categoriesPast не найдена`);
      // if (foundCategory.parent !== null) return;

      // const childCategories = categoriesPast.filter((category) => category.parent == foundCategory._id);
      // if (childCategories.length > 0) {
      //   const childCategoryIds = childCategories.map((category) => `${category._id}`);
      //   const queryString = `${foundCategory._id}&categoryId=${childCategoryIds.join('&categoryId=')}`;
      //   setIdMain(queryString);
      // }
      const childrenCategories = [];

      for (let i = 0; i < mainCategories.length; i++) {
        const mainCategory = mainCategories[i];

        for (let j = 0; j < allCategories.length; j++) {
          const element = allCategories[j];
          if (element.parent === mainCategory._id) {
            childrenCategories[element.pathName].push(element);
          }
        }
      }
      console.log(childrenCategories,  'test-1');
      return childrenCategories
      // console.log(categories, 'categories');
      // const categoryStore = mainCategories.categories.mainCategories;
      // console.log(categoryStore, 'categoryStore');
      // console.log(id, 'id-qwe');
      // const currentCategory = categoryStore.forEach((item) => item._id === id);
      // console.log(currentCategory, 'currentCategory-asd');

      // const subCategories = categories?.filter((subCategory) => {
      //   return currentCategory?.parent == null ?
      //     subCategory.parent === currentCategory?._id :
      //     subCategory.parent === currentCategory?.parent
      // })
      // dispatch.categories.setCurrentCategorySubCategories(subCategories || []);
    },

    async getMainCounts(args) {
      console.log(args, 'args');
      const mainCategories = args.data?.filter((category) => category.parent === null)
      const selectedCategoryId = args.id

      mainCategories.forEach(async (el) => {
        let queryString = null;

        if (el._id == selectedCategoryId) {
          const childCategories = args.data.filter((category) => category.parent == el._id);
          if (childCategories.length > 0) {
            const childCategoryIds = childCategories.map((category) => `${category._id}`);
            queryString = `${el._id}&categoryId=${childCategoryIds.join('&categoryId=')}`;
          }
          // const {
          //   data,
          // } = await api.get(`/api/getProducts?categoryId=${queryString ? queryString : el._id}&page=1&limit=520`)
          const productById = products.state
          let sortCategoryCount = productById.objects?.filter(prod => {
            return prod.quantity > 0
          })
          let count = sortCategoryCount?.length;
          dispatch.categories.setCounts({ name: el.name, itemCount: count || 0 })
        }

      })

    },
  }),
};

export default categories;
