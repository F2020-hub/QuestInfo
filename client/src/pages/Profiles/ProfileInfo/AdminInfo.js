import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import { Formik } from "formik";
import bnr1 from "../../../static/Images/bnr1.png";
import ProfileBgImage from "../../../static/Images/ProfileBackground.png";
import {
  getDataProfileAdmin,
  updatedProfileAdmin,
  changePasswordAdmin,
} from "../../../redux/profile/actionCreator";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminInfo = () => {
  const [passwordChanges, setPasswordChanges] = useState({
    previous_password: "",
    new_password: "",
    confirm_password: "",
  });

  const { previous_password, new_password, confirm_password } = passwordChanges;

  const onChangePassword = (e) => {
    setPasswordChanges({ ...passwordChanges, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const [profileDetails, setProfileDetails] = useState([]);

  const getProfileInfo = () => {
    dispatch(getDataProfileAdmin()).then((res) => {
      if (res.success) {
        setProfileDetails(res.data);
        // console.log(res,'profile response');
      }
    });
  };

  const [updateProfile, setUpdateProfile] = useState({ name: "" });

  const onChange = (e) => {
    setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  const onHandleSSubmit = (e) => {
    e.preventDefault();
    //  console.log('updateProfile', updateProfile)
    dispatch(updatedProfileAdmin(updateProfile)).then((res) => {
      getProfileInfo();
      if (res && res.data.success) {
        toast(res.data.msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const onHandlePassword = (e) => {
    e.preventDefault();
    dispatch(changePasswordAdmin(passwordChanges)).then((res) => {
      console.log(res, "change password profile");
      if (res && res.success) {
        console.log(res, "success");
        toast(res.msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.log(res.errors[0].msg, "success");
        toast(res.errors[0].msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const [showNewPssword, setshowNewPssword] = useState(false);
  const [showoldPssword, setshowOldPssword] = useState(false);
  const [showConfirmPssword, setshowConfirmPssword] = useState(false);
  const handleClickconfirm = () => setshowConfirmPssword(!showConfirmPssword);
  const handleClicknew = () => setshowNewPssword(!showNewPssword);
  const handleClickOld = () => setshowOldPssword(!showoldPssword);

  const textColor = useColorModeValue("gray.700", "white");

  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const emailColor = useColorModeValue("gray.400", "gray.300");

  return (
    <Flex
      flexDirection="column"
      pt={{ base: "75px", md: "50px" }}
      px="30px"
      h={"100vh"}
      bg={useColorModeValue("#f3f2f1", "gray.900")}

    >
      <Tabs variant="soft-rounded" colorScheme="green">
        <Box
          mb={{ sm: "30px", md: "50px", xl: "50px" }}
          borderRadius="15px"
          px="0px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          align="center"
        >
          <Box
            bgImage={ProfileBgImage}
            w="100%"
            h="204px"
            borderRadius="25px"
            bgPosition="50%"
            bgRepeat="no-repeat"
            position="relative"
            display="flex"
            justifyContent="center"
          >
            <Flex
              direction={{ sm: "column", md: "row" }}
              mx="1.5rem"
              maxH="330px"
              w={{ sm: "90%", xl: "95%" }}
              justifyContent={{ sm: "center", md: "space-between" }}
              align="center"
              backdropFilter="saturate(200%) blur(50px)"
              position="absolute"
              boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
              border="2px solid"
              borderColor={borderProfileColor}
              bg={bgProfile}
              p="24px"
              borderRadius="20px"
              transform={{
                sm: "translateY(45%)",
                md: "translateY(110%)",
                lg: "translateY(85%)",
              }}
            >
              <Flex
                align="center"
                mb={{ sm: "10px", md: "0px" }}
                direction={{ sm: "column", md: "row" }}
                w={{ sm: "100%" }}
                textAlign={{ sm: "center", md: "start" }}
              >
                <Avatar
                  me={{ md: "22px" }}
                  src={bnr1}
                  w="80px"
                  h="80px"
                  borderRadius="15px"
                />
                <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
                  <Text
                    fontSize={{ sm: "lg", lg: "xl" }}
                    color={textColor}
                    fontWeight="bold"
                    ms={{ sm: "8px", md: "0px" }}
                  >
                    {profileDetails.name}
                  </Text>
                  <Text
                    fontSize={{ sm: "sm", md: "md" }}
                    color={emailColor}
                    fontWeight="semibold"
                  >
                    {profileDetails.email}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                direction={{ md: "column", lg: "row" }}
                w={{ sm: "100%", md: "50%", lg: "auto" }}
              >
                <TabList w={"100%"} >
                  <Flex
                    align="center"
                    w={{ sm: "100%", lg: "135px" }}
                    px={{ lg: "10px" }}
                    // bg='hsla(0,0%,100%,.3)'
                    borderRadius="15px"
                    justifyContent="center"
                    py="10px"
                    boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
                    border="1px solid gray.200"
                    _active={{
                      background: "hsla(0,0%,100%,.3)",
                      boxShadow:
                        "inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)",
                      }}
                      cursor="pointer"
                      >
                    <Tab>
                    <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
                        Profile
                    </Button>
                        </Tab>
                  </Flex>

                  <Flex
                    align="center"
                    w={{ lg: "auto" }}
                    px={{ lg: "10px" }}
                    borderRadius="15px"
                    justifyContent="center"
                    boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
                    py="10px"
                    mx={{ lg: "1rem" }}
                    _active={{
                      background: "hsla(0,0%,100%,.3)",
                      boxShadow:
                        "inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)",
                    }}
                    cursor="pointer"
                  >
                      <Tab>
                    <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
                        <span>Change Password</span>
                    </Button>
                      </Tab>
                  </Flex>
                </TabList>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <TabPanels>
          <TabPanel>
            <Stack
              spacing={4}
              w={"full"}
              // maxW={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                User Profile
              </Heading>
              <Formik>
                <form onSubmit={onHandleSSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl id="userName" isRequired>
                      <FormLabel>User name</FormLabel>
                      <Input
                        placeholder="UserName"
                        defaultValue={profileDetails.name}
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                        onChange={(e) => onChange(e)}
                        name="name"
                        
                      />
                    </FormControl>
                    <FormControl id="email">
                      <FormLabel>Email address</FormLabel>
                      <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: "gray.500" }}
                        type="email"
                        value={profileDetails.email}
                      />
                    </FormControl>
                    <Button type="submit" colorScheme="purple" width="200px">
                      Save
                    </Button>
                  </VStack>
                </form>
              </Formik>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack
              spacing={4}
              w={"full"}
              // maxW={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                Change Password
              </Heading>
              <Formik>
                <form onSubmit={onHandlePassword}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isRequired>
                      <FormLabel htmlFor="previous_password">
                        Old Password
                      </FormLabel>
                      <Input
                        id="previous_password"
                        name="previous_password"
                        type="password"
                        variant="filled"
                        value={previous_password}
                        onChange={(e) => onChangePassword(e)}
                        placeholder="Old password"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="new_password">New Password</FormLabel>
                      <Input
                        id="new_password"
                        name="new_password"
                        type="password"
                        variant="filled"
                        value={new_password}
                        onChange={(e) => onChangePassword(e)}
                        placeholder="New password"

                      />
                      {/* <FormErrorMessage>{errors.password}</FormErrorMessage> */}
                    </FormControl>
                    <FormControl>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        variant="filled"
                        value={confirm_password}
                        onChange={(e) => onChangePassword(e)}
                        placeholder="Confirm password"
                      />

                    </FormControl>

                    <Button type="submit" colorScheme="purple" w='200px'>
                      Save
                    </Button>
                  </VStack>
                </form>
              </Formik>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ToastContainer />
    </Flex>
  );
};

export default AdminInfo;
