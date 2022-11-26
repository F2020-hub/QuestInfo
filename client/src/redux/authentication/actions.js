const actions = {
  LOGIN_BEGIN: 'LOGIN_BEGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERR: 'LOGIN_ERR',

  LOGOUT_BEGIN: 'LOGOUT_BEGIN',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERR: 'LOGOUT_ERR',
  LOGIN_SUCCESS_CULTURE_WARRIOR: 'LOGIN_SUCCESS_CULTURE_WARRIOR',

  PASSWORD_FORGOT_BEGIN:"PASSWORD_FORGOT_BEGIN",
  PASSWORD_FORGOT_SUCCESS:"PASSWORD_FORGOT_SUCCESS",
  PASSWORD_FORGOT_ERR:"PASSWORD_FORGOT_ERR",

  RESET_PASSWORD_BEGIN:"RESET_PASSWORD_BEGIN",
  RESET_PASSWORD_SUCCESS:"RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_ERR:"RESET_PASSWORD_ERR",

  VERIFY_OTP_BEGIN:"VERIFY_OTP_BEGIN",
  VERIFY_OTP_SUCCESS :"VERIFY_OTP_SUCCESS",
  VERIFY_OTP_ERR:"VERIFY_OTP_ERR",

  loginBegin: () => {
    return {
      type: actions.LOGIN_BEGIN,
    };
  },
  loginSuccess: data => {
    return {
      type: actions.LOGIN_SUCCESS,
      data,
    };
  },
  loginErr: err => {
    return {
      type: actions.LOGIN_ERR,
      err,
    };
  },

  forgotPasswordBegin:()=>{
    return {
      type:actions.PASSWORD_FORGOT_BEGIN
    }
  },
  forgotPasswordSuccess:data =>{
    return{
      type:actions.PASSWORD_FORGOT_SUCCESS,
      ...data,
    }
  },
  forgotPasswordErr:(err)=>{
    return{
      type:actions.PASSWORD_FORGOT_ERR,
      err
    }
  },

  resetPasswordBegin:()=>{
    return{
      type:actions.RESET_PASSWORD_BEGIN,
    }
  },
  resetPasswordSuccess:(data)=>{
    return{
      type:actions.RESET_PASSWORD_SUCCESS,
      data
    }
  },
  resetPasswordErr:err=>{
    return{
      type:actions.RESET_PASSWORD_ERR,
      err
    }
  },
  
  verifyOtpBegin:()=>{
    return {
      type:actions.VERIFY_OTP_BEGIN
    }
  },
  verifyOtpSuccess:data =>{
    return{
      type:actions.VERIFY_OTP_SUCCESS,
      data:data,
    }
  },
  verifyOtpErr:(err)=>{
    return{
      type:actions.VERIFY_OTP_ERR,
      err
    }
  },
  
  logoutBegin: () => {
    return {
      type: actions.LOGOUT_BEGIN,
    };
  },
  logoutSuccess: data => {
    return {
      type: actions.LOGOUT_SUCCESS,
      data,
    };
  },
  logoutErr: err => {
    return {
      type: actions.LOGOUT_ERR,
      err,
    };
  },
};



export default actions;
