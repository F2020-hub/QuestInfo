import React, { useEffect,useRef, useState } from "react";
import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { getProjectsById } from "../../redux/Project/actionCreator";
import { useDispatch } from "react-redux";
import { UpdateStatusAdmin } from "../../redux/Project/actionCreator";
function TablesTableRow(props) {

  const dispatch = useDispatch();
  const {
    id,
    project_name,
    email,
    contact_no,
    project_status,
    created_at,
    address,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const colorStatus = useColorModeValue("white", "gray.400");
  const createdProjectDate = created_at.split("T", 1);
  
  // const [statusProject,setStatusProject] = useState("0");
  const [previousStatus,setPreviousStatus] = useState([]);
  console.log(previousStatus,'previousStatus')


const onchangeStatus =() =>{
 
}

const getapiproject=()=>{
  dispatch(getProjectsById(id)).then(res=>{
    console.log(res,'api')
    setPreviousStatus(res.data.project_status);
    
  })
}  

useEffect(()=>{
  getapiproject();
})
const OnChangeSatus = ()=>{
  const body={
    project_status:''
  }
  console.log(body,'body of api')
  dispatch(UpdateStatusAdmin(id,body)).then(res=>{
    getapiproject();
    setPreviousStatus(!previousStatus)
    console.log(setPreviousStatus,'setPreviousStatus')
    console.log(res,'updated frontend')
  })
}

const { isOpen, onOpen, onClose } = useDisclosure()
const cancelRef = useRef()

// console.log("this is the date", createdProjectDate);

  return (
    <Tr>
      <Td pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {project_name}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {email}
          </Text>
        </Flex>
      </Td>
   
      <Td>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {contact_no}
          </Text>
        </Flex>
      </Td>
      
      <Td>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {address}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor} fontWeight="normal">
            {createdProjectDate}
          </Text>
        </Flex>
      </Td>

      <Td>
      <Button onClick={OnChangeSatus} onChange={onchangeStatus} bg="transparent" _hover={{background:'transparent'}} _focus={{outline:"none" ,background:"transparent"}}>
      <Badge
          // bg={status === "Active" ? "green.400" : bgStatus}
          // onClick={}
          bg={
            project_status == previousStatus
              ? "orange.400"
              : "green.400"
          }
          // color={status === "Active" ? "white" : colorStatus}
          // color={project_status === 0 && 1 ? "white" : colorStatus}
          color="white"
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {project_status == previousStatus
            ? "Deactive"
            : "Active"}
    </Badge>
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Action
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
              {project_status == 1
            ? "Deactive"
            : project_status == 0
            ? "Active"
            : "-"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
