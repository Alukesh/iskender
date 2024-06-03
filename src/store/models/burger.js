import api from "../../services/api/index"

const burger = {
    state: {
        burger: [],
    },
    reducers: {
        setBranches: (state, payload) => ({
            ...state,
            data: payload,
        }),
    },
}

export default branches
