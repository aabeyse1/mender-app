import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const profilePic = 'mender/src/resources/placeholder.png';

function TopNavBar(props) {
    return (
        <Navbar fixed='top' className="bg-body-secondary">
        <Container>
          <Navbar.Brand href="/matchZone">
            Mender
          </Navbar.Brand>
          <Navbar.Toggle></Navbar.Toggle>
          <Navbar.Collapse className='justify-content-end'>
            <Container className='d-flex flex-column align-items-end'>
                <Row>
                    <Col>
                        <Navbar.Text>
                        Signed in as: <a href="/profile">Admin</a>
                        </Navbar.Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Navbar.Text>
                        You are currently a mentor
                    </Navbar.Text>  
                    </Col>
                </Row>
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
export default TopNavBar;

