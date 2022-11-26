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
  useToast,
  Heading,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import FeatherIcon from "feather-icons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ForgotPasswordAdmin } from "../../../redux/authentication/actionCreator";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation();
  // console.log(path, "path singin");

  const [emailData, setEmailData] = useState({
    email: "",
  });

  const { email } = emailData;
  const onChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const ResetHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(ForgotPasswordAdmin(emailData)).then((res) => {
      console.log(res, "res data");
      if (res && res.success === true) {
        console.log(res, "this forgot password");
        localStorage.setItem("verifiedEmail", res.data.email);
        toast(res.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate(`/verify-otp/${res.data.id}`);
        }, 1500);
      } else {
        console.log(res.errors[0].msg, "false method");
        toast(res.errors[0].msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  return (
    <Flex
      bg="gray.100"
      align="center"
      justify="center"
      h="100vh"
      flexDir={"column"}
    >
      <Heading as={"h1"} my={"30px"}>
        Forgot Password!
      </Heading>
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik>
          <form>
            <Heading as={"h6"} size={"xs"} mb={"2rem"}>
              Enter your account email
            </Heading>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="email" name="email">
                  Email Address
                </FormLabel>
                <Field
                  as={Input}
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="example@gmail.com"
                  onChange={(e) => onChange(e)}
                />
              </FormControl>

              <Button
                type="submit"
                bg={"#1e91ff"}
                color={"#fff"}
                _hover={{ color: "#fff", bg: "#206fbb" }}
                width="full"
                onClick={(e) => ResetHandleSubmit(e)}
              >
                Send Email
              </Button>
              <Flex w={"100%"}>
                <InputGroup width={"100%"}>
                  <Button
                    w={"100%"}
                    color={"black"}
                    _hover={{ color: "#fff", bg: "#206fbb" }}
                  >
                    <Link to="/" style={{ width: "100%" }}>
                      <InputLeftElement>
                        <FeatherIcon
                          icon="arrow-left"
                          _hover={{ stroke: "#fff" }}
                        />
                      </InputLeftElement>
                      Login
                    </Link>
                  </Button>
                </InputGroup>
              </Flex>
            </VStack>
          </form>
        </Formik>
      </Box>
      <ToastContainer />
    </Flex>
  );
}
