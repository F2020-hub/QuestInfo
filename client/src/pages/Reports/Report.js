import React, { useState, useEffect, useRef } from "react";
// import {
//   useCSVReader,
//   lightenDarkenColor,
//   formatFileSize,
// } from "react-papaparse";
import {
  Select,
  HStack,
  FormControl,
  FormLabel,
  InputGroup,
  WrapItem,
  Box,
  useColorModeValue,
  Button,
  Flex,
  Input,
  Divider,
} from "@chakra-ui/react";
import HeadTitle from "../../component/HeadTitle/HeadTitle";
import { Formik } from "formik";
import { BodyMain } from "../../component/HeadTitle/BodyMain";
import { getProjectsForAdmin } from "../../redux/Project/actionCreator";
import { getPlatfromForAdmin } from "../../redux/Project/projectPlatforms/actionCreator";
import { useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import { ReportAdmin } from "../../redux/Report/actionCreator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Report() {
  const dispatch = useDispatch();

  // CSV Reader

  // console.log(formData,'this the formateDate');

  const [ProjectData, setProjectData] = useState(""); // use in listing project list
  const [PlatfromtData, setPlatfromData] = useState(""); // use in listing project list

  const ProjectsForAdmin = () => {
    dispatch(getProjectsForAdmin())
      .then((res) => {
        if (res.success) {
          setListingProjectList(res.data.projectListActive);
          setListingProjectList1(res.data.projectListUnactive);
        } else {
          console.log("err project", res);
        }
      })
      .catch((err) => console.log("errr", err));

    dispatch(getPlatfromForAdmin())
      .then((res) => {
        if (res.success) {
          setPlatformList(res.data);
        } else {
          console.log("err platfrom", res);
        }
      })
      .catch((err) => console.log("errr", err));

    dispatch(ReportAdmin());
  };

  const [listingProjectList, setListingProjectList] = useState([]); // use in listing project list
  const [listingProjectList1, setListingProjectList1] = useState([]); // use in listing project list
  const [PlatformList, setPlatformList] = useState([]); // use in listing project list
  const [scvDonwload, setScvDownload] = useState([]);
  console.log(scvDonwload, "scvDonwload");
  console.log(listingProjectList1, "listingProjectList1");


  useEffect(() => {
    ProjectsForAdmin();
  }, []);

  const onHandleSSubmit = (e) => {
    e.preventDefault();
    const body = {
      project_id: ProjectData,
      platform_id: PlatfromtData,
      start_date: "",
      end_date: "",
    };
    console.log(body.project_id, "project_id");
    dispatch(ReportAdmin(body)).then((res) => {
      if (res.success) {
        console.log(res.success && res.data.report.length > 0, "API Inside");
        if (res.success && res.data.report.length > 0) {
          setScvDownload(res.data.report);
          toast(res.msg, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast("There is no Data", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
      // else if(res.success){
      //   toast('There is no Data', {
      //     position: "top-right",
      //     autoClose: 1500,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      // }
      else {
        console.log(res.data.errors[0], "error export");
        toast(res.data.errors[0].msg, {
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

  // after the loop set function process.nextTick()

  return (
    <Flex
      flexDirection="column"
      h={"100vh"}
      px="30px"
      bg={useColorModeValue("#f3f2f1", "gray.900")}
    >
      <HeadTitle title="Reports" />
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
                <form onSubmit={onHandleSSubmit}>
                  <HStack spacing={5} w={"100%"}>
                    <HStack spacing={5} w={"100%"}>
                      <FormControl p={4}>
                        <FormLabel color={useColorModeValue("#000", "#fff")}>
                          Project Name
                        </FormLabel>
                        <Select
                          onChange={(e) => setProjectData(e.target.value)}
                          color={useColorModeValue("#000", "#fff")}
                          placeholder="Select Project"
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
                          <Divider py={5}/>
                          {listingProjectList1 &&
                            listingProjectList1.map((deactiveElement) => {
                              return (
                                <option
                                  key={deactiveElement._id}
                                  name="project_id"
                                  value={deactiveElement._id}
                                >
                                  {deactiveElement.project_name}
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
                          placeholder="Select Platfrom"
                        >
                          {PlatformList &&
                            PlatformList.map((element) => {
                              const { _id, platform_name } = element;
                              // console.log(element, "this selection");
                              return (
                                <option
                                  key={_id}
                                  name="platform_ids"
                                  value={_id}
                                >
                                  {platform_name}
                                </option>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </HStack>
                  </HStack>
                  <FormControl id="name" w={"100%"}>
                    <FormLabel color={useColorModeValue("#000", "#fff")}>
                      Start Date
                    </FormLabel>
                    <InputGroup
                      borderColor="#E0E1E7"
                      color={useColorModeValue("#000", "#fff")}
                    >
                      <Input type="date" name="start_date"/>
                    </InputGroup>
                  </FormControl>
                  <FormControl id="name" w={"100%"}>
                    <FormLabel color={useColorModeValue("#000", "#fff")}>
                      End Date
                    </FormLabel>
                    <InputGroup
                      borderColor="#E0E1E7"
                      color={useColorModeValue("#000", "#fff")}
                    >
                      <Input type="date" name="end_date"/>
                    </InputGroup>
                  </FormControl>
                  <FormControl id="name" float="right" mt={"2rem"}>
                    {scvDonwload && scvDonwload.length > 0 ? (
                      <Button
                        _hover={{ color: "#fff", bg: "#206fbb" }}
                        bg={"#1e91ff"}
                        color={"#fff"}
                      >
                        <CSVLink data={scvDonwload}>Export</CSVLink>
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        me={10}
                        _hover={{ color: "#fff", bg: "#206fbb" }}
                        bg={"#1e91ff"}
                        color={"#fff"}
                      >
                        Get Report
                      </Button>
                    )}
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

export default Report;
