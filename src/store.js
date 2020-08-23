import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
} from "../src/reducers/productReducer.js";

import productReducer from "../src/reducers/productReducer";

import { cartReducer } from "./reducers/cartReducer";
import { userReducer } from "./reducers/userReducer";
import { orderReducer } from "./reducers/orderReducer";
import { pageReducer } from "./reducers/pageReducer";

import thunk from "redux-thunk";

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
//basically, set the cartItems to array stored or an empty array

// notice, by doing this I am actually doing something like this

// {cart:{cartItems:[{},{}]}}

// notice I need to put cartItems in here because later;
// I will deconstruct the const {cartItems} = cart;
// if there is no {}, in the CartPage; cartItem will become the undefined
//when the browser is refreshed; the redux app is reinitialized therefore all the info is lost;
// you want let the redux get the info store in the localStorage and use that info as the initial value
// this way the redux will remember what happens in there.
const reducer = combineReducers({
  product: productReducer,
  // productList: productListReducer,
  cart: cartReducer,
  user: userReducer,
  // userSignIn: userSignInReducer,
  // userRegister: userRegisterReducer,
  // userUpdate: userUpdateReducer,
  page: pageReducer,
  order: orderReducer,
});
//reducer is fn that takes in an action and return a new state;

export const store = createStore(
  reducer,

  composeWithDevTools(applyMiddleware(thunk))
);
// why do we need to intialState at all in here?
