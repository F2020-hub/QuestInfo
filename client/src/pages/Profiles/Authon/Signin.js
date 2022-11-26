import React, { useState } from "react";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { login } from "../../../redux/authentication/actionCreator";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const path = useLocation();
  // console.log(path,'path singin')

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    loading: false,
  });
  const { email, password } = userInfo;
  // console.log(userInfo,'userInfo')
  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userInfo)).then((res) => {
      if (res && res.success) {
        toast(res.msg, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, [1000]);
      }
      if (res && res.errors) {
        console.log(res.errors, "res.errors");
        toast(res.errors[0].msg, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
  // const notify = () => toast("Wow so easy!");

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="email" name="email">
                  Email Address
                </FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>
              <FormControl name="password">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
                {/* <FormErrorMessage>{errors.password}</FormErrorMessage> */}
              </FormControl>
              <Flex>
                <Link to="/forgot-password">Forgot Password</Link>
              </Flex>
              <Button
                type="submit"
                bg={"#1e91ff"}
                color={"#fff"}
                _hover={{ color: "#fff", bg: "#206fbb" }}
                width="full"
              >
                Login
              </Button>
            </VStack>
            <ToastContainer />
          </form>
        </Formik>
      </Box>
    </Flex>
  );
}
