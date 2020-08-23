import axios from "axios";
const {
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
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} = require("../reducers/ActionType");

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:5000/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
  }
};

// noitice, the async fn whcih returns a function
// that function by default will take a dispatch action

export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    // the stackoverflow says above line of code is synchronous;
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${productId}`
    );
    console.log(data, "what is the data");
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  const {
    user: {
      userInfo: { token },
    },
  } = getState();

  // get the token from redux state by deconstructing the deelply nested token object

  try {
    dispatch({ type: PRODUCT_CREATION_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/api/products",
      product,
      {
        headers: { Authorization: "Bearer" + token },
      }
    );
    // I don't need to write the error in here cause any error posint will be captured below
    dispatch({ type: PRODUCT_CREATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CREATION_FAIL, payload: error.message });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  const {
    user: {
      userInfo: { token },
    },
  } = getState();

  // get the token from redux state by deconstructing the deelply nested token object

  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    const { data } = await axios.put(
      `http://localhost:5000/api/products/${product._id}`,
      product,
      {
        headers: { Authorization: "Bearer" + token },
      }
    );
    // I don't need to write the error in here cause any error posint will be captured below
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  const {
    user: {
      userInfo: { token },
    },
  } = getState();

  // get the token from redux state by deconstructing the deelply nested token object

  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const { data } = await axios.delete(
      `http://localhost:5000/api/products/${productId}`,
      {
        headers: { Authorization: "Bearer" + token },
      }
    );
    // I don't need to write the error in here cause any error posint will be captured below
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};
