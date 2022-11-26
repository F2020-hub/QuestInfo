import React, { useState, useEffect } from "react";
import {
  Flex,
  WrapItem,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import LeadsTable from "../../component/LeadsTable/LeadsTable";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css
import {
  deleteLeadsAdmin,
  getLeadsForAdmin,
} from "../../redux/Leads/actionCreator";
import HeadTitle from "../../component/HeadTitle/HeadTitle";
import { BodyMain } from "../../component/HeadTitle/BodyMain";
import { useParams } from "react-router";


function AllLeads() {

  
  const dispatch = useDispatch();
  const quary = useParams();

  const [listingLeadsList, setListingLeadsList] = useState([]); // use in listing project list
  const [pageLeads, setPageLeads] = useState(1); // use in listing project list

  console.log(pageLeads, "page number");




  const changeCurrentPage = numPage => {
    setPageLeads({ currentPage: numPage });
  };
  
  const ProjectsForAdmin = () => {
    dispatch(getLeadsForAdmin(pageLeads))
      .then((res) => {
        if (res.success) {
          //set data in state to use  in listing
          setListingLeadsList(res.data.lead);
          console.log(res.data.lead._id, "LEADS LIST FRON END");
          // setID(res.data.lead[1]._id);
          setPageLeads(res.data.next.page);
          // setCurrentPage(res.data.next.pag);
        } else {
          console.log("err Leads", res);
        }
      })
      .catch((err) => console.log("errr leads", err));
  };
  useEffect(() => {
    ProjectsForAdmin();
  }, []);



  const pagesQuantity = 12;

  return (
    <Flex
      flexDirection="column"
      h={"100vh"}
      px="30px"
      bg={useColorModeValue("#f3f2f1", "gray.900")}
    >
      <HeadTitle title="Leads List" />
      <BodyMain>
        <WrapItem w={"100%"}>
          <Box
            bg={useColorModeValue("#fff", "gray.800")}
            borderRadius="lg"
            w={"100%"}
          >
            <LeadsTable
              padding={20}
              title={"Leads Table"}
              captions={[
                "Name",
                "Email",
                "Phone",
                "Status",
                "Graduation Status",
                "Date",
                "Action",
              ]}
              data={listingLeadsList}
            />
              <Pagination
          currentPage={pageLeads}
          totalPages={10}
          onChange={changeCurrentPage}
          theme="bottom-border"
        />

            {/* <Button type='submit' onClick={onDeleteLead} me={10}>delete</Button> */}
            {/* <Button type="submit" onClick={chagnePreviousPage}>
              Previous
            </Button> */}
          </Box>
        </WrapItem>
      </BodyMain>
    </Flex>
  );
}

export default AllLeads;
