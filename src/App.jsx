import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Donor from './pages/Donor'
import Requester from './pages/Requester'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ProfilePage from './pages/Profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/giving-blood" element={<Donor />} />
          <Route path="/looking-for-blood" element={<Requester />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={5400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}
