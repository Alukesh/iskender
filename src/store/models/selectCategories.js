

// const initialState = {
//     categoryId: null,
// };

const selectCategories = {
    state: {
        categoryId: null,
        queryString: null,
    },
    reducers: {
        setCategoryId: (state, payload, queryString) => {
            return { ...state, categoryId: payload, queryString: queryString };
        },
    },
};

export default selectCategories;
