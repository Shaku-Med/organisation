import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Notfound from './Notfound'
import Signup from './Signup'
import Verify from './Verify'

function Auth() {
  return (
    <Routes>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/verify/:id' element={<Verify/>}/>
        <Route path='/*' element={<Notfound/>}/>
    </Routes>
  )
}

export default Auth
