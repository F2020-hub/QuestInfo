import React from 'react';
import { Outlet } from 'react-router';
import Sidbar from '../component/MenuLayout/Sidbar';
import Footer from '../component/MenuLayout/Footer';

function MainMenuLyout() {
    return (
        <>
            <Sidbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainMenuLyout;