// import { useState } from 'react'
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css'

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
      
   
  )
}
