import React from 'react';
import { Link } from 'react-router-dom';
import layout from '../assests/Layout.png';

const Layout = () => {
  return (
    <div className="landing-container">
      <div className="marquee-container" >
        <marquee scrollamount="20" direction="left">WELCOME TO TASK MANAGEMENT SYSTEM</marquee>
      </div>
      <div className="content-section">
        <div className="text-section">
          <h1 className="heading">Task <span>Management</span> <span>System</span></h1>
          <p className="description">
            Our Task Management System is here to simplify your workflow! Designed for teams of all sizes, it allows for efficient task assignment by both users and administrators, ensuring everyone stays aligned and productive.
          </p>
          <Link to="/signup"><button className="cta-button">Get started!</button></Link> 
        </div>

        <div className="image-section">
          <img src={layout} alt="To-Do" className="todo-image" />
        </div>
      </div>
    </div>
  );
};

export default Layout;
