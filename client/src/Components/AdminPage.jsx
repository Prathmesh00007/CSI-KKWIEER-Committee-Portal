import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../assets/profile.svg';

const AdminPage = () => {
    const [events, setEvents] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchEvents();
        fetchUserInfo();
    }, []);

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
            </header>
            <div className="admin-scrollbar">
                <button onClick={() => navigate('/admin/stats')}>Check Stats</button>
                <button onClick={() => navigate('/admin/events')}>Manage Events</button>
                <button onClick={() => navigate('/admin/gallery')}>Manage Gallery</button>
                <button onClick={() => navigate('/admin/committee')}>Manage Committee</button>
            </div>
            <div className="admin-content">
                <div className="admin-side-panel">
                    <div className="profile">
                        <ProfileIcon width="100px" height="100px" />
                    </div>
                    <div className="logout">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <main className="admin-main-panel">
                    {userInfo ? (
                        <div>
                            <div className='qwer'>
                            <p><strong>Name:</strong> {userInfo.name}</p>
                            <p><strong>Class:</strong> {userInfo.additionalDetails.class}</p>
                            <p><strong>Division:</strong> {userInfo.additionalDetails.division}</p>
                            <p><strong>Mobile No:</strong> {userInfo.additionalDetails.mobileNo}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading user information...</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
