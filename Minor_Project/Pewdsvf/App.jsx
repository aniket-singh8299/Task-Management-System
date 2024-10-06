import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change this line
import Login from './Component/Login';
import Signup from './Component/Signup';
import { ContextAp } from './ContextAp';
import Admin from './Component/Admin';
// import User from './Component/User';
// import Admin1 from './Component/Admin1';
import Update from './Component/UpdateTask';
import Admin1 from './Component/Admin1';
import Home from './Component/Home';


const App = () => {
  return (
    <ContextAp>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
          <Route path="/admin" element={<Admin1/>} />
          {/* <Route path="/" element={<Home/>} /> */}



          {/* <Route path="/admin" element={<Admin/>} /> */}
          <Route path="/user" element={<Update/>} />
          


        </Routes>
      </Router>
    </ContextAp>
  );
}

export default App;
