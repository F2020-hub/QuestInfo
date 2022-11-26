
import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import TablesTableRow from "./TablesTableRow";
import React from "react";

const LeadsTable = ({captions, data }) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card overflowX={{ sm: "scroll" }} p={6} borderRadius='lg'  h={"85vh"}>
      <CardBody>
        <Table variant='simple' color={textColor} >
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
                  name={row.name}
                  email={row.email}
                  phone_no={row.phone_no}
                  domain={row.domain}
                  lead_state={row.lead_state}
                  lead_date={row.lead_date}
                  graduation_status={row.graduation_status}

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
