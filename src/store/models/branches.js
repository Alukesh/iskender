
const branches = {
  state: {
    data: [],
  },
  reducers: {
    setBranches: (state, payload) => ({
      ...state,
      data: payload,
    }),
  },
  effects: (dispatch) => ({

  }),
};

export default branches;
