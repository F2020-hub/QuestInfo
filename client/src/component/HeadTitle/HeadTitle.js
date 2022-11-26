import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import {Div} from './styled'
function HeadTitle({title}) {
    return (
        <Div>
       <Flex>
           <Heading as="h4"  w={'100%'}>{title}</Heading>
       </Flex>
       </Div>
    );
}

export default HeadTitle;