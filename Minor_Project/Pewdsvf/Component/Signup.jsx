import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/save', user);
            console.log('User created:', response.data);
            toast.success('User created successfully');
            setTimeout(() => {
              navigate("/login");
            }, 2000);
        } catch (error) {
            console.error('There was an error creating the user!', error);
            toast.error('Error creating user. Please try again.');
        }
    };

    return (
        <div className="signup-container">
          <h1>Register</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="input-label">Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="input-field"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="input-field"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        className="input-field"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Role:</label>
                    <input
                        type="text"
                        name="role"
                        className="input-field"
                        value={user.role}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;
