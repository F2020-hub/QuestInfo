import Cookies from "js-cookie";
import actions from "./actions";

const {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERR,

  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_ERR,

  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERR,

  VERIFY_OTP_BEGIN,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_ERR,

  PASSWORD_FORGOT_BEGIN,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_ERR
} = actions;

const initState = {
  login: false,
  loading: false,
  error: null,
};

/**
 *Cookies.get('logedIn')
 * @todo impure state mutation/explaination
 */
const AuthReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    
    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
      };
    case LOGOUT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    
    case VERIFY_OTP_BEGIN:
      return {
        ...state,
        loading: false,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
      };
    case VERIFY_OTP_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    
    case RESET_PASSWORD_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
      };
    case RESET_PASSWORD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    
    case PASSWORD_FORGOT_BEGIN:
        return {
          ...state,
          loading: true,
        };
    case PASSWORD_FORGOT_SUCCESS:
        return {
          ...state,
          login: data,
          loading: false,
        };
    case PASSWORD_FORGOT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    
    default:
      return state;
  }
};
export default AuthReducer;
