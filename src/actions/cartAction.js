import axios from "axios";
import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../reducers/ActionType";

function addToCart(productId, qty) {
  return async function (dispatch, getState) {
    try {
      dispatch({ type: CART_ADD_ITEM_REQUEST });
      const { data } = await axios.get(
        "https://nagok-e-commerce.herokuapp.com/api/products/" + productId
      );

      dispatch({
        type: CART_ADD_ITEM_SUCCESS,
        payload: {
          productId: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          brand: data.brand,
          countInStock: data.countInStock,
          description: data.description,
          qty: qty,
        },
      });
      const {
        cart: { cartItems },
      } = getState();

      localStorage.setItem("Items", JSON.stringify(cartItems.items));
    } catch (error) {
      dispatch({ type: CART_ADD_ITEM_FAIL, payload: error.message });
    }
  };
}

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  //pull out the piece of state related to the cartItems basically the cardItems arrray;
  // when you store things into localStorage you had to convert it into string otherwise, it is the [object Object] literal gets stored
  localStorage.setItem("Items", JSON.stringify(cartItems.items));
};

const saveShipping = (data) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING,
    payload: data,
  });
};

const savePayment = (data) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: data,
  });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
