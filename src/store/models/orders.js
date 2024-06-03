import api from '../../services/api/index';

const orders = {
  state: {
    data: [],
    userId: localStorage.getItem("orderId") ? localStorage.getItem("orderId") : []
  },
  reducers: {
    setOrders: (state, payload) => ({
      ...state,
      data: payload,
    }),
    changeUserId: (state, payload) => ({
      ...state,
      userId: payload,
    }),
  },
  effects: (dispatch) => ({
    async getOrders(params) {
      const {
        data: { objects },
      } = await api.get(`/api/getOrders${params}`);

      dispatch.orders.setOrders(objects || []);
    },
  }),
};

export default orders;
