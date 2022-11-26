import React from 'react';
import {
    Box,
    Text,
    Flex,
    Img,
    useColorMode,
    useColorModeValue,
  } from '@chakra-ui/react';
  import whitelogo from '../../static/Images/whitelogo.png'
  import draklogo from '../../static/Images/draklogo.png'


  
const Footer = ()=> {
  const { colorMode, toggleColorMode } = useColorMode();

    return (
      <Box
        bg={useColorModeValue('trancparence', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
 
        >
            
        <Box py={10}>
          <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8,
            }}>
            {colorMode === "light" ?  
            <Img src={draklogo} alt="logo"  h={'80px'} m={'auto'}/> :
            <Img src={whitelogo} alt="logo" h={'80px'} m={'auto'}/>
            }
          </Flex>
          <Text pt={3} fontSize={'sm'} textAlign={'center'}>
            © 2022 Fresco Web Marketing. All rights reserved
          </Text>
        </Box>
      </Box>
    );
  }





export default Footer;