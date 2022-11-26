import React, { useState } from "react";

import {
  Divider,
  Flex,
  IconButton,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import FeatherIcon from 'feather-icons-react'
import Menus  from "./Menus";
import TopNavbar from "./TopNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logOut } from "../../redux/authentication/actionCreator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";




function Sidbar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarSize, setSidebarSize] = useState("large");


  const SignOut = e => {
    e.preventDefault();
    dispatch(logOut()).then(()=>{
       toast('User successfully logged out', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(()=>{
        navigate('/')
      },[1500])
    })
  };

  return (
    <>
    <TopNavbar />
    <Flex
     bg={useColorModeValue("#f3f2f1", "gray.900")}
      position="static"
      float="left"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
      w={sidebarSize == "small" ? "75px" : "230px"}
      flexDir="column"
      justifyContent="space-between"
      h="100%"
      minH="100vh"
    >
      <Flex
        p="5%"
        flexDir="column"
        justifyContent="center"
        alignItems={sidebarSize == "small" ? "center" : "flex-start"}
        as="nav"
        rowGap={2}
      >
        <IconButton
          background="none"
          _focus="none"
          _active="none"
          mt={5}
          icon={<FeatherIcon icon="menu" />}
          _hover={{ background: "none" }}
          onClick={() => {
            if (sidebarSize == "small") setSidebarSize("large");
            else setSidebarSize("small");
          }}
        >
        </IconButton>
        <Divider orientation="horizontal" />
        <Menus  sidebarSize={sidebarSize} title="Dashboard"   icons="home"  menuLink="/dashboard" />
        <Divider orientation='horizontal' />
         <Heading as='h6' size='xs' color="gray.500" my="1">Leads</Heading>
          <Menus  sidebarSize={sidebarSize} title="Add Leads" icons="trending-up"  menuLink="/leads/add-lead"  />
          <Menus  sidebarSize={sidebarSize} title="Import Lead"  icons="upload" menuLink={`/leads/import-lead`} />
          <Menus  sidebarSize={sidebarSize} title="All Leads" icons="list"  menuLink="/leads/all-leads" />
          <Divider orientation='horizontal' />
        <Heading as='h6' size='xs' color="gray.500">Project</Heading>
          <Menus  sidebarSize={sidebarSize} title="Add Project" icons="file-plus"   menuLink="/project/add-project"/>
          <Menus  sidebarSize={sidebarSize} title="Project List"   icons="layers" menuLink="/project/projects-list"/>
          <Divider orientation='horizontal' />
        <Heading as='h6' size='xs' color="gray.500">Report</Heading>
          <Menus  sidebarSize={sidebarSize} title="Report" icons="slack" menuLink="/report"/>
          <Divider orientation='horizontal' />
        <Heading as='h6' size='xs' color="gray.500">Setting</Heading>
          <Menus  sidebarSize={sidebarSize} title="Profile" icons="user"  menuLink="/setting/profile" />
          <Menus  sidebarSize={sidebarSize} title="Logout"   icons="log-out" onClick={SignOut} menuLink={''} />
        </Flex>
      </Flex>
      <ToastContainer />

      </>
  );
}

export default Sidbar;
