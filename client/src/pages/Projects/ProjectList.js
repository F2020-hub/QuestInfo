import React, { useState, useEffect } from "react";
import { Flex, useColorModeValue, WrapItem, Box } from "@chakra-ui/react";
import HeadTitle from "../../component/HeadTitle/HeadTitle";
import { BodyMain } from "../../component/HeadTitle/BodyMain";
import {
  GetProjectAdmin,
  getProjectsById,
} from "../../redux/Project/actionCreator";
// import { getPlatfromForAdmin } from "../../redux/Project/projectPlatforms/actionCreator";
import { useDispatch } from "react-redux";
import LeadsTable from "../../component/ProjectsComponents/LeadsTable";
import { useParams } from "react-router";

const ProjectList = (props) => {
  const dispatch = useDispatch();
  // const query = useParams();
  // console.log(query,'url seeeking id')
  // console.log(props.id,'url seeeking id')

  const [listingProjectList, setListingProjectList] = useState([]); // use in listing project list
  const [listingProjectList1, setListingProjectList1] = useState([]); // use in listing project list
  // const [PlatformList, setPlatformList] = useState([]); // use in listing project list
  console.log(listingProjectList1, "listingProjectList");
  // console.log("this is the project list : ", listingProjectList);
  // console.log("this is the project platfrom list : ", PlatformList);

  const ProjectsForAdmin = () => {
    dispatch(GetProjectAdmin())
      .then((res) => {
        if (res.success) {
          //set data in state to use  in listing
          setListingProjectList(res.data.result.project);
          setListingProjectList1(res.data.result.project[0]._id);
          // console.log("success data" ,res.data.result.project )
        } else {
          console.log("err project", res);
        }
      })
      .catch((err) => console.log("errr", err));
    // dispatch(getProjectsById(listingProjectList1)).then(res=>{
    //   console.log(res,'this is get api frontend')
    // })
  };

  useEffect(() => {
    ProjectsForAdmin();
  }, []);

  return (
    <Flex
      flexDirection="column"
      px="30px"
      h={"100vh"}
      bg={useColorModeValue("#f3f2f1", "gray.900")}
    >
      <HeadTitle title="Project List" />

      <BodyMain>
        <WrapItem w={"100%"}>
          <Box
            bg={useColorModeValue("#fff", "gray.800")}
            borderRadius="lg"
            w={"100%"}
            p={"20px"}
          >
            <LeadsTable
              captions={[
                "Project Name",
                "email",
                "Phone",
                "Address",
                "Date",
                "Action",
              ]}
              data={listingProjectList}
            />
          </Box>
        </WrapItem>
      </BodyMain>
    </Flex>
  );
};

ProjectList.propTypes = {};

export default ProjectList;
