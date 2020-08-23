import {
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "./ActionType";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const INITIAL_STATE = {
  userInfo: { token },
  error: null,
  loading: false,
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case USER_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        isAuthenticated: false,
      };

    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        isAuthenticated: false,
      };

    case USER_LOAD_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isAuthenticated: true,
      };

    case USER_LOAD_FAIL:
      return {
        ...state,
        error: action.payload.message,
      };

    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload.message };

    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export { userReducer };
