import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import EventsPage from './Components/EventsPage';
import axios from 'axios';
import AddEvents from './Components/AddEvent';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import AdminPage from './Components/AdminPage';
import GalleryPage from './Components/GalleryPage';
import StatsPage from './Components/StatsPage';
import RegisterUser from './Components/RegisterUser';
import UserPage from './Components/UserPage';
import UserGalleryPage from './Components/UserGalleryPage';
import UserCommitteePage from './Components/UserCommitteePage';
import UserEventsPage from './Components/UserEventsPage';
import { useAuth } from './Components/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import AllCommittee from './Components/AllCommittee';
import Latest from './Components/Latest';


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Track login state
    const [events, setEvents] = useState([]); // Track events


  const fetchEvents = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
    } catch (error) {
        console.error("Error fetching events:", error);
        // Optionally, you can set an error state to show in the UI
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/latest-news" element={<Latest />} />
          <Route path="/committee" element={<UserCommitteePage />} />
          <Route path="/gallery" element= {<UserGalleryPage />} />
          <Route path="/events" element={<UserEventsPage events={events} setEvents={setEvents} isLoggedIn={userLoggedIn} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          <Route 
          path="/user" 
          element={<ProtectedRoute element={<UserPage />}
          allowedRoles={['user']}  />} 
          />

          <Route 
            path="/user/gallery" 
            element={<ProtectedRoute element={<UserGalleryPage />}
            allowedRoles={['user']} />} 
          />
          
          <Route 
            path="/user/events" 
            element={<ProtectedRoute element={<UserEventsPage events={events} setEvents={setEvents} />}
            allowedRoles={['user']} />} 
          />
          
          <Route 
            path="/user/committee" 
            element={<ProtectedRoute element={<UserCommitteePage/>}
            allowedRoles={['user']} />} 
          />
          
          <Route 
            path="/admin" 
            element={<ProtectedRoute element={<AdminPage />}
            allowedRoles={['admin']} />} 
          />
          
          <Route 
            path="/admin/stats" 
            element={<ProtectedRoute element={<StatsPage />}
            allowedRoles={['admin']} />} 
          />
          
          <Route 
            path="/admin/gallery" 
            element={<ProtectedRoute element={<GalleryPage />}
            allowedRoles={['admin']} />} 
          />
          
          <Route 
            path="/admin/gallery/upload" 
            element={<ProtectedRoute element={<GalleryPage />}
            allowedRoles={['admin']} />} 
          />
          
          <Route 
            path="/admin/events" 
            element={<ProtectedRoute element={<EventsPage events={events} setEvents={setEvents} fetchEvents={fetchEvents} />}
            allowedRoles={['admin']} />} 
          />
          
          <Route 
            path="/admin/events/addevent" 
            element={<ProtectedRoute element={<AddEvents events={events} setEvents={setEvents} fetchEvents={fetchEvents} />}
            allowedRoles={['admin']} />} 
          />
          
          <Route 
            path="/admin/committee" 
            element={<ProtectedRoute element={<UserCommitteePage />}
            allowedRoles={['admin']} />} 
          />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
