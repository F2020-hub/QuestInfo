import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import {ChakraProvider} from '@chakra-ui/react'
import './index.css';
import App from './App';
import theme from './theme/theme'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/400.css'







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
        <App style={{background:'red'}}/>
    </BrowserRouter>
  </ChakraProvider>
  
);

