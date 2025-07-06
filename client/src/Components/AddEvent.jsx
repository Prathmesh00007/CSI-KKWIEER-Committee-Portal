import React, { useState } from 'react';
import axios from 'axios';
import './AddEvent.css';

const AddEvents = ({ events, setEvents, fetchEvents, setShowAddEvent }) => {
    const [newEvent, setNewEvent] = useState({
        type: '',
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        coverImage: null, // Initialize coverImage to null
        eligibleClasses: [],
        participantLimit: '' // Correctly initialize eligibleClasses
    });

    const handleEligibilityChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setNewEvent((prev) => ({
                ...prev,
                eligibleClasses: [...prev.eligibleClasses, value] // Update eligibleClasses here
            }));
        } else {
            setNewEvent((prev) => ({
                ...prev,
                eligibleClasses: prev.eligibleClasses.filter((klass) => klass !== value) // Filter out unchecked values
            }));
        }
    };

    const handleFileChange = (e) => {
        setNewEvent((prev) => ({ ...prev, coverImage: e.target.files[0] })); // Store the selected file
    };

    const addEvent = async () => {
        // Check all required fields
        if (!newEvent.type || !newEvent.title || !newEvent.description || !newEvent.date || !newEvent.startTime || !newEvent.endTime || !newEvent.location) return;

        const eventStartDateTime = new Date(`${newEvent.date}T${newEvent.startTime}`);
        const eventEndDateTime = new Date(`${newEvent.date}T${newEvent.endTime}`);

        try {
            const formData = new FormData();
            formData.append('type', newEvent.type);
            formData.append('title', newEvent.title);
            formData.append('description', newEvent.description);
            formData.append('date', eventStartDateTime);
            formData.append('endTime', eventEndDateTime);
            formData.append('location', newEvent.location);
            formData.append('coverImage', newEvent.coverImage);
            formData.append('participantLimit', newEvent.participantLimit);
            newEvent.eligibleClasses.forEach((klass) => {  
                formData.append('eligibleClasses[]', klass);  
              });
            
            
            console.log('Submitting event:', {
                type: newEvent.type,
                title: newEvent.title,
                description: newEvent.description,
                date: eventStartDateTime,
                endTime: eventEndDateTime,
                location: newEvent.location,
                coverImage: newEvent.coverImage,
                eligibleClasses: newEvent.eligibleClasses,
                participantLimit: newEvent.participantLimit 
            });
            
            const response = await axios.post('http://localhost:5000/api/events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setEvents((prevEvents) => [...prevEvents, response.data]);
            // Reset form
            setNewEvent({ 
                type: '', 
                title: '', 
                description: '', 
                date: '', 
                startTime: '', 
                endTime: '', 
                location: '', 
                coverImage: null, // Reset coverImage
                eligibleClasses: [],
                participantLimit: '' 
            });
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    return (
        <main className="addevent-main">
            <div className='addevent'>
                <select  
                    value={newEvent.type}  
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}  
                >  
                    <option value="">Select Event Type</option>  
                    <option value="Technical">Technical</option>  
                    <option value="Non-Technical">Non-Technical</option>  
                </select>

                <input
                    type="text"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Event Date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
                <input
                    type="time"
                    placeholder="Event Start Time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                />
                <input
                    type="time"
                    placeholder="Event End Time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Event Location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    required 
                /> {/* File input for cover image */}
                <input
                    type="number"
                    placeholder="Participant Limit"
                    value={newEvent.participantLimit}
                    onChange={(e) => setNewEvent({ ...newEvent, participantLimit: e.target.value })} 
                />
                <div>
                    <label>Eligibility:</label>
                    <div>
                        <input
                            type="checkbox"
                            value="FY"
                            onChange={handleEligibilityChange}
                        /> FY
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="SY"
                            onChange={handleEligibilityChange}
                        /> SY
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="TY"
                            onChange={handleEligibilityChange}
                        /> TY
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value="BY"
                            onChange={handleEligibilityChange}
                        /> BY
                    </div>
                </div>
                <button onClick={addEvent}>Add Event</button>
                <button onClick={() => setShowAddEvent(false)}>Cancel</button>
            </div>
        </main>
    );
};

export default AddEvents;
