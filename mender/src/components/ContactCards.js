import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'
import ContactCard from "./ContactCard";

function ContactCards(props) {
    const contactCards = props.contacts.map(contact => 
        <Col key={contact.id} xs={12} md={12} lg={4} className ="px-2 pb-2">
            <ContactCard name={contact.name}/>
        </Col>
    );
    return (
        <Container>
            <Row>
                {contactCards}
            </Row>
        </Container>
    );
}

ContactCards.defaultProps = {
    contacts: [
        {
            name:  "Anonymous",
            location: "Anonymous",
            college: "Anonymous",
            hometown: "Anonymous",
            interests: "Unknown",
            time: "Unknown",
            id: 0,
        },
        {
            name:  "Anonymous",
            location: "Anonymous",
            college: "Anonymous",
            hometown: "Anonymous",
            interests: "Unknown",
            time: "Unknown",
            id: 0,
        },{
            name:  "Anonymous",
            location: "Anonymous",
            college: "Anonymous",
            hometown: "Anonymous",
            interests: "Unknown",
            time: "Unknown",
            id: 0,
        },{
            name:  "Anonymous",
            location: "Anonymous",
            college: "Anonymous",
            hometown: "Anonymous",
            interests: "Unknown",
            time: "Unknown",
            id: 0,
        },{
            name:  "Anonymous",
            location: "Anonymous",
            college: "Anonymous",
            hometown: "Anonymous",
            interests: "Unknown",
            time: "Unknown",
            id: 0,
        },{
            name:  "Anonymous",
            location: "Anonymous",
            college: "Anonymous",
            hometown: "Anonymous",
            interests: "Unknown",
            time: "Unknown",
            id: 0,
        },{
            name:  "Anonymous",
            location: "Anonymous",
            college: "Anonymous",
            hometown: "Anonymous",
            interests: "Unknown",
            time: "Unknown",
            id: 0,
        },{
            name:  "Anonymous",
            location: "Anonymous",
            college: "Anonymous",
            hometown: "Anonymous",
            interests: "Unknown",
            time: "Unknown",
            id: 0,
        },
    ]
}

export default ContactCards;