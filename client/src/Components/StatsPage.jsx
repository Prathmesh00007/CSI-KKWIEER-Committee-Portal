import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatsPage.css'; // Import your CSS for styling
import { ReactComponent as UpcomingIcon } from '../assets/events/upcoming.svg';
import { ReactComponent as OngoingIcon } from '../assets/events/ongoing.svg';
import { ReactComponent as PastIcon } from '../assets/events/past.svg';

const StatsPage = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState('');
    const [eventName, setEventName] = useState(''); // State to hold the event name
    const [clickedButton, setClickedButton] = useState('Upcoming');

    // Fetch events only once on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events'); // Fetch the list of events
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    // Fetch users and event name when eventId changes
    useEffect(() => {
        const fetchUsersAndEventName = async () => {
            try {
                if (eventId) {
                    // Fetching users registered for the event
                    const usersResponse = await axios.get(`http://localhost:5000/api/events/${eventId}/registrations`);
                    setUsers(usersResponse.data);
                    
                    // Fetch the event details to get the event name
                    const eventResponse = await axios.get(`http://localhost:5000/api/events/${eventId}`);
                    setEventName(eventResponse.data.title); // Assuming the event title is in the 'title' field
                }
            } catch (error) {
                console.error('Error fetching registered users or event name:', error);
            }
        };

        fetchUsersAndEventName(); // Fetch users and event name if eventId is set
    }, [eventId]); // Trigger this effect when eventId changes

    const getFilteredEvents = () => {
        const now = new Date();
        return events.filter(event => {
            const eventStart = new Date(event.date);
            const eventEnd = event.endTime ? new Date(`${event.date}T${event.endTime}`) : null;

            switch (clickedButton) {
                case 'Upcoming':
                    return eventStart > now;
                case 'Ongoing':
                    return eventStart <= now && (eventEnd ? eventEnd >= now : true);
                case 'Past':
                    return event.status === 'past'; 
                default:
                    return true;
            }
        });
    };

    return (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
        <h1
          id="committee-heading"
          style={{
            fontWeight: "800",
            fontSize: "2.5rem",
            marginTop: "50px", // Adjust this value as needed
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Statistics
        </h1>
      </div>

            {/* Conditional rendering for registered users or event selection */}
            {eventId ? (
                <div className='registered-users'>
                    <h2>Registered Users for Event: {eventName}</h2> {/* Display event name */}
                    {users.length === 0 ? (
                        <p>No registrations available for this event.</p>
                    ) : (
                        users.map(user => (
                            <div key={user._id} className='stats-card'>
                                <h3>{user.name}</h3> {/* Display user information as needed */}
                                <p>Email: {user.email}</p>
                                <p>Mobile No: {user.mobileNo}</p>
                                <p>Class: {user.klass}</p>
                                <p>Division {user.division}</p>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <>
                    <div className='stats-event-buttons'>
                        <button onClick={() => setClickedButton('Upcoming')} className={clickedButton === 'Upcoming' ? 'clicked' : ''}>
                            <UpcomingIcon />
                        </button>
                        <button onClick={() => setClickedButton('Ongoing')} className={clickedButton === 'Ongoing' ? 'clicked' : ''}>
                            <OngoingIcon />
                        </button>
                        <button onClick={() => setClickedButton('Past')} className={clickedButton === 'Past' ? 'clicked' : ''}>
                            <PastIcon />
                        </button>
                    </div>
                    <div className='stats-card-container'>
                        {getFilteredEvents().length === 0 ? (
                            <p>No events available.</p>
                        ) : (
                            getFilteredEvents().map(event => (
                                <div key={event._id} className='stats-event-card'>
                                    <h2>{event.title}</h2>
                                    <h3>{event.date}</h3>
                                    <p>{event.currentParticipants} users registered</p>
                                    <Link to={`/admin/stats?eventId=${event._id}`} onClick={() => setEventId(event._id)}>
                                        <button>See Registrations</button>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default StatsPage;
