import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import sign from './assests/Sign.png';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

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
        }
    };

    return (
        <section className='signup-section'>
            <img className='signup-photo' src={sign} alt="Sign Up" />
            <form onSubmit={handleSubmit} className="signup-form">
                <h2 className="signup-title">SignUp</h2>
                <div className="signup-field">
                    <label className="signup-label">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                </div>
                <div className="signup-field">
                    <label className="signup-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                </div>
                <div className="signup-field">
                    <label className="signup-label">Password:</label>
                    <input
                        type="text"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                </div>
                <div className="signup-field">
                    <label className="signup-label">Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                </div>
                <button type="submit" className="signup-btn">Submit</button>
            </form>
            <Toaster position="top-center" reverseOrder={false} />
        </section>
    );
};

export default SignUp;
