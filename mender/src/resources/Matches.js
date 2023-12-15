import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeholderImage from './placeholder.png'

const Match = () => {
    return (
        <>
            <div class="topNav">
                <p class="navTitle">Mender</p>
                <div class="navProfile">
                    <img src={placeholderImage} class="profileImg" alt="Profile" />
                    <h1 class="profileText">First Last Name</h1>
                </div>
            </div>

            <ul>
                <li><a href="default.asp">Home</a></li>
                <li><a href="news.asp">Matches</a></li>
                <li><a href="contact.asp">Profiles</a></li>
            </ul>
            
            <div class="contact-card">
            <img src={placeholderImage} class="cardImg" alt="Profile" />
            <div class="contact-details">
                <p class="matchName">Example 1</p>
                <p>Email: 1@example.com</p>
                <p>LinkedIn: example-1</p>
            </div>
            </div>

        </>
    );
}

export default Match;