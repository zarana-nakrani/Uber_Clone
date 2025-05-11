import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Welcome from './pages/Welcome'
import UserProtextWrapper from './pages/UserProtextWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainWelcome from './pages/CaptainWelcome'
import CaptainLogout from './pages/CaptainLogout'

const App = () => {
  return <>
  <Routes>
    <Route path='/' element={<Home /> } />
    <Route path='/login' element={<UserLogin /> } />
    <Route path='/signup' element={<UserSignup />} />
    <Route path='/captain-login' element={<CaptainLogin /> } />
    <Route path='/captain-signup' element={<CaptainSignup />} />
    <Route path='/welcome' element={
      <UserProtextWrapper>
        <Welcome/>
      </UserProtextWrapper>} />
      <Route path='/logout' element={
      <UserProtextWrapper>
        <UserLogout/>
      </UserProtextWrapper>} />
    <Route path='/captain-welcome' element = {
      <CaptainProtectWrapper>
        <CaptainWelcome/>
      </CaptainProtectWrapper>
    } />

    <Route path='/captain/logout' element = {
      <CaptainProtectWrapper>
        <CaptainLogout />
      </CaptainProtectWrapper>
    }/>
  
  </Routes>
  </>
}

export default App
