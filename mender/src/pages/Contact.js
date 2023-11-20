import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeholderImage from './placeholder.png'

const Contact = () => {
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

            <div class="header">
                <img src={placeholderImage} class="pageImg" alt="Profile" />
                <h1 class="pageHeader">First Last Name</h1>
            </div>

            <div id="profileForm">
                <form action="updateProfile.asp" method="post">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required />
            
                    <label for="location">Location:</label>
                    <input type="text" id="location" name="location" required />
            
                    <label for="linkedin">LinkedIn:</label>
                    <input type="text" id="linkedin" name="linkedin" />
            
                    <label for="tags">Tags:</label>
                    <input type="text" id="tags" name="tags" required/>
            
                    <input type="submit" value="Save Changes"/>
                </form>
            </div>
        </>
    );
}

export default Contact;