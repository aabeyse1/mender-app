import React from 'react';
import BotNavBar from "../components/BotNavBar";
import TopNavBar from "../components/TopNavBar";
import {Container} from 'react-bootstrap';
import ProfileCard from '../components/ProfileCard';

function MatchesPage(props) {
    return (
        <>
            {/* <TopNavBar /> */}
            <Container className="mt-24 mb-11">
                <ProfileCard email={props.email} />
            </Container>
            {/* <BotNavBar /> */}
        </>
    );
}

export default MatchesPage;