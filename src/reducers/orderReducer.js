import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDERS_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "./ActionType";

const INITIAL_STATE = {
  // handle index
  orderList: {
    orders: [],
    error: null,
    loading: false,
  },
  // handle create and update
  saveOrder: {
    order: {},
    error: null,
    loading: false,
  },

  // handle show;
  activeOrder: {
    order: {},
    error: null,
    loading: false,
  },

  //handle delete
  deleteOrder: {
    order: {},
    error: null,
    loading: false,
  },
};

export const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        saveOrder: {
          ...state.saveOrder,
          loading: true,
        },
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        saveOrder: {
          ...state.saveOrder,
          loading: false,
          order: action.payload,
        },
      };
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        saveOrder: {
          ...state.saveOrder,
          loading: false,
          error: action.payload,
        },
      };
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        activeOrder: {
          ...state.activeOrder,
          loading: true,
        },
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        activeOrder: {
          ...state.activeOrder,
          loading: false,
          order: action.payload,
        },
      };
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        activeOrder: {
          ...state.activeOrder,
          loading: false,
          error: action.payload,
        },
      };

    case ORDER_PAY_REQUEST:
      return {
        ...state,
        saveOrder: {
          ...state.saveOrder,
          loading: true,
        },
      };
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        saveOrder: {
          ...state.saveOrder,
          order: action.payload.order,
          loading: false,
        },
      };
    case ORDER_PAY_FAIL:
      return {
        ...state,
        saveOrder: {
          ...state.saveOrder,
          loading: false,
          error: action.payload,
        },
      };

    case ORDER_DELIVER_REQUEST:
      return {
        ...state,
        saveOrder: {
          ...state.saveOrder,
          loading: true,
        },
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        saveOrder: {
          ...state.saveOrder,
          order: action.payload.order,
          loading: false,
        },
      };
    case ORDER_DELIVER_FAIL:
      return {
        ...state,
        saveOrder: {
          ...state.saveOrder,
          loading: false,
          error: action.payload,
        },
      };

    case MY_ORDER_LIST_REQUEST:
      return {
        ...state,
        orderList: {
          ...state.orderList,
          loading: true,
        },
      };
    case MY_ORDER_LIST_SUCCESS:
      return {
        ...state,
        orderList: {
          ...state.orderList,
          orders: action.payload,
          loading: false,
        },
      };
    case MY_ORDER_LIST_FAIL:
      return {
        ...state,
        orderList: {
          ...state.orderList,
          loading: false,
          error: action.payload,
        },
      };
    case ORDERS_LIST_REQUEST:
      return {
        ...state,
        orderList: {
          ...state.orderList,
          loading: true,
        },
      };
    case ORDERS_LIST_SUCCESS:
      return {
        ...state,
        orderList: {
          ...state.orderList,
          orders: action.payload,
          loading: false,
        },
      };
    case ORDERS_LIST_FAIL:
      return {
        ...state,
        orderList: {
          ...state.orderList,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

// const ordersListReducer = (
//   state = {
//     orders: [],
//   },
//   action
// ) => {
//   switch (action.type) {
//     case ORDERS_LIST_REQUEST:
//       return { loading: true };
//     case ORDERS_LIST_SUCCESS:
//       return { loading: false, orders: action.payload };
//     case ORDERS_LIST_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const orderDeleteReducer = (state = { order: {} }, action) => {
//   switch (action.type) {
//     case ORDER_DELETE_REQUEST:
//       return { loading: true };
//     case ORDER_DELETE_SUCCESS:
//       // why in here in the DELETE action, you add a flag about the ORDER is successfully created?
//       return { loading: false, success: true, order: action.payload };
//     case ORDER_DELETE_FAIL:
//       // besides why in case of fails, you don't have a flag called fail;
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// function orderPayReducer(
//   state = {
//     order: {
//       orderItems: [],
//       shipping: {},
//       payment: {},
//     },
//   },
//   action
// ) {
//   switch (action.type) {
//     case ORDER_PAY_REQUEST:
//       return { loading: true };
//     case ORDER_PAY_SUCCESS:
//       return { loading: false, success: true };
//     case ORDER_PAY_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// }

// export {
//   orderCreateReducer,
//   orderDetailsReducer,
//   orderPayReducer,
//   myOrderListReducer,
//   ordersListReducer,
//   orderDeleteReducer,
// };
