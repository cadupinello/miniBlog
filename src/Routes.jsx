import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuthentication } from './hooks/useAuthentication';
import { useAuthValue } from './context/AuthContext';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import DashBoard from './pages/DashBoard/DashBoard';

const HandleRoutes = () => {
  const { user } = useAuthValue(useAuthentication)

  return (
    <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
          <Route path='/dashboard' element={user ? <DashBoard /> : <Navigate to="/login" />} />
        </Routes>
    </>
  )
}

export default HandleRoutes