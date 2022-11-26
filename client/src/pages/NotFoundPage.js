import React from 'react';
import {
  Container,
  VStack,
  Image,
  Heading,
  Flex,
  Center,
} from "@chakra-ui/react";
import notFoundPage from '../static/Images/notFoundPage.png'

function NotFoundPage() {
  return (
    <div>
      <VStack height="100vh">
        <Container
          bg="white"
          maxW="100%"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border=".0625rem solid #e4e2e0"
        >
          <Flex flexDir={'column'} w={'100%'} textAlign="center" justifyContent={'center'}>
            <Center>
            <Image src={notFoundPage} alt='Not Found Page' />
            </Center>
            <Center mt={'1rem'}>
              <Heading as={'h3'}>
              Uh oh! Looks like you got lost.<br />
              Go back to the homepage if you dare!
              </Heading>
            </Center>
          </Flex>
        </Container>
      </VStack>
    </div>
  );
}

export default NotFoundPage;