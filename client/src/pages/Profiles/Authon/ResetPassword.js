import React, { useState } from "react";
import { Formik, Field } from "formik";
import {
  VStack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { ResetPaswordAdmin } from "../../../redux/authentication/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  // console.log(param,'param')

  const [newpassword, SetNewPassword] = useState({
    password: "",
    confirm_password: "",
  });
  const [showNewPssword, setshowNewPssword] = useState(false);
  const [showConfirmPssword, setshowConfirmPssword] = useState(false);
  const handleClickconfirm = () => setshowConfirmPssword(!showConfirmPssword);
  const handleClicknew = () => setshowNewPssword(!showNewPssword);

  const { password, confirm_password } = newpassword;
  const onChange = (e) =>
    SetNewPassword({ ...newpassword, [e.target.name]: e.target.value });

  const onHandleSSubmit = (e) => {
    e.preventDefault();
    // console.log('newpassword',newpassword)
    dispatch(ResetPaswordAdmin(newpassword, param.id, param.otptoken)).then(
      (res) => {
        if (res.status === 1) {
          console.log(res.msg, "RESET PASSWORD METHOD");
          toast(res.msg, {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate(`/`);
          }, 1500);
        } else {
          console.log(res.errors[0].msg, "RESET PASSWORD METHOD");
          toast(res.errors[0].msg, {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    );
  };

  return (
    <Flex
      bg="gray.100"
      align="center"
      justify="center"
      h="100vh"
      flexDir={"column"}
    >
      <ToastContainer />

      <Heading as={"h1"} my={"30px"}>
        Reset Password
      </Heading>
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik>
          <form onSubmit={onHandleSSubmit}>
            <Heading as={"h6"} size={"xs"} mb={"2rem"}></Heading>
            <VStack spacing={4} align="flex-start">
              <FormControl name="password">
                <FormLabel htmlFor="password">New Password</FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  value={password}
                  onChange={(e) => onChange(e)}
                  icon={
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClicknew}
                        _focus="none"
                      >
                        {showNewPssword ? (
                          <FeatherIcon icon="eye" size={16} />
                        ) : (
                          <FeatherIcon icon="eye-off" size={16} />
                        )}
                      </Button>
                    </InputRightElement>
                  }
                />

                {/* <FormErrorMessage>{errors.password}</FormErrorMessage> */}
              </FormControl>
              <FormControl name="password">
                <FormLabel htmlFor="confirm_password">
                  Confirm Password
                </FormLabel>
                <Field
                  as={Input}
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  variant="filled"
                  value={confirm_password}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>
              <Button
                type="submit"
                bg={"#1e91ff"}
                color={"#fff"}
                _hover={{ color: "#fff", bg: "#206fbb" }}
                width="full"
              >
                Submit
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
    </Flex>
  );
};

export default RestPassword;
