import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './Login'
import Notfound from './Notfound'
import Signup from './Signup'
import Verify from './Verify'
import { AnimatePresence } from "framer-motion";


function Auth() {
  const location = useLocation();
  return (
   <AnimatePresence exitBeforeEnter>
     <Routes key={location.pathname} location={location}>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/verify/:id' element={<Verify/>}/>
        <Route path='/*' element={<Notfound/>}/>
    </Routes>
   </AnimatePresence>
  )
}

export default Auth
