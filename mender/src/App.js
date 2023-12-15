// App.js
import React from 'react';
import ProfilePage from './pages/ProfilePage';
import MatchesPage from './pages/MatchesPage';
import { Route, Routes } from 'react-router-dom';
import MatchPage from './resources/MatchApp';
import MatchzonePage from './pages/MatchzonePage';
import TopNavBar from './components/TopNavBar';
import BotNavBar from './components/BotNavBar';
import {Container} from 'react-bootstrap'
function App() {
  return (
    <div className="App">
      <TopNavBar />
      <>
      <Routes>
          <Route path="/" element ={<MatchzonePage />} />
          <Route path="/matchZone" element ={<MatchzonePage />} />
          <Route path="/matches" element ={<MatchesPage />} />
          <Route path="/profile" element ={<ProfilePage />} />
        </Routes>
      </>
      <BotNavBar />
    </div>
  );
}

export default App;