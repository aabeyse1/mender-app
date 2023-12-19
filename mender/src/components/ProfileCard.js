import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import InterestsSelect from './InterestsSelect.js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ProfileCard(props) {
  const [userData, setUserData] = useState({
    name: '',
    area: '',
    college: '',
    hometown: '',
    industry: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get/' + props.email + '/');
        setUserData(response.data[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch user data only when it's the first time rendering
    fetchData();
  }, [props.email]);

  return (
    <Form className='px-0'>
      <Form.Group hidden={userData.name !== ''} controlId="profileRole">
        <Form.Label>Your Role</Form.Label>
        <Form.Select>
          <option value='mentor'>Mentor</option>
          <option value='mentee'>Mentee</option>
        </Form.Select>
        <Form.Text muted>
          Choose your role. Mentors are described as anyone with expertise/moderate experience in their field willing to share their experience. Mentees are the people who are relatively new or looking for a career change
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="profileGroupEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" defaultValue={userData.name || ''}></Form.Control>
        <Form.Text muted>This is not your username - make sure to use your full profile name</Form.Text>
      </Form.Group>
      <Form.Group controlId="profileGroupLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" placeholder={userData.area || ''}></Form.Control>
        <Form.Text muted>Where you currently are</Form.Text>
      </Form.Group>
      <Form.Group controlId="profileGroupCollege">
        <Form.Label>College</Form.Label>
        <Form.Control type="text" placeholder={userData.college || ''}></Form.Control>
        <Form.Text muted>Where you go/went for college</Form.Text>
      </Form.Group>
      <Form.Group controlId='profileGroupHometown'>
        <Form.Label>Hometown</Form.Label>
        <Form.Control type="text" placeholder={userData.hometown || ''}></Form.Control>
        <Form.Text muted>Where you are from</Form.Text>
      </Form.Group>
      <Form.Group controlId='profileGroupIndustry'>
        <Form.Label>Industry</Form.Label>
        <Form.Control type="text" placeholder={userData.industry || ''}></Form.Control>
        <Form.Text muted>Which industry you are working in</Form.Text>
      </Form.Group>
      <Form.Group controlId='profileGroupInterests'>
        <Form.Label>Interests</Form.Label>
        <InterestsSelect />
        <Form.Text muted>Current interests</Form.Text>
      </Form.Group>
      <div className='d-flex flex-row justify-content-center'>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </div>
    </Form>
  );
}

export default ProfileCard;
