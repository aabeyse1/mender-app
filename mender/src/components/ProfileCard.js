import React from 'react';
import {Button, Form} from 'react-bootstrap';
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import interests from './interests.js';
import InterestsSelect from './InterestsSelect.js';

console.log(interests);

function ProfileCard(props) {
    return (
        <Form className='px-0'>
            <Form.Group controlId = "profileGroupEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder={props.name}></Form.Control>
                <Form.Text muted>This is not your username - make sure to use your full profile name</Form.Text>
            </Form.Group>
            <Form.Group controlId = "profileGroupLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder={props.location}></Form.Control>
                <Form.Text muted>Where you currently are</Form.Text>
            </Form.Group>
            <Form.Group controlId = "profileGroupCollege">
                <Form.Label>College</Form.Label>
                <Form.Control type="text" placeholder={props.college}></Form.Control>
                <Form.Text muted>Where you go/went for college</Form.Text>
            </Form.Group>
            <Form.Group controlId='profileGroupHometown'>
                <Form.Label>Hometown</Form.Label>
                <Form.Control type="text" placeholder={props.hometown}></Form.Control>
                <Form.Text muted>Where you are from</Form.Text>
            </Form.Group>
            <Form.Group controlId='profileGroupInterests'>
                <Form.Label>Interests</Form.Label>
                <InterestsSelect />
                <Form.Text muted>Current interests</Form.Text>
            </Form.Group>
            <div className='d-flex flex-row justify-content-center'>
                <Button variant ="primary" type ="submit">
                    Save Changes
                </Button>
            </div>
        </Form>
    );
    
}

ProfileCard.defaultProps = {
        name:  "Anonymous",
        location: "Anonymous",
        college: "Anonymous",
        hometown: "Anonymous",
        interests: "Unknown",
        time: "Unknown",
        id: 0,
        role: "Mentor/Mentee"
}

export default ProfileCard;