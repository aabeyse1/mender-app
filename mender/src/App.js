// App.js
import React, {useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import ProfilePage from './pages/ProfilePage';
import MatchesPage from './pages/MatchesPage';
import { Route, Routes } from 'react-router-dom';
import MatchzonePage from './pages/MatchzonePage';
import TopNavBar from './components/TopNavBar';
import BotNavBar from './components/BotNavBar';
import { GoogleLogin } from "react-google-login";
import LoginPane from './components/LoginPane';


function App() {
  const storedLogin = JSON.parse(sessionStorage.getItem('login')) || {};
  const [login, setLogin] = useState(storedLogin);
  
  useEffect(() => {
        /* global google*/
    if (window.google?.accounts?.id) {
      google.accounts.id.initialize({
        client_id: "619456285699-3q506545p1pund3bujtfn0r7q1ipb5eu.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
  
      google.accounts.id.renderButton(document.getElementById("si"), { theme: "outline", size: "large" });
    }
  }, [login]);

  function handleCallbackResponse(response) {
    var userObject = jwtDecode(response.credential);
    setLogin(userObject);
    sessionStorage.setItem('login', JSON.stringify(userObject));
    console.log(userObject);
  }

  function handleSignout() {
    setLogin({});
    sessionStorage.removeItem('login');

  };

  return (
    <div>
      {Object.keys(login).length == 0 &&
      <LoginPane></LoginPane>
      } 
      {Object.keys(login).length > 0 &&
      <>
        <TopNavBar name={login.name} logOut ={handleSignout}/>
        <>
        <Routes>
            <Route path="/" element ={<MatchzonePage />} />
            <Route path="/matchZone" element ={<MatchzonePage />} />
            <Route path="/matches" element ={<MatchesPage />} />
            <Route path="/profile" element ={<ProfilePage />} />
          </Routes>
        </>
        <BotNavBar />
      </>}
    </div>
  );
}

export default App;