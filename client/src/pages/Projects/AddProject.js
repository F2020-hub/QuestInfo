import React, { useState, useRef } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  WrapItem,
  Box,
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
  DrawerHeader,
  DrawerBody,
  Drawer,
  DrawerFooter,
  Select,
  Stack,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Field } from "formik";
import HeadTitle from "../../component/HeadTitle/HeadTitle";
import { BodyMain } from "../../component/HeadTitle/BodyMain";
import { AddNewProject } from "../../redux/Project/actionCreator";
import { PlatformsAdded } from "../../redux/Project/projectPlatforms/actionCreator";
import { useDispatch } from "react-redux";
import { AddIcon } from "@chakra-ui/icons";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

function AddProject() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const navigate = useNavigate();

  // cons [typeFileds,setTypeFileds] = useState([])

  const dispatch = useDispatch();
  const [addProject, setAddProject] = useState({
    project_name: "",
    company_name: "",
    contact_no: "",
    email: "",
    address: "",
  });

  const [platforms, setPlatforms] = useState({
    platform_name: "",
  });

  const { project_name, company_name, contact_no, email, address } = addProject;
  const { platform_name } = platforms;

  const onChange = (e) => {
    setAddProject({ ...addProject, [e.target.name]: e.target.value });
    setPlatforms({ ...platforms, [e.target.name]: e.target.value });
  };

  const onHandlerSubmit = (e) => {
    e.preventDefault();
    dispatch(AddNewProject(addProject))
      .then((res) => {
        console.log("response", res);
        if (res.success) {
          console.log("successdata", res);
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
            navigate(`/project/projects-list`);
          });
        } else {
          console.log("err", res.errors[0].msg);
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
      })
      .catch((err) => console.log("err", err));
  };

  const onSubmitPlatfrom = (e) => {
    e.preventDefault();
    dispatch(PlatformsAdded(platforms)).then((res) => {
      if (res.success) {
        console.log("successdata", res);
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
          onClose();
        });
      } else {
        console.log("ERROR", res.errors[0].msg);
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
      flexDirection="column"
      // pt={{ base: "120px", md: "75px" }}
      px="30px"
      h={"100vh"}
      bg={useColorModeValue("#f3f2f1", "gray.900")}
    >
      <HeadTitle title="Add New Project" />
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Create a new Platfrom
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add Platfrom</DrawerHeader>
          <Formik>
            <form onSubmit={onSubmitPlatfrom} style={{ width: "100%" }}>
              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormControl id="name" w={"100%"}>
                      <FormLabel color={useColorModeValue("#000", "#fff")}>
                        Platforms
                      </FormLabel>
                      <Field
                        as={Input}
                        id="platform_name"
                        name="platform_name"
                        type="text"
                        variant="filled"
                        value={platform_name}
                        onChange={(e) => onChange(e)}
                        color={useColorModeValue("#000", "#fff")}
                        placeholder="Platforms name"
                      />
                    </FormControl>
                  </Box>
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                  color={"black"}
                  _hover={{ color: "#fff", bg: "#d79e4a" }}
                >
                  Cancel
                </Button>

                <Button
                  colorScheme="blue"
                  type="submit"
                  bg={"#1e91ff"}
                  color={"#fff"}
                  _hover={{ color: "#fff", bg: "#206fbb" }}
                >
                  Submit
                </Button>
              </DrawerFooter>
            </form>
          </Formik>
        </DrawerContent>
      </Drawer>
      <BodyMain>
        <WrapItem w={"100%"}>
          <Box
            bg={useColorModeValue("#fff", "gray.800")}
            borderRadius="lg"
            w={"100%"}
          >
            <Box
              m={8}
              color="#0B0E3F"
              display={"flex"}
              flexDir={"column"}
              rowGap={5}
            >
              <Flex w={"100%"}>
                <Formik>
                  <form onSubmit={onHandlerSubmit} style={{ width: "100%" }}>
                    <Flex w={"100%"} columnGap={"1rem"} mb={"1rem"}>
                      <FormControl id="name" w={"100%"}>
                        <FormLabel color={useColorModeValue("#000", "#fff")}>
                          Project Name
                        </FormLabel>
                        <Field
                          as={Input}
                          id="project_name"
                          name="project_name"
                          type="text"
                          variant="filled"
                          value={project_name}
                          onChange={(e) => onChange(e)}
                          color={useColorModeValue("#000", "#fff")}
                          placeholder="Project name"
                        />
                      </FormControl>
                      <FormControl id="name" w={"100%"}>
                        <FormLabel color={useColorModeValue("#000", "#fff")}>
                          Company Name
                        </FormLabel>
                        <Field
                          as={Input}
                          id="company_name"
                          name="company_name"
                          type="text"
                          variant="filled"
                          value={company_name}
                          onChange={(e) => onChange(e)}
                          color={useColorModeValue("#000", "#fff")}
                          placeholder="Company name"
                        />
                      </FormControl>
                    </Flex>
                    <Flex w={"100%"} columnGap={"1rem"} mb={"1rem"}>
                      <FormControl id="name" w={"100%"}>
                        <FormLabel color={useColorModeValue("#000", "#fff")}>
                          Contact No
                        </FormLabel>
                        <Field
                          as={Input}
                          id="contact_no"
                          name="contact_no"
                          type="tel"
                          variant="filled"
                          value={contact_no}
                          onChange={(e) => onChange(e)}
                          color={useColorModeValue("#000", "#fff")}
                          placeholder="Contact No"
                        />
                      </FormControl>
                      <FormControl id="name" w={"100%"}>
                        <FormLabel color={useColorModeValue("#000", "#fff")}>
                          Email (Official)
                        </FormLabel>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          variant="filled"
                          value={email}
                          onChange={(e) => onChange(e)}
                          color={useColorModeValue("#000", "#fff")}
                          placeholder="Email"
                        />
                      </FormControl>
                    </Flex>
                    <Flex w={"100%"} columnGap={"1rem"} mb={"1rem"}>
                      <FormControl id="name" w={"100%"}>
                        <FormLabel color={useColorModeValue("#000", "#fff")}>
                          Address (Phyical)
                        </FormLabel>

                        <Field
                          as={Input}
                          id="address"
                          name="address"
                          type="text"
                          variant="filled"
                          value={address}
                          onChange={(e) => onChange(e)}
                          color={useColorModeValue("#000", "#fff")}
                          placeholder="Address"
                        />
                      </FormControl>
                      {/* <FormControl id="name" w={"100%"}>
                        <FormLabel>Platforms</FormLabel>
                        <Field
                          as={Input}
                          id="platform_name"
                          name="platform_name"
                          type="text"
                          variant="filled"
                          value={platform_name}
                          onChange={(e) => onChange(e)}
                        />
                      </FormControl> */}
                    </Flex>
                    <FormControl id="name" float="right" mt={"2rem"}>
                      <Button
                        variant="solid"
                        bg={"#1e91ff"}
                        color={"#fff"}
                        _hover={{ color: "#fff", bg: "#206fbb" }}
                        type="submit"
                      >
                        Save
                      </Button>
                    </FormControl>
                  </form>
                </Formik>
              </Flex>
            </Box>
          </Box>
        </WrapItem>
      </BodyMain>
      <ToastContainer />
    </Flex>
  );
}

export default AddProject;
