import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Call from './Screen/Call'
import Chat from './Screen/Chat'
import Home from './Screen/Home'
import Preview from './Screen/Preview'
import Profile from './Screen/Profile'

import io from 'socket.io-client'

const socket = new io("https://testbackend.mohamedbrima.repl.co")



function Routing() {
  return (
   <Routes>
    <Route path='/' element={<Home socket={socket}/>}/>
    <Route path='/Profile/:id' element={<Profile socket={socket}/>}/>
    <Route path='/Preview' element={<Preview socket={socket}/>}/>
    <Route path='/Chat' element={<Chat socket={socket}/>}/>
    <Route path='/Call/:ide' element={<Call socket={socket}/>}/>
   </Routes>
  )
}

export default Routing
