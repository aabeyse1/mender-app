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
        const matchDetailsPromises = response.data[0].matches.map(matchId =>
          axios.get(`http://127.0.0.1:8000/get/${matchId}/`)
        );

        // Wait for all match details requests to complete
        const matchDetailsResponses = await Promise.all(matchDetailsPromises);
        console.log(matchDetailsResponses);

        // Extract match details from responses
        const matchesDetails = matchDetailsResponses.map(response => response.data[0]);
        console.log(matchesDetails);

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

// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Container, Row, Col} from 'react-bootstrap'
// import ContactCard from "./ContactCard";
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// function ContactCards(props) {
//     const [userData, setUserData] = useState({
//         name: '',
//         area: '',
//         college: '',
//         hometown: '',
//         industry: '',
//       });
    
//       useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await axios.get('http://127.0.0.1:8000/get/' + "dschneider@example.org" + '/');
//             setUserData(response.data[0]);
//           } catch (error) {
//             console.error('Error fetching user data:', error);
//           }
//         };
    
//         // Fetch user data only when it's the first time rendering
//         fetchData();
//       }, [props.email]);
    
//     console.log(userData.matches);

//     const matchesData = userData.matches.map(match =>
//         {

//         }
//         );

//     const contactCards = userData.matches.map(contact => 
//         <Col key={contact.id} xs={12} md={12} lg={4} className ="px-2 pb-2">
//             <ContactCard name={contact.name}/>
//         </Col>
//     );
//     return (
//         <Container>
//             <Row>
//                 {contactCards}
//             </Row>
//         </Container>
//     );
// }

// ContactCards.defaultProps = {
//     contacts: [
//         {
//             name:  "Anonymous",
//             location: "Anonymous",
//             college: "Anonymous",
//             hometown: "Anonymous",
//             interests: "Unknown",
//             time: "Unknown",
//             id: 0,
//         },
//         {
//             name:  "Anonymous",
//             location: "Anonymous",
//             college: "Anonymous",
//             hometown: "Anonymous",
//             interests: "Unknown",
//             time: "Unknown",
//             id: 0,
//         },{
//             name:  "Anonymous",
//             location: "Anonymous",
//             college: "Anonymous",
//             hometown: "Anonymous",
//             interests: "Unknown",
//             time: "Unknown",
//             id: 0,
//         },{
//             name:  "Anonymous",
//             location: "Anonymous",
//             college: "Anonymous",
//             hometown: "Anonymous",
//             interests: "Unknown",
//             time: "Unknown",
//             id: 0,
//         },{
//             name:  "Anonymous",
//             location: "Anonymous",
//             college: "Anonymous",
//             hometown: "Anonymous",
//             interests: "Unknown",
//             time: "Unknown",
//             id: 0,
//         },{
//             name:  "Anonymous",
//             location: "Anonymous",
//             college: "Anonymous",
//             hometown: "Anonymous",
//             interests: "Unknown",
//             time: "Unknown",
//             id: 0,
//         },{
//             name:  "Anonymous",
//             location: "Anonymous",
//             college: "Anonymous",
//             hometown: "Anonymous",
//             interests: "Unknown",
//             time: "Unknown",
//             id: 0,
//         },{
//             name:  "Anonymous",
//             location: "Anonymous",
//             college: "Anonymous",
//             hometown: "Anonymous",
//             interests: "Unknown",
//             time: "Unknown",
//             id: 0,
//         },
//     ]
// }

// export default ContactCards;