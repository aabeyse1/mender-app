import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import ContactCard from './ContactCard';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ContactCards(props) {
  const [userData, setUserData] = useState({
    name: '',
    area: '',
    college: '',
    hometown: '',
    industry: '',
    matches: [],
  });

  const [matchesData, setMatchesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get/' + "dschneider@example.org" + '/');
        setUserData(response.data[0]);

        // Extract match IDs from userData.matches and fetch details for each match
        const matchDetailsPromises = response.data[0].matches ? response.data[0].matches.map(matchId =>
          axios.get(`http://127.0.0.1:8000/get/${matchId}/`)
        ) : [];

        // Wait for all match details requests to complete
        const matchDetailsResponses = await Promise.all(matchDetailsPromises);

        // Extract match details from responses
        const matchesDetails = matchDetailsResponses.map(response => response.data[0]);

        // Update matchesData state
        setMatchesData(matchesDetails);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch user data and matches details only when it's the first time rendering
    fetchData();
  }, [props.email]);

  console.log(matchesData);

  // Render ContactCards using matchesData
  const contactCards = matchesData.map(match => (
    <ContactCard key={match.id} match={match} />
  ));

  return (
    <Container>
      <Row>
        <Col>{contactCards}</Col>
      </Row>
    </Container>
  );
}

export default ContactCards;
