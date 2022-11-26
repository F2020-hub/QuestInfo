import React, { lazy } from "react";
import { useSelector } from "react-redux";
import {Navigate, Outlet} from 'react-router'
import { useNavigate } from "react-router-dom";


const Singin = lazy(()=> import('../pages/Profiles/Authon/Signin'));


const ProtectedRoute =()=>{
  // const navigate = useNavigate()
  const isLoggedIn = useSelector(state => state.Auth.login);
  // console.log(isLoggedIn,'isLoggedIn protected');

  return isLoggedIn ? <Outlet /> : Navigate('/login');
}

export default ProtectedRoute;