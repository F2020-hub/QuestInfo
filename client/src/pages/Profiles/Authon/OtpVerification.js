import React, { useState } from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  PinInput,
  Flex,
  PinInputField,
  Heading,
  FormControl,
  HStack,
  Text,
} from "@chakra-ui/react";
import { VerifyOTP } from "../../../redux/authentication/actionCreator";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  // const path = useLocation();
  let query = useParams();
  // console.log(query);
  // const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailverified = localStorage.getItem("verifiedEmail");
  const [otps, setOtps] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  const { otp1, otp2, otp3, otp4, otp5, otp6 } = otps;
  if (otps && otps.length && otps.length(6)) {
    console.log(otps, "opt page");
  }
  const handleOnChange = (e) => {
    setOtps({ ...otps, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var makeOneOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    // console.log(makeOneOtp);
    var formData = {};
    formData.otp = makeOneOtp;
    dispatch(VerifyOTP(query.id, formData)).then((res) => {
      if (res && res.success) {
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
          navigate(`/reset-password/${query.id}/${res.data.otptoken}`);
        }, 1000);
      } else {
        console.log(res, "not vaild OTP");
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
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={96}>
        <Formik>
          <form onSubmit={handleSubmit}>
            <Heading as={"h6"} size={"xs"} mb={"7px"}>
              Verify the Authorisation code
            </Heading>
            <Text fontSize="xs">Sent to : {emailverified} </Text>
            <HStack spacing={4} align="flex-start" my="2rem">
              <FormControl
                display="flex"
                justifyContent="center"
                alignItem="center"
                gap="10px"
                isRequired
              >
                <PinInput size="lg" otp>
                  <PinInputField
                    name="otp1"
                    value={otp1}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <PinInputField
                    name="otp2"
                    value={otp2}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <PinInputField
                    name="otp3"
                    value={otp3}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <PinInputField
                    name="otp4"
                    value={otp4}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <PinInputField
                    name="otp5"
                    value={otp5}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <PinInputField
                    name="otp6"
                    value={otp6}
                    onChange={(e) => handleOnChange(e)}
                  />
                </PinInput>
              </FormControl>
            </HStack>
            <Button
              type="submit"
              bg={"#1e91ff"}
              color={"#fff"}
              _hover={{ color: "#fff", bg: "#206fbb" }}
            >
              Verify
            </Button>
          </form>
        </Formik>
      </Box>
      <ToastContainer />
    </Flex>
  );
}
