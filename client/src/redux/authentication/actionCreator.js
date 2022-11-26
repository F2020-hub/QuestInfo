import actions from './actions';
import { toast } from "react-toastify";
import axios from 'axios';
import baseURL_Admin from '../baseURL_Admin'
const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess,
   logoutErr,forgotPasswordBegin,resetPasswordBegin,resetPasswordSuccess,
   resetPasswordErr,forgotPasswordSuccess,forgotPasswordErr,
    verifyOtpBegin,verifyOtpSuccess,verifyOtpErr,
  } = actions;
 

const login = (data) => {
  return async dispatch => {



      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      try {
        var res = await axios.post(`${baseURL_Admin.baseURL}/`, data, config);

          if(res.data && res.data.status === 1){
            localStorage.setItem('token',res.data.token);
          }
          // setTimeout(() => {
          //    dispatch(loginSuccess(data),
         
          //    );
          // }, 1000);
  
          return res.data;

   
      } catch (err) {
        const er = err.response.data;
       return er;
      }
      
    } 
  };

const ForgotPasswordAdmin=(data)=>{
  return async dispatch=>{
    try{
      dispatch(forgotPasswordBegin());
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    try{
     var res = await axios.post(`${baseURL_Admin.baseURL}/forgotPassword`,data,config)
    //  if(res.data && res.data.success == true){
      
        //  dispatch(forgotPasswordSuccess(data)) 
       console.log(res.data,'forgot password')
    //  }
     return res.data;
    }
    catch(err){
      const er = err.response.data;
      return er;
    }
  }
  catch(err){
    dispatch(forgotPasswordErr(err))
  }
};
};

const VerifyOTP=(id,data)=>{
  return async dispatch=>{
    try{
      dispatch(verifyOtpBegin());
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    try{
     var res = await axios.post(`${baseURL_Admin.baseURL}/verifyOtp/${id}`,data,config)
     if(res.data && res.data.success == true){
       setTimeout(()=>{
         dispatch(verifyOtpSuccess(data))
       },1000)
     }
    //  console.log(res, ' action reset')
     return res.data;
    }
    catch(err){
      const er = err.response.data;
      return er;
    }
  }
  catch(err){
    dispatch(verifyOtpErr(err))
  }
};
};

const ResetPaswordAdmin=(data,id,otptoken)=>{
  return async dispatch=>{
    try{
      dispatch(resetPasswordBegin());
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    try{
     var res = await axios.put(`${baseURL_Admin.baseURL}/reset_password/${id}/${otptoken}`,data,config)
     if(res.data && res.data.success == true){
       setTimeout(()=>{
         dispatch(resetPasswordSuccess(data))
       },1000)
     }
     return res.data;
    }
    catch(err){
      const er = err.response.data;
      return er;
    }
  }
  catch(err){
    dispatch(resetPasswordErr(err))
  }
};
};

const logOut = () => {
  return async dispatch => {
    try {
      dispatch(logoutBegin());
      localStorage.clear();
      dispatch(logoutSuccess(false));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login,logOut,ForgotPasswordAdmin,ResetPaswordAdmin,VerifyOTP };
