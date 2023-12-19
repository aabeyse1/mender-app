import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function ContactCard(props) {
    console.log(props.match);
    return (
        <Card style={{ width: '20rem' }} className="text-center">
            <Card.Body>
                <Card.Title>{props.match.name}</Card.Title>
                <Card.Subtitle>{props.match.location}</Card.Subtitle>
                <ListGroup variant="flush">
                    <ListGroup.Item>College: {props.match.college}</ListGroup.Item>
                    <ListGroup.Item>Hometown: {props.match.hometown}</ListGroup.Item>
                    <ListGroup.Item>Interests: {props.match.interests}</ListGroup.Item>
                    <ListGroup.Item>
                        <Button className='mx-2'>
                            LinkedIn:{props.match.linkedin}
                        </Button>
                        <Button className='mx-2'>
                            Email: {props.match.email}
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

ContactCard.defaultProps = {
    match: {
        name: "Anonymous",
        location: "Anonymous",
        college: "Anonymous",
        hometown: "Anonymous",
        interests: "Unknown",
        time: "Unknown",
        id: 0,
    }
};

export default ContactCard;
