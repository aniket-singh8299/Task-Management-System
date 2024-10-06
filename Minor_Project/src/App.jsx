import React from 'react'
import Signin from './SignUp'
import { RouterProvider } from 'react-router-dom'
import { Projectrouting } from './Routing/GlobalRouting'
import Login from './Login'
import Admin from './Component/Admin'
import User from './Component/User'
import TaskAdd from './Component/TaskAdd'
import Update from './Component/Update'
import Layout from './Component/Layout'
import UserDetails from './Component/UserDetails'

const App = () => {
  return (
    
       <RouterProvider router={Projectrouting} >
    <Layout/>
    
   </RouterProvider>

   
     
    
  )
}

export default App
