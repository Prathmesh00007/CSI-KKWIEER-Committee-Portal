import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import img1 from '../assets/p1.png';
import img2 from '../assets/p2.png';
import img3 from '../assets/p3.png';

function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default to 'user'
    const [additionalDetails, setAdditionalDetails] = useState({
        class: '',
        branch: '',
        division: '',
        mobileNo: ''
    });
    const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting signup form...");

        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }), // Include role
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('userId', data.userId); // Store the userId in local storage
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role); // Store the role in local storage
            setShowAdditionalDetails(true); // Show additional details form
        } else {
            const errorData = await response.json();
            alert('Error signing up: ' + errorData.msg);
        }
    };

    const handleAdditionalDetailsSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const response = await fetch('http://localhost:5000/api/details/additional-details', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, ...additionalDetails }), // Include the userId
        });

        if (response.ok) {
            alert('Additional details saved successfully!');
            navigate('/user'); // Redirect after successful submission
        } else {
            const errorData = await response.json();
            alert('Error saving additional details: ' + errorData.msg);
        }
    };

    return (
        <div className="signupwrapper">
            <div id="box1signup">
                <div id="carouselExampleAutoplaying" className="carousel slide" data-ride="carousel" data-interval="2500">
                <div className="sn-carousel-inner">
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
            <div id="box2signup">
                <form id="signupForm" onSubmit={handleSubmit}>
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
                    {/* Conditional rendering for name, email, and password fields */}
                    {!showAdditionalDetails && (
                        <>
                            <div className="input-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Your Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="student@kkwagh.edu.in"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="**************"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" id='btn'>Sign Up</button>
                        </>
                    )}
                </form>

                {showAdditionalDetails && (
                    <form onSubmit={handleAdditionalDetailsSubmit}>
                        <div className="input-group">
                            <label>Class</label>
                            <select value={additionalDetails.class} onChange={(e) => setAdditionalDetails({ ...additionalDetails, class: e.target.value })}>
                                <option value="">Select Class</option>
                                <option value="FY">FY</option>
                                <option value="SY">SY</option>
                                <option value="TY">TY</option>
                                <option value="BY">BY</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Branch</label>
                            <input
                                type="text"
                                placeholder="Your Branch"
                                value={additionalDetails.branch}
                                onChange={(e) => setAdditionalDetails({ ...additionalDetails, branch: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>Division</label>
                            <input
                                type="text"
                                placeholder="Your Division"
                                value={additionalDetails.division}
                                onChange={(e) => setAdditionalDetails({ ...additionalDetails, division: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label>Mobile No</label>
                            <input
                                type="number"
                                placeholder="Your Mobile No"
                                value={additionalDetails.mobileNo}
                                onChange={(e) => setAdditionalDetails({ ...additionalDetails, mobileNo: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn-login">Save Additional Details</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default SignupPage;
