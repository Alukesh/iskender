
const news = {
  state: {
    data: [],
  },
  reducers: {
    setNews: (state, payload) => ({
      ...state,
      data: payload,
    }),
  },
  effects: (dispatch) => ({
   
  }),
};

export default news;
