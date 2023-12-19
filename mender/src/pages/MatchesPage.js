import React from 'react';
import ContactCards from "../components/ContactCards";
import BotNavBar from "../components/BotNavBar";
import TopNavBar from "../components/TopNavBar";
import {Container} from 'react-bootstrap';

function MatchesPage(props) {
    return (
        <>
            {/* <TopNavBar /> */}
            <Container className="mt-24 mb-11">
                <ContactCards email = {props.email} />
            </Container>
            {/* <BotNavBar /> */}
        </>
    );
}

export default MatchesPage;