import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, userData } = location.state || {}; 
  const [user, setUser] = useState(userData || null); 
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) { 
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/find/${id}`);

          setUser(response.data.data); 



        } catch (error) {
          setError('Error fetching user details.');
        }
      };

      fetchUserDetails();
    }
  }, [id, user]); 

  
  return (
    <section className="user-details">
      <h2 className="user-details__title">User Details</h2>
      {error && <p className="user-details__error">{error}</p>}
      {user ? (
        <div className="user-details__info">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p className="user-details__loading">Loading...</p>
      )}
      <button className="user-details__back-button"onClick={() => navigate(-1)}>
        Back to Users
      </button>
    </section>
  );
};

export default UserDetails;
