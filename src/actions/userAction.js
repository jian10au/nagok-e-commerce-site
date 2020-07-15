import axios from "axios";
import {
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

export const signIn = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  console.log("what happens");
  console.log({ email, password });
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/signin",
      {
        email,
        password,
      }
    );
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  console.log("what happens");
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/register",
      {
        name,
        email,
        password,
      }
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("cartItems");
  localStorage.removeItem("userInfo");
  //in logging out, remove all the browser side of user info
  // and also dispatch action loggout; the
  // loggout action will remove the reducer data as well
  dispatch({ type: USER_LOGOUT });
};

export const update = (userId, name, email, password) => async (
  dispatch,
  getState
) => {
  const {
    userSignIn: { userInfo },
  } = getState();
  dispatch({
    type: USER_UPDATE_REQUEST,
    payload: { userId, name, email, password },
  });

  try {
    const { data } = await axios.put(
      "http://localhost:5000/api/users/" + userId,
      { name, email, password },
      {
        headers: {
          Authorization: "Bearer" + userInfo.token,
        },
      }
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
};
