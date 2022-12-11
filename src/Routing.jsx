import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Call from './Screen/Call'
import Chat from './Screen/Chat'
import Home from './Screen/Home'
import Preview from './Screen/Preview'
import Profile from './Screen/Profile'

function Routing() {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Profile/:id' element={<Profile/>}/>
    <Route path='/Chat/:id' element={<Chat/>}/>
    <Route path='/Preview' element={<Preview/>}/>
    <Route path='/Call/:id' element={<Call/>}/>
   </Routes>
  )
}

export default Routing
