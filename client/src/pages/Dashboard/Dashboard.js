import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  WrapItem,
  useColorModeValue,
  GridItem,
  Grid,
  HStack,
  Select,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import Footer from "../../component/MenuLayout/Footer";
import AspiringBankersLeads from "../../component/dashboard/AspiringBankersLeads";
import { Line } from "react-chartjs-2";
import MiniStatistics from "../../component/MiniStatistics";
import HeadTitle from "../../component/HeadTitle/HeadTitle";
import { BodyMain } from "../../component/HeadTitle/BodyMain";
import { GetProjectFormDashboard } from "../../redux/Dashboard/actionCreator";
import { useDispatch } from "react-redux";
import { getProjectsForAdmin } from "../../redux/Project/actionCreator";
import { getPlatfromForAdmin } from "../../redux/Project/projectPlatforms/actionCreator";

function Dashboard() {
  const dispatch = useDispatch();

  const [countPlatformData, setCountPlatFormData] = useState([]);
  // const [countProjectData, setCountProjectFormData] = useState([]);

  // console.log(countPlatformData, "countPlatformData test12312312");
  // console.log(countProjectData, "countProjectData sfasdfasdf54784");
  // selection part


  const [ProjectData, setProjectData] = useState(""); // use in listing project list

  console.log(ProjectData, " ID Pa");

  const [PlatformtData, setPlatformData] = useState(""); // use in listing project list

  console.log(PlatformtData, " ID Pl");




  const ProjectsForAdmin = () => {
    dispatch(getProjectsForAdmin())
      .then((res) => {
        if (res.success) {
          setListingProjectList(res.data.projectListActive);
          // if (res.data.projectListActive.length > 0) {
          //   setProjectData(res.data.projectListActive[0]._id);
          // }
        } else {
          console.log("err project", res);
        }
      })
      .catch((err) => console.log("errr", err));

    dispatch(getPlatfromForAdmin())
      .then((res) => {
        if (res.success) {
          setPlatformList(res.data);
          // if (res.data.length > 0) {
          //   setPlatformData(res.data[0]._id);
          // }
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

  useEffect(() => {
    if (ProjectData != "" && PlatformtData != "") {
      console.log(ProjectData, "ProjectData");
      console.log(PlatformtData, "PlatformtData");
      dispatch(GetProjectFormDashboard(ProjectData,PlatformtData)).then((res) => {
        ProjectsForAdmin();
        console.log(res, "Front end Dashboard");
        setCountPlatFormData(res.data.totalLeadsPerProjectByPlatform)
        // if (PlatformtData === res.data.platform_id) {
        //   setCountPlatFormData(res.data.totalLeadsPerPlatform);
        // }
        // if (PlatformtData === res.data.platform_id) {
        //   setCountProjectFormData(res.data.totalLeadsPerPlatform);
        // }
      });
    }
  }, [ProjectData, PlatformtData]);

  // end selection part

  return (
    <Flex
      flexDirection="column"
      // pt={{ base: "120px", md: "75px" }}
      px="30px"
      h={"100vh"}
      bg={useColorModeValue("#f3f2f1", "gray.900")}
    >
      <HeadTitle title="Dashboard" />

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
                          <option key={_id} name="platform_id" value={_id}>
                            {platform_name}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>
              </HStack>
              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
               
              
              </Grid>
              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                <GridItem w={"100%"} colSpan={2}>
                  <AspiringBankersLeads />
                  {/* <Line data={data} /> */}
                </GridItem>
                <GridItem w="100%" colSpan={2}>
                  <MiniStatistics
                    title={"Google Leads"}
                    amount={countPlatformData}
                    percentage={55}
                    // icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
                  />
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </WrapItem>
      </BodyMain>
    </Flex>
  );
}

export default Dashboard;
