import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import InterestsSelect from './InterestsSelect.js';
import axios from 'axios';

function ProfileCard(props) {
  const [userData, setUserData] = useState({
    name: '',
    area: '',
    college: '',
    hometown: '',
    industry: '',
    interests: [],
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have an API endpoint for updating user data
      const response = await axios.get('http://127.0.0.1:8000/updateUser/' + props.email);
      console.log('User data updated successfully:', response.data);
      // Handle success, e.g., display a success message or redirect
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle error, e.g., display an error message
    }
  };

  const handleInterestsChange = (selectedInterests) => {
    setUserData((prevData) => ({
      ...prevData,
      interests: selectedInterests,
    }));
  };

  return (
    <Form className='px-0' onSubmit={handleSubmit}>
          <Form.Group controlId="profileRole" hidden={userData.name != ''}>
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
              <Form.Control
                  type="text"
                  name="name"
                  value={userData.name || ''}
                  onChange={handleInputChange} />
              <Form.Text muted>This is not your username - make sure to use your full profile name</Form.Text>
          </Form.Group>
          <Form.Group controlId="profileGroupLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                  type="text"
                  name="area"
                  value={userData.area || ''}
                  onChange={handleInputChange} />
              <Form.Text muted>Where you currently are</Form.Text>
          </Form.Group>
          <Form.Group controlId="profileGroupCollege">
              <Form.Label>College</Form.Label>
              <Form.Control type="text" name="college" placeholder={userData.college || ''} onChange={handleInputChange}></Form.Control>
              <Form.Text muted>Where you go/went for college</Form.Text>
          </Form.Group>
          <Form.Group controlId='profileGroupHometown'>
              <Form.Label>Hometown</Form.Label>
              <Form.Control type="text" name="hometown" placeholder={userData.hometown || ''} onChange={handleInputChange}></Form.Control>
              <Form.Text muted>Where you are from</Form.Text>
          </Form.Group>
          <Form.Group controlId='profileGroupIndustry'>
              <Form.Label>Industry</Form.Label>
              <Form.Control type="text" name="industry" placeholder={userData.industry || ''} onChange={handleInputChange}></Form.Control>
              <Form.Text muted>Which industry you are working in</Form.Text>
          </Form.Group>
          <Form.Group controlId='profileGroupInterests'>
                <Form.Label>Interests</Form.Label>
                <InterestsSelect onChange={handleInputChange} selectedInterests={userData.interests || ''}/>
                <Form.Text muted>Current interests</Form.Text>
        </Form.Group><Form.Group controlId='profileGroupCompany'>
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" name="company" placeholder={userData.company || ''} onChange={handleInputChange}></Form.Control>
              <Form.Text muted>Current company</Form.Text>
          </Form.Group><Form.Group controlId='profileGroupLinkedIn'>
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control type="text" name="linkedin" placeholder={userData.linkedin || ''} onChange={handleInputChange}></Form.Control>
              <Form.Text muted>Current linkedin</Form.Text>
          </Form.Group><div className='d-flex flex-row justify-content-center'>
              <Button variant="primary" type="submit">
                  Save Changes
              </Button>
          </div>
    </Form>
  );
}

export default ProfileCard;
