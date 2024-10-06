import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/users/login/${email}/${password}`);
            console.log('Login successful:', response.data);

            const userRole = response.data.data?.role; 
            console.log('User role:', userRole);

            if (userRole === "ADMIN") {
                toast.success('Login successful');
                navigate("/admin");
            } 
            else if (userRole === "USER") {
                toast.success('Login successful');
                navigate("/user");
            } 
            else {
                setError('Invalid credentials');
            }

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Login failed');
                toast.error(error.response.data.message || 'Login failed');
            } else {
                setError('Network error or server not reachable');
                toast.error('Network error or server not reachable');
            }
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="input-group">
                    <label className="input-label">Email:</label>
                    <input
                        type="email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Password:</label>
                    <input
                        type="password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <ToastContainer />
        </div>
    );
};

export default Login;
