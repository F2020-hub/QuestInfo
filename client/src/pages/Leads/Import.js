import React, { useState, useEffect } from "react";
import {
  Select,
  HStack,
  FormControl,
  FormLabel,
  WrapItem,
  Box,
  useColorModeValue,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import HeadTitle from "../../component/HeadTitle/HeadTitle";
import { Formik } from "formik";
import { BodyMain } from "../../component/HeadTitle/BodyMain";
import { getProjectsForAdmin } from "../../redux/Project/actionCreator";
import { getPlatfromForAdmin } from "../../redux/Project/projectPlatforms/actionCreator";
import { ImportLeads } from "../../redux/Leads/actionCreator";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useNavigate } from "react-router";

function Import() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let formData = new FormData();

  // const [filecsv,setFileCsv] = useState(null)
  // CSV Reader
  const onLoadFile = (e) => {
    console.log("file data", e.target.files[0]);
    // setFileCsv(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      formData.append("file", e.target.files[0]);
    }
  };

  const [ProjectData, setProjectData] = useState(""); // use in listing project list
  console.log(ProjectData, "-Project id");
  const [PlatfromtData, setPlatfromData] = useState(""); // use in listing project list
  console.log(PlatfromtData, "-Platform id");

  const ProjectsForAdmin = () => {
    dispatch(getProjectsForAdmin())
      .then((res) => {
        if (res.success) {
          setListingProjectList(res.data.projectList);
          if (res.data.projectList.length > 0) {
            setProjectData(res.data.projectList[0]._id);
          }
        } else {
          console.log("err project", res);
        }
      })
      .catch((err) => console.log("errr", err));

    dispatch(getPlatfromForAdmin())
      .then((res) => {
        if (res.success) {
          setPlatformList(res.data);
          if (res.data.length > 0) {
            setPlatfromData(res.data[0]._id);
          }
        } else {
          console.log("err platfrom", res);
        }
      })
      .catch((err) => console.log("errr", err));
  };

  const [listingProjectList, setListingProjectList] = useState([]); // use in listing project list
  const [PlatformList, setPlatformList] = useState([]); // use in listing project list

  useEffect(() => {
    ProjectsForAdmin();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "this is formData API");

    dispatch(ImportLeads(formData, ProjectData, PlatfromtData))
      .then((res) => {
        if (res && res.success) {
          toast(res.msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/leads/all-leads");
          }, [1000]);
        } else {
          console.log(res, "error scv");
          toast(res.msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err, " this is the error of files");
      });
  };

  return (
    <Flex
      flexDirection="column"
      h={"100vh"}
      px="30px"
      bg={useColorModeValue("#f3f2f1", "gray.900")}
    >
      <HeadTitle title="Import New Lead" />
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
                <form
                  onSubmit={handleSubmit}
                  w={"100%"}
                  encType="multipart/form-data"
                >
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
                        Platfrom
                      </FormLabel>
                      <Select
                        onChange={(e) => setPlatfromData(e.target.value)}
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
                  <FormControl p={4}>
                    <Input type="file" onChange={onLoadFile} name="file" />
                  </FormControl>
                  <FormControl id="name" float="right" mt={"2rem"}>
                    <Button
                      variant="solid"
                      bg={"#1e91ff"}
                      color={"#fff"}
                      _hover={{ color: "#fff", bg: "#206fbb" }}
                      type="submit"
                    >
                      Import
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

export default Import;
