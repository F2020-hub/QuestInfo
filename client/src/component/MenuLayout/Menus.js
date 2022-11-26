import React from 'react';
import {Flex, MenuButton,Menu,Text,Link } from '@chakra-ui/react'
import {Link as ReachLink} from 'react-router-dom'
import FeatherIcon from 'feather-icons-react';


function Menus({sidebarSize,icons,title,active,menuLink,onClick}) {
  
    return (
        <Flex
         
            flexDir="column"
            w="100%"
            alignItems= {sidebarSize =='small' ? 'center' :'flex-start'}
        >
            <Menu placement="right">
             <Link 
             backgroundColor={active && '#1e91ff'}
             color={active && '#fff'}
             p={3}
             borderRadius={8}
             _hover={{textDecor:"none", backgroundColor:"#1e91ff", color:"white"}}
            //  _active={{bg:'#1e91ff', color:'#fff'}}
             w={sidebarSize == "large" && "100%"}
             as={ReachLink} to={menuLink}
             onClick={onClick}
             display="flex"
             flexDir='row'
             justifyContent="center"
             alignItems='center'
             _active={{
                background: "hsla(0,0%,100%,.3)",
                boxShadow:
                  "inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)",
              }}
             >
             
                    <MenuButton w="100%">
                        <Flex gap={2}>
                           
                            {/* <Icon as={icons} color={active ? "white" : "#1e91ff"}/> */}
                            <FeatherIcon icon={icons} />
                            <Text display={sidebarSize == "small" ? "none" :"flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                    </Link>
                  
            </Menu>

        </Flex>
    );
}

export default Menus;