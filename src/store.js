import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "../src/reducers/productReducer";
import thunk from "redux-thunk";

const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
});
//reducer is fn that takes in an action and return a new state;

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
// why do we need to intialState at all in here?
