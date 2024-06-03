
const cart = {
  state: {
    cart: [],
    user: {},
    orderSuccess: false,
    searchParams: {
      min: '0',
      max: false
    },
    prices: 0,
    lenString: '',
    len: 0,
    images: []
  },
  reducers: {
    changeSearchParams: (state, [min, max]) => {
      return {
        ...state,
        searchParams: { min, max }
      }
    },

    addToCart: (state, { product, count }) => {
      const existingProductIndex = state.cart.findIndex(item => item.product._id === product._id);
      if (existingProductIndex !== -1) {
        // Product already exists, update the count
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          count: updatedCart[existingProductIndex].count + count
        };
        sessionStorage.setItem('isk cart', JSON.stringify(updatedCart))
        return {
          ...state,
          cart: updatedCart
        };
      } else {
        // Product doesn't exist, add a new entry
        sessionStorage.setItem('isk cart', JSON.stringify([...state.cart, { product, count }]))
        return {
          ...state,
          cart: [...state.cart, { product, count }]
        };
      }
    },

    removeFromCart: (state, product) => {
      const newCart = state.cart.filter(item => item.product._id !== product.product._id);

      sessionStorage.setItem('isk cart', JSON.stringify(newCart))
      return {
        ...state,
        cart: [...newCart]
      };
    },

    removeAllCart: (state) => {
      sessionStorage.setItem('isk cart', JSON.stringify([]))
      return {
        ...state,
        cart: []
      }
    },

    setOrdersSuccessOnTrue: (state) => {
      return {
        ...state,
        orderSuccess: true,
      }
    },    
    setOrdersSuccessOnFalse: (state) => {
      return {
        ...state,
        orderSuccess: false,
      }
    },


    increment: (state, product) => {
      const updatedCart = state.cart.map(item => {
        if (item.product._id === product.product._id) return { ...item, count: item.count + 1 };
        return item;
      });

      sessionStorage.setItem('isk cart', JSON.stringify(updatedCart))
      return {
        ...state,
        cart: updatedCart
      };

    },

    decrement: (state, product) => {
      const updatedCart = state.cart.map(item => {
        if (item.product._id === product.product._id) return { ...item, count: item.count - 1 };
        return item;
      });

      sessionStorage.setItem('isk cart', JSON.stringify(updatedCart))
      return {
        ...state,
        cart: updatedCart
      };
    },
    restore: (state, cart) => {
      return {
        ...state,
        cart: cart
      };
    },


    countPrices: (state) => {

      const prices = state.cart.map(item => {
        if(state.user.role !== "manager") {
          if (item.count > 1)
            return item.product.promoPrice > 0 ? item.product.promoPrice * 100 * item.count : Math.round(item.product.salePriceTypesSimple[2].value.toPrecision(4) / 100) * item.count
          else {
            return item.product.promoPrice > 0 ? item.product.promoPrice * 100 : Math.round(item.product.salePriceTypesSimple[2].value.toPrecision(4) / 100)
          }
        }
        else{
          if (item.count > 1)
            return item.product.promoPrice > 0 ? item.product.promoPrice * 100 * item.count : item.product.price * item.count
          else {
            return item.product.promoPrice > 0 ? item.product.promoPrice * 100 : item.product.price
          }
        }
        // console.log(item);

      }); // Extract prices from each item
      const sumOfPrices = prices.reduce((a, b) => a + b, 0); // Sum up the prices
      return {
        ...state,
        prices: sumOfPrices
      };
    },

    countLenString: (state) => {
      const cartQuantity = state.cart?.reduce((acc, rec) =>  acc + rec.count,0)
      const lastDigit = cartQuantity % 10;
      const lastTwoDigits = cartQuantity % 100;
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return { ...state, lenString: `${cartQuantity} товаров` };
      }
      if (lastDigit === 1) {
        return { ...state, lenString: `${cartQuantity} товар` };
      }
      if (lastDigit >= 2 && lastDigit <= 4) {
        return { ...state, lenString: `${cartQuantity} товара` };
      }
      return {
        ...state,
        lenString: `${cartQuantity} товаров`
      };
    },

    countLen: (state) => {
      return {
        ...state,
        len: state.cart.length
      }
    },

    afterLoginUser: (state, info) => {
      // console.log(info)
      localStorage.setItem('isk user', JSON.stringify(info))
      return {
        ...state,
        user: info
      }
    },
    userLogOut: (state) => {
      localStorage.removeItem('isk user')
      return {
        ...state,
        user: {}
      }
    }
  },
};

export default cart;
