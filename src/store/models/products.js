import api from "../../services/api/index"

const products = {
    state: {
        data: [],
        productById: [],
        liked: {},
    },
    reducers: {
        setProducts: (state, payload) => ({
            ...state,
            data: payload,
        }),
        setProductById: (state, payload) => ({
            ...state,
            productById: payload,
        }),
        setLiked: (state, payload) => ({
            ...state,
            liked: {
                ...state.liked,
                [payload]: state.liked[payload] ? false : true,
            },
        }),
    },
    effects: (dispatch) => ({
        async getAllProducts(params) {
            const {
                data: { objects },
            } = await api.get(`/api/getProductsAll`)

            dispatch.products.setProducts(objects || [])
        },

        async getProductById(args) {
            console.log(args, 'checking');
            if (Object.keys(args.products).length) {
                console.log('found--2');
                let list = args.products;

                for (let key in list) {
                    console.log(list, key, 'found--3');
                    if (key === args.id) {
                        console.log(list[key],'found-6');
                        dispatch.products.setProductById(list[key] || [])
                    } else {
                        list[key].map((item) => {
                            console.log(item, 'found--4');
                            item.map((category) => {
                                console.log(category, 'found--5');
                                if (category._id === args.id) {
                                    console.log(item, 'found--1');
                                }
                            })
                        })
                    }
                }
                
                // args.products.map((category) => {
                //     console.log(category, 'asd--');
                //     category.map((item) => {
                //         if (category._id === args.id) {
                //             console.log(item, 'found--');
                //         }
                //     })
                // })
                // dispatch.products.setProductById(objects || [])
            } else if (args.id) {
                console.log(args.id, 'call-1');
                const {
                    data: { objects },
                } = await api.get(`/api/getProducts?categoryId=${args.id}&page=1&limit=511`)
                dispatch.products.setProductById(objects || [])
            }
        }
    }),
}

export default products
