// Chakra imports
import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import TablesTableRow from "./TablesTableRow";
import React from "react";

const LeadsTable = ({ captions, data }) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card overflowX={{ sm: "scroll" }} p={6} borderRadius='lg'>
  
      <CardBody>
        <Table variant='simple' color={textColor}>
          <Thead>
            <Tr my='.8rem' pl='0px' color='gray.400'>
              {captions.map((caption, idx) => {
                return (
                  <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              return (
                <TablesTableRow
                  key={`${row._id}`}
                  id={`${row._id}`}
                  project_name={row.project_name}
                  email={row.email}
                  contact_no={row.contact_no}
                  domain={row.domain}
                  project_status={row.project_status}
                  created_at={row.created_at}
                  address={row.address}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default LeadsTable;
