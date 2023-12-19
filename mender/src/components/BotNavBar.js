import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function BotNavBar() {
  const location = useLocation();

  const isActive = (path) => ({
    borderBottom: location.pathname === path ? '2px solid linear-gradient(to bottom right, #3498db, #e74c3c)' : '',
    color: location.pathname === path ? 'transparent' : '#3498db', // Set text color to transparent when active
    backgroundImage: location.pathname === path ? 'linear-gradient(to bottom right, #3498db, #e74c3c)' : 'none', // Set background image when active
    WebkitBackgroundClip: location.pathname === path ? 'text' : 'none', // Clip background to text when active
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });

  return (
    <Nav className='fixed-bottom bg-body-secondary' justify variant="underline">
      <Nav.Item>
        <Nav.Link href="/matchZone" style={isActive('/matchZone')}>
          <span style={{ fontSize: '1.2em' }}>Match Zone</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/matches' style={isActive('/matches')}>
          <span style={{ fontSize: '1.2em' }}>Previous Matches</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/profile' style={isActive('/profile')}>
          <span style={{ fontSize: '1.2em' }}>Profile</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default BotNavBar;
