import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const location = useLocation();
  const { data } = location.state || {};  
  const { name = 'Guest', id } = data || {}; 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/find/${id}`);
      navigate(`/user/details/${id}`, { state: { id ,name } });  
    } catch (error) {
      setError('Failed to fetch user profile.');
    }
  };

  const fetchUserTasks = () => {
    navigate(`/user/viewtask/${id}`, { state: { id, name } });  
  };

  const assignTaskToSelf = () => {
    navigate(`/user/addtaskU/${id}`, { state: { id, name } }); 
  };



  return (
    <section className='user-profile'>
      <div className='Userpage'>
      <h2>Welcome to User Page, {name}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <button onClick={fetchUserProfile}>View Profile</button>  
      <button onClick={fetchUserTasks}>View Assigned Tasks</button>  
      <button onClick={assignTaskToSelf}>Assign Task to Self</button> 
      </div>
      
    </section>
  );
};

export default User;
