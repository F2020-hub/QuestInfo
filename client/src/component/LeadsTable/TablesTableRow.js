import React, { useEffect,useRef } from "react";
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
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteLeadsAdmin, getLeadsById } from "../../redux/Leads/actionCreator";


const TablesTableRow = (props) => {


  const {id, name, email, phone_no, lead_state, lead_date, graduation_status } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const colorStatus = useColorModeValue("white", "gray.400");
  const createdProjectDate = lead_date.split("T", 1);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const dispatch = useDispatch();

  // const {deleteButton} = useSelector((state)=>{
  //   return{
  //     deleteButton:state.Leads
  //   }
  // });
  // console.log(deleteButton, ' THIS IS THE DELETEBUTTON');

 

  const onDeleteLead = ()=>{
    var ID = id;
    console.log(ID,'IDDDDDDDDDD');
    dispatch(deleteLeadsAdmin(ID)).then(res=>{
      if(res && res.data){
        
      }
    })
  }

  useEffect(()=>{
    dispatch(deleteLeadsAdmin());
  },[])
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
              {name}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor}
            fontWeight="normal">
            {email}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor}
            fontWeight="normal">
            {phone_no}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={lead_state === 0 ? 'pink.500' : lead_state === 1 ? 'green.400' : lead_state === 2 ? 'gray.600' : 'orange.200'} 
          color={lead_state === 0 && 1 && 2 ? 'white' : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >

          {lead_state === 0 ? 'Raw Lead' : lead_state === 1 ? 'Converted Leads' : lead_state === 2 ? 'Registerd Leads' : '-'}
        </Badge>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor}
            fontWeight="normal">
            {graduation_status}
          </Text>
        </Flex>
      </Td>

      {/* graduation_status */}
      <Td>
        <Flex direction="column">
          <Text fontSize="sm" color={textColor}
            fontWeight="normal">
            {createdProjectDate}
          </Text>
        </Flex>
      </Td>
    
      <Td>
       
        <Button p={'0'} bg="transparent" variant="hover" width="80px" _hover={{ bg: "#1e91ff", color: "#fff",outlineColo:"transparent" }} m="5px" outlineWidth={'thin'}>
          <Link to={`/leads/all-leads/${id}`} >

            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              cursor="pointer"
              _hover={{ color: "#fff" }}
              p={5}
            >
              Edit
            </Text>
          </Link>
        </Button>
        <Button colorScheme='red' onClick={onDeleteLead} m="5px">
        Delete
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
              <Button colorScheme='red'  ml={3} onClick={onDeleteLead}>
                Delete
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
