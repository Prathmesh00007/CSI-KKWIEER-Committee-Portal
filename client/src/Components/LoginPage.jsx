import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import your authentication context
import img1 from '../assets/p1.png';
import img2 from '../assets/p2.png';
import img3 from '../assets/p3.png';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default to 'user'
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the login function from context

    const handleSignUpClick = () => {
        navigate('/signup'); // Navigate to the signup page
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role }), // No need to include userId
        });

        if (response.ok) {
            const { token, userId } = await response.json(); // Get userId from the response
            login(token, role, userId); // Pass token, role, and userId to the login function
            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin'); // Redirect to admin dashboard
            } else {
                navigate('/user'); // Redirect to user dashboard
            }
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <div className="carousel-container">
                <div id="carouselExampleAutoplaying" className="carousel slide" data-ride="carousel" data-interval="2500">
                    <div className="ln-carousel-inner">
                        <div className="carousel-item active">
                            <img src={img1} className="carousel-image" alt="Slide 1" />
                        </div>
                        <div className="carousel-item">
                            <img src={img2} className="carousel-image" alt="Slide 2" />
                        </div>
                        <div className="carousel-item">
                            <img src={img3} className="carousel-image" alt="Slide 3" />
                        </div>
                    </div>
                    <a className="carousel-prev" href="#carouselExampleAutoplaying" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-next" href="#carouselExampleAutoplaying" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <div className="form-box">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="role-selector">
                        <button 
                            type="button" 
                            className={role === 'user' ? 'active' : ''} 
                            onClick={() => setRole('user')}
                        >
                            User
                        </button>
                        <button 
                            type="button" 
                            className={role === 'admin' ? 'active' : ''} 
                            onClick={() => setRole('admin')}
                        >
                            Admin
                        </button>
                    </div>
                    <div className="email-input">
                        <label htmlFor="email">Username or Email</label>
                        <br/>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="password-input">
                        <label htmlFor="password">Password</label>
                        <br/>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter your password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    
                    <div className="login-buttons">
                        <button type="submit" className="login-btn">Log In</button>
                        <div className="divider">
                            <div className="line"></div>
                            <div className="or"><p>OR</p></div>
                            <div className="line"></div>
                        </div>
                        <button type="button" className="signup-btn" onClick={handleSignUpClick}>Sign Up</button>
                        <p id="errorMessage"></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
