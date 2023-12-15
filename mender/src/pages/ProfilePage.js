import React from 'react';
import BotNavBar from "../components/BotNavBar";
import TopNavBar from "../components/TopNavBar";
import {Container} from 'react-bootstrap';
import ProfileCard from '../components/ProfileCard';

function MatchesPage(props) {
    return (
        <>
            {/* <TopNavBar /> */}
            <Container className="mt-20 mb-11">
                <ProfileCard />
            </Container>
            {/* <BotNavBar /> */}
        </>
    );
}

export default MatchesPage;