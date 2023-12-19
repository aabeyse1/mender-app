import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
              <Col>
              <Row>
                    <Col>
                        <Navbar.Text>
                        Signed in as: <a href="/profile">{props.name}</a>
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
              </Col>
            </Container>
            <Button onClick={props.logOut} style={{
              padding: '5px 15px', 
              fontSize: '14px', 
              lineHeight: '1.5',
              whiteSpace: 'nowrap',
            }}>Log Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
export default TopNavBar;

