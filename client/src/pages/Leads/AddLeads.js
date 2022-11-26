import React, { useEffect, useState } from "react";
import {
  Input,
  HStack,
  FormControl,
  FormLabel,
  InputGroup,
  WrapItem,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Select,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import HeadTitle from "../../component/HeadTitle/HeadTitle";
import { BodyMain } from "../../component/HeadTitle/BodyMain";
import { getProjectsForAdmin } from "../../redux/Project/actionCreator";
import { getPlatfromForAdmin } from "../../redux/Project/projectPlatforms/actionCreator";
import { useDispatch } from "react-redux";
import { AddNewLead } from "../../redux/Leads/actionCreator";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AddLeads() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ProjectData, setProjectData] = useState(""); // use in data project list
  const [PlatformtData, setPlatformData] = useState(""); // use in data project list

  const [listingProjectList, setListingProjectList] = useState([]); // use in listing project list
  const [PlatformList, setPlatformList] = useState([]); // use in listing project list





console.log(listingProjectList,'listingProjectList testing priject')

  const ProjectsForAdmin = () => {
    dispatch(getProjectsForAdmin())
      .then((res) => {
        if (res.success) {
          //set data in state to use  in listing
          setListingProjectList(res.data.projectListActive);
          if (res.data.projectListActive.length > 0) {
            setProjectData(res.data.projectListActive[0]._id);
          }
          // console.log("success data", res.data.projectList)
        } else {
          console.log("err project", res);
        }
      })
      .catch((err) => console.log("errr", err));

    dispatch(getPlatfromForAdmin())
      .then((res) => {
        if (res.success) {
          //set data in state to use  in listing
          setPlatformList(res.data);
          if (res.data.length > 0) {
            setPlatformData(res.data[0]._id);
          }
          // console.log("success data" ,res.data.platformList )
        } else {
          console.log("err platform", res);
        }
      })
      .catch((err) => console.log("errr", err));
  };

  useEffect(() => {
    ProjectsForAdmin();
  }, []);

  // const [PlatformData, setPlatFormData] = useState([]); // use in listing project list
  // console.log('this is the platform Id (my state ) : ', PlatformData);
  const [graduation, setGraduation] = useState([]);
  console.log(graduation, "graduation value selected");

  const [leadAddManual, setLeadAddManul] = useState({
    name: "",
    email: "",
    phone_no: "",
    graduation_status: "",
    city: "",
  });

  const { name, email, phone_no, city } = leadAddManual;

  const onChange = (e) => {
    setLeadAddManul({ ...leadAddManual, [e.target.name]: e.target.value });
  };

  //project name
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      project_ids: ProjectData,
      platform_ids: PlatformtData,
      name: name,
      email: email,
      phone_no: phone_no,
      city: city,
      graduation_status: graduation,
    };
    console.log(body, "this is body");
    if (ProjectData != "" && PlatformtData != "") {
      dispatch(AddNewLead(body)).then((res) => {
        if (res && res.data.success) {
          toast(res.data.msg, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/leads/all-leads");
          }, [1000]);
        }
      });
    }
  };

  return (
    <Flex
      flexDirection="column"
      // pt={{ base: "120px", md: "75px" }}
      px="30px"
      h={"100vh"}
      bg={useColorModeValue("#f3f2f1", "gray.900")}
    >
      <HeadTitle title="Add New Lead" />

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
              <Formik>
                <form onSubmit={handleSubmit} w={"100%"}>
                  <HStack spacing={5} w={"100%"}>
                    <FormControl p={4}>
                      <FormLabel color={useColorModeValue("#000", "#fff")}>
                        Project Name
                      </FormLabel>
                      <Select
                        onChange={(e) => setProjectData(e.target.value)}
                        color={useColorModeValue("#000", "#fff")}
                      >
                        {listingProjectList &&
                          listingProjectList.map((items) => {
                            return (
                              <option
                                key={items._id}
                                name="project_id"
                                value={items._id}
                              >
                                {items.project_name}
                              </option>
                            );
                          })}
                      </Select>
                    </FormControl>

                    <FormControl p={4}>
                      <FormLabel color={useColorModeValue("#000", "#fff")}>
                        Platform
                      </FormLabel>
                      <Select
                        onChange={(e) => setPlatformData(e.target.value)}
                        color={useColorModeValue("#000", "#fff")}
                      >
                        {PlatformList &&
                          PlatformList.map((element) => {
                            const { _id, platform_name } = element;
                            // console.log(element, "this selection");
                            return (
                              <option key={_id} name="platform_ids" value={_id}>
                                {platform_name}
                              </option>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </HStack>
                  <HStack mt={"3rem"}>
                    <VStack spacing={4} align="flex-start" w={"100%"}>
                      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                        <GridItem w="100%">
                          <FormControl isRequired>
                            <FormLabel
                              htmlFor="name"
                              name="name"
                              color={useColorModeValue("#000", "#fff")}
                            >
                              Name
                            </FormLabel>
                            <Field
                              as={Input}
                              id="name"
                              name="name"
                              type="text"
                              variant="filled"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => onChange(e)}
                              color={useColorModeValue("#000", "#fff")}
                            />
                           
                          </FormControl>
                        </GridItem>
                        <GridItem w="100%">
                          <FormControl>
                            <FormLabel
                              htmlFor="email"
                              name="email"
                              color={useColorModeValue("#000", "#fff")}
                            >
                              Email Address
                            </FormLabel>
                            <Field
                              as={Input}
                              id="email"
                              name="email"
                              type="email"
                              variant="filled"
                              placeholder="Email"
                              onChange={(e) => onChange(e)}
                              value={email}
                              color={useColorModeValue("#000", "#fff")}
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem w="100%">
                          <FormControl>
                            <FormLabel
                              htmlFor="tel"
                              name="tel"
                              color={useColorModeValue("#000", "#fff")}
                            >
                              Phone Number
                            </FormLabel>
                            <Field
                              as={Input}
                              id="tel"
                              name="phone_no"
                              type="tel"
                              variant="filled"
                              placeholder="Phone"
                              onChange={(e) => onChange(e)}
                              value={phone_no}
                              color={useColorModeValue("#000", "#fff")}
                            />
                          </FormControl>
                        </GridItem>

                        <GridItem w="100%">
                          <FormControl id="Status">
                            <FormLabel
                              color={useColorModeValue("#000", "#fff")}
                            >
                              City
                            </FormLabel>
                            <Field
                              as={Input}
                              id="tel"
                              name="city"
                              type="text"
                              variant="filled"
                              placeholder="Phone"
                              value={city}
                              onChange={(e) => onChange(e)}
                              color={useColorModeValue("#000", "#fff")}
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem w="100%">
                          <FormControl id="GraduationStatus">
                            <FormLabel
                              color={useColorModeValue("#000", "#fff")}
                            >
                              Graduation Status
                            </FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <Select
                                placeholder="Select option"
                                color={useColorModeValue("#000", "#fff")}
                                onChange={(e) => setGraduation(e.target.value)}
                              >
                                <option
                                  value={"Graduate"}
                                  name="graduation_status"
                                >
                                  Graduate
                                </option>
                                <option
                                  value={"Post Graduate"}
                                  name="graduation_status"
                                >
                                  Post Graduate
                                </option>
                                <option
                                  value={"Undergraduate"}
                                  name="graduation_status"
                                >
                                  Undergraduate
                                </option>
                              </Select>
                            </InputGroup>
                          </FormControl>
                        </GridItem>
                      </Grid>
                    </VStack>
                  </HStack>
                  <FormControl id="name" float="right" mt={"2rem"}>
                    <Button
                      variant="solid"
                      bg={"#1e91ff"}
                      color={"#fff"}
                      _hover={{ color: "#fff", bg: "#206fbb" }}
                      type={"submit"}
                    >
                      Save
                    </Button>
                  </FormControl>
                </form>
              </Formik>
            </Box>
          </Box>
        </WrapItem>
      </BodyMain>
      <ToastContainer />
    </Flex>
  );
}

export default AddLeads;
