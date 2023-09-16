import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Register from './Register';
import Login from './Login';
import Products from './Products';
import Orderhistory from './Orderhistory';
const MainRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="register" element={<Register/>} />
        <Route path="login" element={<Login/>} />
        <Route path="application" element={<App/>} />
        <Route path='products' element={<Products/>} />
        <Route path='orderhistory' element={<Orderhistory/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default MainRouter