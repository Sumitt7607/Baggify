import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from './Footer';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    navigate('/home');
                } else {
                    setError(res.data.message || 'Login failed');
                }
            })
            .catch(err => {
                console.error(err);
                setError("Login failed. Please check your credentials.");
            });
    };

    return (
        <>
            <div className='login-page'>
                <div className="login-container">
                    <h2 className="login-title">Login here</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                required
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-input"
                                required
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        {error && <p className="form-error">{error}</p>}

                        <button type="submit" className="login-btn">Login</button>
                    </form>
                    <p className="signup-link">
                        Create an account? <Link to="/" className="signup-link-text">Sign up here</Link>
                    </p>
                </div>
                
        </div>
        <Footer/>
        </>
    );
}

export default Login;
