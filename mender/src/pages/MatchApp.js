// MatchPage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MatchApp.css'; // Make sure to create a CSS file for your styles

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
      <ul>
        <li><a href="default.asp">Home</a></li>
        <li><a href="news.asp">Matches</a></li>
        <li><a href="contact.asp">Profiles</a></li>
      </ul>

      <div className="buttons">
        <button id="rejectButton" className="btn btn-danger btn-lg" onClick={handleReject}>
          Reject
        </button>
        <button id="acceptButton" className="btn btn-success btn-lg" onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default MatchPage;