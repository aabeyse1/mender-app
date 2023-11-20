// MatchPage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MatchApp.css'; // Make sure to create a CSS file for your styles
import placeholderImage from './placeholder.png'

const MatchPage = () => {
  const handleReject = () => {
    // Add logic for reject button click
    console.log('Reject button clicked');
  };

  const handleAccept = () => {
    // Add logic for accept button click
    console.log('Accept button clicked');
  };

  return (
    <div>

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

      <div className="buttons">
        <button id="rejectButton" className="btn btn-danger btn-lg" onClick={handleReject}>
          Reject
        </button>

        <img src="https://assets-global.website-files.com/5e66ca0250be6103da645a88/64370e06159764728a6c6554_Account%20Executive.webp" alt="Profile" />

        <button id="acceptButton" className="btn btn-success btn-lg" onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default MatchPage;