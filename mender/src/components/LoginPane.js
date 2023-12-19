import React from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPane(props) {
  const panelGradient = {
    background: 'linear-gradient(to bottom right, #3498db, #e74c3c)',
    color: '#fff', // Text color for better contrast
    borderRadius: '10px', // Add border-radius for a rounded look
  };

  const menderGradient = {
    backgroundImage: 'linear-gradient(to right, #3498db, #e74c3c)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <div className="d-flex justify-center align-center">
            <div className='border-0 rounded shadow py-3 mx-5' style={{height:"80vh"}}>
      <h1 style={{ textAlign: 'center', fontSize: '3em', margin: '20px 0', color: '#3498db'}}>Mender</h1>
      <div className='border-0 rounded d-flex align-items-center justify-content-center shadow mx-5 px-5 ' style={{ minHeight: '60vh', ...panelGradient }}>
        <Row className='justify-content-center'>
          <Col className='text-center'>
            <h2>Ready to kick off your career??</h2>
            <h2>Or do you want to help others with their first steps in their roles?</h2>
            <p>Become a mentor/mentee with Mender, and you can find people who share your interests. Share your expertise with new people to the profession, or seek expertise from experts in the field</p>
          </Col>
          <Col className='text-center'>
            <h2>Join us and find your future mentor</h2>
            <div id="si" className='justify-content-center' style={{ margin: 'auto', width: '20vh' }}></div>
          </Col>
        </Row>
      </div>
    </div>
    </div>
  );
}

export default LoginPane;
