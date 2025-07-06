import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './EventsPage.css'; 
import { ReactComponent as Events } from '../assets/events/events.svg';
import { ReactComponent as LeftArrow } from '../assets/events/leftarrow.svg';
import { ReactComponent as RightArrow } from '../assets/events/rightarrow.svg';
import { ReactComponent as UpcomingIcon } from '../assets/events/upcoming.svg';
import { ReactComponent as OngoingIcon } from '../assets/events/ongoing.svg';
import { ReactComponent as PastIcon } from '../assets/events/past.svg';
import AddEvents from './AddEvent';
import { ReactComponent as Year1 } from '../assets/events/24-25.svg';
import { ReactComponent as Year2 } from '../assets/events/23-24.svg';
import { ReactComponent as Year3 } from '../assets/events/22-23.svg';

const EventsPage = ({ events, setEvents }) => {
    const [clickedButton, setClickedButton] = useState('Upcoming');
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [showReportUpload, setShowReportUpload] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [reportFile, setReportFile] = useState(null);
    const [showReport, setShowReport] = useState(false);
    const [reportPath, setReportPath] = useState(''); 
    const scrollRef = useRef(null);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            console.log('Fetched Events:', response.data);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
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

    const removeEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            setEvents(events.filter(event => event._id !== id));
        } catch (error) {
            console.error('Error removing event:', error);
        }
    };

    const handleEndEvent = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/events/${id}/end`);
            console.log('Event ended:', response.data);
            setEvents(events.map(event => 
                event._id === id ? { ...event, status: 'past' } : event
            ));
        } catch (error) {
            console.error('Error ending event:', error);
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

            if (selectedDate && eventStart.toDateString() !== new Date(selectedDate).toDateString()) {
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

    useEffect(() => {
        fetchEvents(); 
        const interval = setInterval(() => {
            setEvents(prevEvents => 
                prevEvents.map(event => {
                    const eventEnd = event.endTime ? new Date(`${event.date}T${event.endTime}`) : null;
                    if (event.status === 'ongoing' && eventEnd && eventEnd <= new Date()) {
                        return { ...event, status: 'past' }; 
                    }
                    return event;
                })
            );
            fetchEvents();
        }, 60000); 

        return () => clearInterval(interval);
    }, []);

    const handleFileChange = (e) => {
        setReportFile(e.target.files[0]);
    };

    const handleUploadReport = async () => {
        if (!reportFile || !selectedEventId) return;
        
        const formData = new FormData();
        formData.append('report', reportFile);

        try {
            const response = await axios.post(`http://localhost:5000/api/events/${selectedEventId}/upload-report`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const uploadedReportPath = response.data.reportPath;
            setReportPath(uploadedReportPath); 
            alert('Report uploaded successfully!');
            setShowReportUpload(false);
            setReportFile(null);
            setSelectedEventId(null);
            fetchEvents(); 
        } catch (error) {
            console.error('Error uploading report:', error);
        }
    };

    const handleShowReport = () => {
        setShowReport(true);
    };

    const handleCloseReport = () => {
        setShowReport(false);
    };

    return (
        <div>
            {showAddEvent ? (
                <AddEvents 
                    events={events} 
                    setEvents={setEvents} 
                    fetchEvents={fetchEvents} 
                    setShowAddEvent={setShowAddEvent}
                    setSelectedDate={setSelectedDate} 
                />
            ) : (
                <div className='page-container'>
                    <header className='eventheader'>
                        <div className='admin-events-heading'>
                            EVENTS
                        </div>
                        <div className='event-buttons' ref={scrollRef}>
                                {/* Status dropdown selector */}
                                <select value={clickedButton} onChange={(e) => handleButtonClick(e.target.value)}>
                                    <option value="Upcoming">Upcoming</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Past">Past</option>
                                </select>
                            </div>
                           
                            <div className='admin-events-sidepanel'>
                                <div className='filters'>
                                    {/* Year dropdown selector */}
                                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                                        <option value="">Select Year</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </div>
                            </div>
                        <button onClick={() => setShowAddEvent(true)}>Add Event</button>
                    </header>
                    <main className='admin-events-main'> 
                        <div className='admin-events-mainpanel'>
                            <div className='admin-events-card-container'>
                                {getFilteredEvents().length === 0 ? (
                                    <p>No events available.</p>
                                ) : (
                                    getFilteredEvents().map(event => (
                                        <div key={event._id} className='admin-event-card'>
                                            {event.coverImage && (
                                                <img src={`http://localhost:5000/${event.coverImage}`} alt={event.title} className='image-slot' />
                                            )}
                                            <h1>{event.type}</h1>
                                            <h3>{event.title}</h3>
                                            <div className='admin-event-card-buttons'>
                                                {event.status !== 'past' && (
                                                    <button id='end' onClick={() => handleEndEvent(event._id)}>End Event</button>
                                                )}
                                                <button id='del' onClick={() => removeEvent(event._id)}>Delete Event</button>
                                                {event.status === 'past' && (
                                                    <>
                                                        <button id='add' onClick={() => {
                                                            setShowReportUpload(true);
                                                            setSelectedEventId(event._id);
                                                        }}>
                                                            Add Report
                                                        </button>
                                                        {event.report && (
                                                            <div className='report-section'>
                                                                <a href={event.report} target="_blank" rel="noopener noreferrer">
                                                                    <button id='rep'>Report</button>
                                                                </a>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                      
                    </main>
                </div>
            )}
            
            {showReportUpload && (
                <div className='report-upload-modal'>
                    <h2>Upload Report</h2>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUploadReport}>Upload</button>
                    <button onClick={() => setShowReportUpload(false)}>Cancel</button>
                </div>
            )}
            
            {showReport && (
                <div className='report-view-modal'>
                    <h2>Report for Event ID: {selectedEventId}</h2>
                    {reportPath && <iframe src={reportPath} title="Event Report" />}
                    <button onClick={handleCloseReport}>Close</button>
                </div>
            )}
        </div>
    );
};

export default EventsPage;
