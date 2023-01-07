import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from './Screen/Chat'
import Home from './Screen/Home'
import Preview from './Screen/Preview'
import Profile from './Screen/Profile'

import io from 'socket.io-client'

const socket = new io("https://orgappbackend.mohamedbrima.repl.co", { 
  reconnectionAttempts: 4
})



function Routing() {
  return (
  <div className="main_par">
     <Routes>
    <Route path='/' element={<Home socket={socket}/>}/>
    <Route path='/Profile/:id' element={<Profile socket={socket}/>}/>
    <Route path='/Preview' element={<Preview socket={socket}/>}/>
    <Route path='/Chat' element={<Chat socket={socket}/>}>
      <Route path=':id'/>
    </Route>
   </Routes>
  </div>
  )
}

export default Routing
