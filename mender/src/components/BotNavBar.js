import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function BotNavBar() {

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <Nav className='fixed-bottom bg-body-secondary' justify variant="underline">
            <Nav.Item>
                <Nav.Link href="/matchZone" className={isActive('/matchZone')}>
                    Match Zone
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/matches' className={isActive('/matches')}>
                    Previous Matches
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/profile' className={isActive('/profile')}>
                    Profile
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}



export default BotNavBar;