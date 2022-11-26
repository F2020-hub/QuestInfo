import React from "react";
import { Link as ReachLink } from "react-router-dom";
import {
  Box,
  Input,
  Img,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  InputGroup,
  InputRightElement,
  Divider,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon,BellIcon } from "@chakra-ui/icons";
import bnr1 from "../../static/Images/bnr1.png";
import { Div } from "./styled";
import { ItemContent } from "./Notification/ItemContent";
import FeatherIcon from 'feather-icons-react';
import { logOut } from "../../redux/authentication/actionCreator";
import { useDispatch } from "react-redux";
import whitelogo from '../../static/Images/whitelogo.png'
import draklogo from '../../static/Images/draklogo.png'
import quest from '../../static/Images/quest.png'
import {useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const TopNavbar = () => {
const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();


  const SignOut = e => {
    e.preventDefault();
    dispatch(logOut()).then(()=>{
       toast('User successfully logged out', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(()=>{
        navigate('/')
      },[1500])
    })
  };
  return (
    <>
      <Box
        bg={useColorModeValue("#f3f2f1", "gray.900")}
        px={4}
        w="100%"
        position={"relative"}
        h={16}
      >
        <Flex h={16} position={"relative"} flexDir={"row"} w={"100%"} >
          <Div>
            {colorMode === "light" ?  
            <Img src={quest} alt="logo"  h={'100%'} m={'auto'}/> :
            <Img src={whitelogo} alt="logo" h={'100%'} m={'auto'}/>
            }
           
          <Divider orientation='horizontal' />
          </Div>
          <Flex flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} w={'calc(100% - 14.5rem)'}>
            <Flex>
                <InputGroup>
                <Input type={'search'} bg={""}/>
                <InputRightElement>
                    <Button>
                        <FeatherIcon icon="search"/>
                    </Button>
                </InputRightElement>
                </InputGroup>
            </Flex>
          </Flex>
          <Flex >
            <Stack direction={"row"} spacing={7} width="100%" alignItems={'center'}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
        <MenuButton>
          <BellIcon color='gray.600' w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                aSrc={''}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={''}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={''}
              />
            </MenuItem>
          </Flex>
          </MenuList>
          </Menu>
          
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={quest} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} src={quest} />
                  </Center>
                  <br />
                  <Center>
                    <p>Admin</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <Link as={ReachLink} to="/project/projects-list">
                    <MenuItem>Your Project</MenuItem>
                  </Link>

                  <Link as={ReachLink} to="/setting/profile">
                    <MenuItem>Account Settings</MenuItem>
                  </Link>
                  <Link onClick={SignOut} to="/">
                    <MenuItem>Logout</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
       
            </Stack>
          </Flex>
          <Flex>
          </Flex>
      <ToastContainer />
          
        </Flex>
      </Box>
    </>
  );
};

export default TopNavbar;
