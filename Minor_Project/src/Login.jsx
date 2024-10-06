import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from './assests/login.jpg';
import { FaUserTie } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`http://localhost:8080/api/users/login/${email}/${password}`);
            console.log('Login successful:', data);
            let { role } = data.data;
            if (role === "ADMIN") {
                toast.success(`Login successfull as ${role}`);
            setTimeout(() => {
                navigate("/admin");
            }, 2000);
            } else if (role === "USER") {
                toast.success(`Login successfull as ${role}`);
            setTimeout(() => {
                navigate("/user", { state: data });
            }, 2000);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Login failed');
            } else {
                toast.error("Password is Incorrect");
            }
        }
    };

    return (
        <div className='loginpage'>
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="login-title"><FaUserTie />
                </h2>
                <div className="login-field">
                    <label className="login-label">Email:</label>
                    <input
                        type="email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="login-field">
                    <label className="login-label">Password:</label>
                    <input
                        type="password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="login-btn" type="submit">Login</button>
            </form>
            {error && <p className="login-error">{error}</p>}
            <Toaster position="top-center" reverseOrder={false} />

        </div>
    );
};

export default Login;
