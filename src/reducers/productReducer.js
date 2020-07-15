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

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    // why in read part when the action success is reached, you don't update the state flag success to true
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productCreateReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_CREATION_REQUEST:
      return { loading: true };
    case PRODUCT_CREATION_SUCCESS:
      // why in here in the creation action, you add a flag about the product is successfully created?
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATION_FAIL:
      // besides why in case of fails, you don't have a flag called fail;
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

function productUpdateReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      // why in here in the UPDATE action, you add a flag about the product is successfully created?
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      // besides why in case of fails, you don't have a flag called fail;
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

function productDeleteReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      // why in here in the DELETE action, you add a flag about the product is successfully created?
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_DELETE_FAIL:
      // besides why in case of fails, you don't have a flag called fail;
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
};
