import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from './Screen/Chat'
import Home from './Screen/Home'
import Preview from './Screen/Preview'
import Profile from './Screen/Profile'


function Routing() {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Profile/:id' element={<Profile/>}/>
    <Route path='/Preview' element={<Preview/>}/>
    <Route path='/Chat' element={<Chat/>}/>
   </Routes>
  )
}

export default Routing
