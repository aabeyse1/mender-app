// App.js
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProfilePage from './pages/ProfilePage';
import MatchesPage from './pages/MatchesPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MatchzonePage from './pages/MatchzonePage';
import TopNavBar from './components/TopNavBar';
import BotNavBar from './components/BotNavBar';
import { GoogleLogin } from 'react-google-login';
import LoginPane from './components/LoginPane';
import axios from 'axios';
import LoginContext from './LoginContext';

function App() {
  const storedLogin = JSON.parse(sessionStorage.getItem('login')) || {};
  const [login, setLogin] = useState(storedLogin);
  const [firstTimeLogin, setFirstTimeLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    /* global google*/
    if (window.google?.accounts?.id) {
      google.accounts.id.initialize({
        client_id: '619456285699-3q506545p1pund3bujtfn0r7q1ipb5eu.apps.googleusercontent.com',
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById('si'), { theme: 'outline', size: 'large' });
    }

    // Load user data here
    const loadUserData = async () => {
      const registrationCheckResponse = await axios.get('http://127.0.0.1:8000/get/'+login.email+'/');
      if (registrationCheckResponse.data === null) {
        // navigate('/profile');
      } else {
        setUserData(registrationCheckResponse.data[0]);
        setIsUserDataLoaded(true);
      }
    };

    loadUserData();
  }, [login.email]);

  function handleCallbackResponse(response) {
    var userObject = jwtDecode(response.credential);
    setLogin(userObject);
    sessionStorage.setItem('login', JSON.stringify(userObject));
  }

  function handleSignout() {
    setLogin({});
    setUserData();
    setFirstTimeLogin(false);
    sessionStorage.removeItem('login');
  }

  console.log(login.email);
  console.log(isUserDataLoaded)

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
        minHeight: '90vh',
      }}
    >
      {Object.keys(login).length === 0 && <LoginPane></LoginPane>}
      {Object.keys(login).length > 0 && (
        <>
            <TopNavBar name={login.name} logOut={handleSignout} />
          <>
          <h1>{login.email}</h1>
            {login.email &&
            <LoginContext.Provider value={login.email}>
            <Routes>
              <Route path="/" element={<MatchzonePage />} />
              <Route path="/matchZone" element={<MatchzonePage email={login.email}/>} />
              <Route path="/matches" element={<MatchesPage email={login.email}/>} />
              <Route path="/profile" element={<ProfilePage email={login.email}/>} />
            </Routes>
          </LoginContext.Provider>
            }
          </>
          <BotNavBar />
        </>
      )}
    </div>
  );
}

export default App;
