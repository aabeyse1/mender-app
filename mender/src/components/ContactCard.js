import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function ContactCard(props) {
    return (
        <Card style= {{width: '20rem'}} className="text-center" key={props.id}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle>{props.locatiion}</Card.Subtitle>
                <ListGroup variant="flush">
                    <ListGroup.Item>College: {props.college}</ListGroup.Item>
                    <ListGroup.Item>Hometown: {props.hometown}</ListGroup.Item>
                    <ListGroup.Item>Interests: {props.interests}</ListGroup.Item>
                    <ListGroup.Item>
                        <Button className = 'mx-2'>
                            LinkedIn
                        </Button>
                        <Button className = 'mx-2'>
                            Emails
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
            <Card.Footer>
                {props.time} days ago
            </Card.Footer>
        </Card>
    );
}


ContactCard.defaultProps = {
    name:  "Anonymous",
    location: "Anonymous",
    college: "Anonymous",
    hometown: "Anonymous",
    interests: "Unknown",
    time: "Unknown",
    id: 0,
};

export default ContactCard;


