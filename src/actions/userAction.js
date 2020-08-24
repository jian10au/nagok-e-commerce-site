import axios from "axios";
import {
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../reducers/ActionType";

import { BASE_URL } from "../config";

export const loadUserInfo = () => async (dispatch, getState) => {
  const token = getState().user.userInfo.token;
  try {
    const response = await axios.get(`${BASE_URL}/api/users/credentialuser`, {
      headers: {
        Authorization: "Bearer" + token,
      },
    });

    dispatch({ type: USER_LOAD_SUCCESS, payload: response.data });

    localStorage.setItem("token", response.data.token);
  } catch (error) {
    await dispatch({
      type: USER_LOAD_FAIL,
      payload: { message: error.message },
    });
    localStorage.removeItem("token");
  }
};

export const signIn = (email, password) => async (dispatch, getState) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(`${BASE_URL}/api/users/signin`, {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  console.log("what happens");
  try {
    const { data } = await axios.post(`${BASE_URL}/api/users/register`, {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("Items");
  localStorage.removeItem("token");
  //in logging out, remove all the browser side of user info
  // and also dispatch action loggout; the
  // loggout action will remove the reducer data as well
};

export const update = (userId, name, email, password) => async (
  dispatch,
  getState
) => {
  const {
    user: { userInfo },
  } = getState();
  dispatch({
    type: USER_UPDATE_REQUEST,
    payload: { userId, name, email, password },
  });

  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/users/` + userId,
      { name, email, password },
      {
        headers: {
          Authorization: "Bearer" + userInfo.token,
        },
      }
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    localStorage.removeItem("token");
  }
};
