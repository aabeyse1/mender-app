import React from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPane(props) {
  const innerPanelGradient = {
    background: 'linear-gradient(to bottom right, #3498db, #e74c3c)',
    color: '#fff',
    borderRadius: '10px',
  };

  const outerPanelGradient = {
    background: 'linear-gradient(to bottom right, #e0e0e0, #a0a0a0)', // Subtle gray gradient
    color: '#fff',
    borderRadius: '10px',
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 mx-5">
      <div className='border-0 rounded shadow py-5 pt-8 my-5 text-center' style={{ height: "90vh", ...outerPanelGradient }}>
        <h1 style={{ textAlign: 'center', fontSize: '4em', margin: '20px 0', color: '#3498db' }}>Mender</h1>
        <div className='border-0 rounded d-flex align-items-center justify-content-center shadow mx-5 px-5' style={{ minHeight: '70vh', ...innerPanelGradient }}>
          <Row className='justify-content-center'>
            <Col className='text-center'>
              <h2>Ready to kick off your career??</h2>
              <h2>Or do you want to help others with their first steps in their roles?</h2>
              <p>Become a mentor/mentee with Mender, and you can find people who share your interests. Share your expertise with new people to the profession, or seek expertise from experts in the field</p>
            </Col>
            <Col className='text-center'>
              <h2>Join us and find your future mentor</h2>
              <div id="si" className='justify-content-center' style={{ margin: 'auto', width: '19.5vh' }}></div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default LoginPane;
