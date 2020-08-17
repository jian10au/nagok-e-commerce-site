import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATION_REQUEST,
  PRODUCT_CREATION_SUCCESS,
  PRODUCT_CREATION_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
} from "./ActionType";
import { bindActionCreators } from "redux";

const INITIAL_STATE = {
  // handle index
  productList: {
    products: [],
    error: null,
    loading: false,
  },
  // handle create and update
  saveProduct: {
    product: {},
    error: null,
    loading: false,
  },

  // handle show;
  activeProduct: {
    product: {},
    error: null,
    loading: false,
  },

  //handle delete
  deleteProduct: {
    product: {},
    error: null,
    loading: false,
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // store for index
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        productList: {
          products: [],
          error: null,
          loading: true,
        },
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: {
          products: action.payload,
          error: null,
          loading: false,
        },
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        productList: {
          products: [],
          error: action.payload,
          loading: false,
        },
      };

    // store for show
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        activeProduct: {
          product: {},
          error: null,
          loading: true,
        },
      };
    case PRODUCT_DETAILS_SUCCESS: {
      return {
        ...state,
        activeProduct: {
          product: action.payload,
          error: null,
          loading: false,
        },
      };
    }

    case PRODUCT_DETAILS_FAIL: {
      return {
        ...state,
        activeProduct: {
          product: {},
          error: action.payload,
          loading: false,
        },
      };
    }

    // store for create
    case PRODUCT_CREATION_REQUEST: {
      return {
        ...state,
        saveProduct: {
          product: {},
          error: null,
          loading: true,
        },
      };
    }

    case PRODUCT_CREATION_SUCCESS: {
      return {
        ...state,
        saveProduct: {
          product: action.payload,
          error: null,
          loading: false,
        },
      };
    }

    case PRODUCT_CREATION_FAIL: {
      return {
        ...state,
        saveProduct: {
          product: {},
          error: action.payload,
          loading: false,
        },
      };
    }

    // store for update
    case PRODUCT_UPDATE_REQUEST: {
      return {
        ...state,
        saveProduct: {
          product: {},
          error: null,
          loading: true,
        },
      };
    }

    case PRODUCT_UPDATE_SUCCESS: {
      return {
        ...state,
        saveProduct: {
          product: action.payload,
          error: null,
          loading: false,
        },
      };
    }

    case PRODUCT_UPDATE_FAIL: {
      return {
        ...state,
        saveProduct: {
          product: {},
          error: null,
          loading: false,
        },
      };
    }

    //store for delete
    case PRODUCT_DELETE_REQUEST: {
      return {
        ...state,
        deleteProduct: {
          product: {},
          error: null,
          loading: true,
        },
      };
    }

    case PRODUCT_DELETE_SUCCESS: {
      return {
        ...state,
        deleteProduct: {
          product: action.payload,
          error: null,
          loading: false,
        },
      };
    }

    case PRODUCT_DELETE_FAIL: {
      return {
        ...state,
        deleteProduct: {
          product: {},
          error: action.payload,
          loading: false,
        },
      };
    }
    default:
      return state;
  }
}
