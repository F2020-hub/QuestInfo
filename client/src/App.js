import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";

// import all pages from page
import Dashboard from "./pages/Dashboard/Dashboard";
import AddLeads from "./pages/Leads/AddLeads";
import EditLeads from "./pages/Leads/EditLeads";
import AllLeads from "./pages/Leads/AllLeads";
import Import from "./pages/Leads/Import";
import ForgotPassword from "./pages/Profiles/Authon/ForgotPassword";
import Signin from "./pages/Profiles/Authon/Signin";
import AdminInfo from "./pages/Profiles/ProfileInfo/AdminInfo";
import AddProject from "./pages/Projects/AddProject";
import EditProject from "./pages/Projects/EditProject";
import ProjectList from "./pages/Projects/ProjectList";
import Report from "./pages/Reports/Report";
import RestPassword from "./pages/Profiles/Authon/ResetPassword";
import MainMenuLyout from "./LayoutMenu/MainMenuLyout";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./Routes/protectedRoute";
import store from "./redux/store";
import OtpVerification from './pages/Profiles/Authon/OtpVerification'



const ProviderConfig = () => {
  // const isLoggedIn = localStorage.getItem('token');
  const Token = localStorage.getItem('token');
  // console.log(Token , 'token cheker');
  // alert(Token , 'token cheker');
  return (
    <Routes>

      <Route path="/" element={<MainMenuLyout />} >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leads">
          <Route path="add-lead" element={<AddLeads />} />
          <Route path="import-lead" element={<Import />} />
          <Route path="all-leads" element={<AllLeads />}/>
          <Route path="all-leads/:id" element={<EditLeads />} />
        </Route>
        <Route path="project">
          <Route path="add-project" element={<AddProject />} />
          <Route path="projects-list" element={<ProjectList />}/>
          <Route path="projects-list/:id" element={<EditProject />} />
        </Route>
        <Route path="setting">
          <Route path="profile" element={<AdminInfo />} />     
        </Route>
        <Route path="report">
          <Route index element={<Report />} />
        </Route>
      </Route> 
      <Route path="/">
        <Route index element={<Signin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp/:id" element={<OtpVerification />} />
        <Route path="/reset-password/:id/:otptoken" element={<RestPassword />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
};

export default App;
