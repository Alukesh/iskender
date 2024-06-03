import api from "../../services/api/index"

const stories = {
    state: {
        data: [],
        watched: [],
    },
    reducers: {
        setStories: (state, payload) => ({
            ...state,
            data: payload,
        }),
        setWatched: (state, payload) => ({
            ...state,
            watched: {
                ...state.watched,
                [payload]: true,
            },
        }),
    },
    effects: (dispatch) => ({
        async getStories() {
            const {
                data: { objects },
            } = await api.get("/getStories")

            dispatch.stories.setStories(objects || [])
        },
    }),
}

export default stories
