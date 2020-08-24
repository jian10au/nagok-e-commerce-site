import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDERS_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from "../reducers/ActionType";

import { BASE_URL } from "../config";
// notice the problem is still in here that the credential is extracted only from
// userSignIn Reducer; this means if a user first register and he does not refresh(therefore no
// credential is populated into the userSignIn reducer, credential check will fail)
const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const {
      user: { userInfo },
    } = getState();
    const {
      data: { data: newOrder },
    } = await axios.post(`${BASE_URL}/api/orders`, order, {
      headers: {
        Authorization: "Bearer" + userInfo.token,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    console.log(error);
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      user: { userInfo },
    } = getState();
    const { data } = await axios.get(`${BASE_URL}/api/orders/` + orderId, {
      headers: { Authorization: "Bearer" + userInfo.token },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const {
      user: { userInfo },
    } = getState();
    const { data } = await axios.put(
      `${BASE_URL}/api/orders/` + order._id + "/pay",
      paymentResult,
      {
        headers: { Authorization: "Bearer" + userInfo.token },
      }
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
};

const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
    const {
      user: { userInfo },
    } = getState();
    const { data } = await axios.put(
      `${BASE_URL}/api/orders/${orderId}/deliver`,
      { isPaid: true },
      {
        headers: { Authorization: "Bearer" + userInfo.token },
      }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS });
  } catch (error) {
    dispatch({ type: ORDER_DELIVER_FAIL });
  }
};

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const {
      user: { userInfo },
    } = getState();
    console.log("begin to make get request to my orders");
    const { data } = await axios.get(`${BASE_URL}/api/orders/mine`, {
      headers: { Authorization: "Bearer" + userInfo.token },
    });
    console.log("get the data from request to my order");
    console.log(data);
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
    console.log("why success action is not dispatched");
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
};

const listAllOrders = () => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();
  console.log("listAllOrders action going through");
  try {
    dispatch({ type: ORDERS_LIST_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/orders`, {
      headers: { Authorization: "Bearer" + userInfo.token },
    });
    dispatch({ type: ORDERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDERS_LIST_FAIL, payload: error.message });
  }
};

const deleteOrder = (orderId) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();
  console.log("listAllOrders action going through");
  try {
    dispatch({ type: ORDER_DELETE_REQUEST });
    const { data } = await axios.delete(`${BASE_URL}/api/orders/${orderId}`, {
      headers: { Authorization: "Bearer" + userInfo.token },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
};

export {
  createOrder,
  detailsOrder,
  payOrder,
  listMyOrders,
  listAllOrders,
  deleteOrder,
  deliverOrder,
};
