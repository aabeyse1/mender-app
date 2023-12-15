import React from 'react';
import ContactCards from "../components/ContactCards";
import BotNavBar from "../components/BotNavBar";
import TopNavBar from "../components/TopNavBar";
import {Container} from 'react-bootstrap';

function MatchesPage(props) {
    return (
        <>
            {/* <TopNavBar /> */}
            <Container className="mt-20 mb-11">
                <ContactCards />
            </Container>
            {/* <BotNavBar /> */}
        </>
    );
}

export default MatchesPage;