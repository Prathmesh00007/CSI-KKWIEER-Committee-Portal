import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserEventsPage.css';
import RegisterUser from './RegisterUser';
import Modal from './Modal';
import SuccessModal from './SuccessModal';
import { ReactComponent as Events } from '../assets/events/events.svg';
import { ReactComponent as LeftArrow } from '../assets/events/leftarrow.svg';
import { ReactComponent as RightArrow } from '../assets/events/rightarrow.svg';
import { ReactComponent as UpcomingIcon } from '../assets/events/upcoming.svg';
import { ReactComponent as OngoingIcon } from '../assets/events/ongoing.svg';
import { ReactComponent as PastIcon } from '../assets/events/past.svg';
import { useAuth } from './AuthContext';
import AlreadyRegisteredModal from './AlreadyRegisteredModal';
import Navbar from './NavBar';
import lleft from '../assets/Group 143.png'

const UserEventsPage = ({ events, setEvents }) => {
    const [clickedButton, setClickedButton] = useState('Upcoming');
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const [registeredEvents, setRegisteredEvents] = useState([]); 
    const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const scrollRef = useRef(null);
    const [selectedYear, setSelectedYear] = useState('');

    const navigate = useNavigate();
    const { isAuthenticated, userId } = useAuth(); 
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (isAuthenticated && userId) {
                try {
                    const response = await axios.get('http://localhost:5000/api/user', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    const { additionalDetails } = response.data;
                    localStorage.setItem('class', additionalDetails.class);
                    localStorage.setItem('branch', additionalDetails.branch);
                    localStorage.setItem('division', additionalDetails.division);
                    localStorage.setItem('mobileNo', additionalDetails.mobileNo);

                    const registeredResponse = await axios.get(`http://localhost:5000/api/user-events/${userId}`);
                    setRegisteredEvents(registeredResponse.data.registeredEvents); 
                } catch (error) {
                    console.error('Error fetching user profile or registered events:', error);
                }
            }
        };

        fetchUserProfile();
    }, [isAuthenticated, userId]);

    const handleDetails = (event) => {
        setSelectedEvent(event); 
    };

    const handleCloseModal = () => {
        setSelectedEvent(null); 
    };

    const isAlreadyRegistered = (eventId) => {
        return registeredEvents.includes(eventId); 
    };

    const handleRegister = async (eventId) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const eventToRegister = events.find(event => event._id === eventId);
    
        if (isAlreadyRegistered(eventId)) {
            setShowAlreadyRegisteredModal(true);
            return;
        }

        if (eventToRegister.currentParticipants >= eventToRegister.participantLimit) {
            alert('Event is full. Registration is closed.');
            return;
        }
    
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                alert('User ID not found. Please log in again.');
                return;
            }

            const userResponse = await axios.get('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const userProfile = userResponse.data;
    
            const response = await axios.post(`http://localhost:5000/api/events/${eventId}/register`, {
                eventId,
                userId,
                name: userProfile.name,
                klass: userProfile.additionalDetails.class,
                branch: userProfile.additionalDetails.branch,
                division: userProfile.additionalDetails.division,
                mobileNo: userProfile.additionalDetails.mobileNo,
                email: userProfile.email,
            });
    
            if (response.status === 201) {
                setShowSuccessModal(true); 
                setRegisteredEvents(prev => [...prev, eventId]);
            } else {
                alert('Failed to register for the event. Please try again.');
            }
        } catch (error) {
            console.error('Error registering for the event:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const isEventFull = (event) => {
        return event.currentParticipants >= event.participantLimit;
    };
    
    const handleButtonClick = (label) => {
        setClickedButton(label);
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -100 : 100;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const getFilteredEvents = () => {
        const now = new Date();
        return events.filter(event => {
            const eventStart = new Date(event.date);
            const eventEnd = event.endTime ? new Date(`${event.date}T${event.endTime}`) : null;

            const eventYear = new Date(event.date).getFullYear();
            if (selectedYear && eventYear.toString() !== selectedYear) {
                return false; 
            }

            switch (clickedButton) {
                case 'Upcoming':
                    return eventStart > now && event.status !== 'past'; 
                case 'Ongoing':
                    return eventStart <= now && (eventEnd ? eventEnd >= now : true);
                case 'Past':
                    return event.status === 'past'; 
                default:
                    return true;
            }
        });
    };

    const filteredEvents = getFilteredEvents(); // Store filtered events once

    return (
        <div className='user-events-page'>
      
         
          
            
            <main className='user-events-main'>
                {showRegisterForm ? (
                    <RegisterUser eventId={selectedEventId} onClose={() => setShowRegisterForm(false)} />
                ) : (
                    
                    <div className='user-events-main'>
                    <div className='lleft' > <img src={lleft} id='lleft1' alt="Logo" /></div>
                    <div className='user-events-layout'>
                     
                
                            <div id='filterbar'>
                                <h1 id='h1'>EVENTS</h1>
                                <div className="dropdown-container">
                                    <select
                                        id="status"
                                        className="dropdown"
                                        onChange={(e) => handleButtonClick(e.target.value)} // Call the filtering function on change
                                    >
                                        <option value="" disabled selected hidden>Status</option>
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Past">Past</option>
                                    </select>
                                </div>

                                <div className="dropdown-container">
                                    <select
                                        id="year"
                                        className="dropdown"
                                        onChange={(e) => setSelectedYear(e.target.value)} // Update the selected year on change
                                    >
                                        <option value="" disabled selected hidden>Year</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                    </select>
                                </div>
                            </div>
                        
            
                        <div className='user-events-mainpanel'>
                            <div className='user-events-card-container'>
                                {filteredEvents.length === 0 ? (
                                    <p>No events available.</p>
                                ) : (
                                    filteredEvents.map(event => {
                                        const remainingSlots = event.participantLimit - event.currentParticipants; // Calculate remaining slots
                                        
                                        return (
                                            <div key={event._id} className='user-event-card'>
                                                {event.coverImage && (
                                                    <img src={`http://localhost:5000/${event.coverImage}`} alt={event.title} className='image-slot' />
                                                )}
                                      
                                                <h3 id='titlee'>{event.title}</h3>
                                              
                                                <div className='date-container'>
                                                    <p>{new Date(event.date).toLocaleDateString()}</p>
                                                    <p>{event.startTime}</p>
                                                </div>
                                                <p className='seats'>{remainingSlots > 0 ? `${remainingSlots} Slots Left` : 'Event Full'}</p>
                                                <div className='user-event-card-buttons'>
                                                    <button onClick={() => handleDetails(event)} id='det'>Details</button>
                                                    {clickedButton === 'Upcoming' && !isAlreadyRegistered(event._id) && remainingSlots > 0 && (
                                                        <button onClick={() => handleRegister(event._id)} id='reg'>Register</button>
                                                    )}
                                                    {event.report && (
                                                        <div className='report-section'>
                                                         <a href={event.report} target="_blank" rel="noopener noreferrer">
                                                            <button id='rep'>Report</button>
                                                        </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                    </div>
                )}
            </main>

            {selectedEvent && (
                <Modal event={selectedEvent} onClose={handleCloseModal} />
            )}

            {showAlreadyRegisteredModal && (
                <AlreadyRegisteredModal event={selectedEvent} title="Already Registered" message="You have already registered for this event." onClose={() => setShowAlreadyRegisteredModal(false)} />
            )}
            
            {showSuccessModal && (
                <SuccessModal event={selectedEvent} title="Registration Successful" message="You have successfully registered for the event." onClose={() => setShowSuccessModal(false)} />
            )}
        </div>
    );
};

export default UserEventsPage;
