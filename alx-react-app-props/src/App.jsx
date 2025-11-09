import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import WelcomeMessage from './components/WelcomeMessage'
import UserProfile from './components/UserProfile'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import ProfilePage from '../ProfilePage'
import UserContext from '../UserContext'
import React from 'react'
import UserInfo from '../UserInfo'
function App() {
  // Example user data
  const userData = {
    name: 'Derick Asare',
    email: 'derick@example.com',
    role: 'Software Engineer'
  };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}


export default App
