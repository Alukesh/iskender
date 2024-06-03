
const initialState = {
    productId: null,
};

const selectProducts = {
    state: initialState,
    reducers: {
        setProductId(state, payload) {
            return { ...state, productId: payload };
        },
    },
};

export default selectProducts;
