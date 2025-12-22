// import { useState } from 'react'
import Auth from "./pages/auth/sign-in"
import Dashboard from "./pages/Dashboard"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css'
import ForgotPassword from "./pages/auth/forgot-password"
import SignUp from "./pages/auth/sign-up"

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/auth/forgot-password" element={<ForgotPassword />}/>
        <Route path="/auth/sign-up" element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
      
   
  )
}
