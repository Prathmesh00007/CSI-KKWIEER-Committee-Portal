import React, { useState, useEffect } from 'react';
import './UserPage.css';
import { ReactComponent as ProfileIcon } from '../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';

const UserPage = () => {
    const { isAuthenticated, token } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); // Call logout to clear user session
        navigate('/login'); // Navigate to login page
    };

   
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token from context, no need for localStorage
                    },
                });
                setUserInfo(response.data); // Assuming you have a userInfo state to store the fetched data
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        if (isAuthenticated && token) { // Ensure the user is authenticated before fetching the data
            fetchUserInfo();
        }
    }, [isAuthenticated, token]);

    return (
        <div className="user-page">
            <header className="user-header">
                <h1 id='h1'>User Dashboard</h1>
            </header>
            <main className="user-layout">
            <div className="user-horizontal-scrollbar">
                <button id='qwe' onClick={() => navigate('/user/events')}>Check Events</button>
                <button id='qwe' onClick={() => navigate('/user/gallery')}>Check Gallery</button>
                <button id='qwe' onClick={() => navigate('/user/committee')}>Check Committee</button>
            </div>
            <div className='user-content'>
                <div className="user-side-panel">
                    <div className="profile">
                        <ProfileIcon width="100px" height="100px" />
                    </div>
                    <div className="logout">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                
                    {userInfo ? (
                        <div className='user-main-panel'>
                           <div className='qwer'>
                            <p><strong>Name:</strong> {userInfo.name}</p>
                            <p><strong>Class:</strong> {userInfo.additionalDetails?.class || 'N/A'}</p>
                            <p><strong>Division:</strong> {userInfo.additionalDetails?.division || 'N/A'}</p>
                            <p><strong>Mobile No:</strong> {userInfo.additionalDetails?.mobileNo || 'N/A'}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading user information...</p>
                    )}
                </div>
                </main>
            </div>
        
    );
};

export default UserPage;
