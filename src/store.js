import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
} from "../src/reducers/productReducer.js";

import { cartReducer } from "./reducers/cartReducer";
import { userSignInReducer, userRegisterReducer } from "./reducers/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  ordersListReducer,
  orderDeleteReducer,
} from "./reducers/orderReducer";

import { userUpdateReducer } from "./reducers/userReducer";

import thunk from "redux-thunk";

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
//basically, set the cartItems to array stored or an empty array

const initialState = { userSignIn: { userInfo } };

// notice, by doing this I am actually doing something like this

// {cart:{cartItems:[{},{}]}}

// notice I need to put cartItems in here because later;
// I will deconstruct the const {cartItems} = cart;
// if there is no {}, in the CartPage; cartItem will become the undefined
//when the browser is refreshed; the redux app is reinitialized therefore all the info is lost;
// you want let the redux get the info store in the localStorage and use that info as the initial value
// this way the redux will remember what happens in there.
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrderList: myOrderListReducer,
  orderList: ordersListReducer,
  orderDelete: orderDeleteReducer,
});
//reducer is fn that takes in an action and return a new state;

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
// why do we need to intialState at all in here?
