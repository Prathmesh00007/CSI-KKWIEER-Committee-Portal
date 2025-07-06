import React, { useState } from 'react';
import './UploadPhotosModal.css'; // Import your CSS file for modal styles

const UploadPhotosModal = ({ isOpen, onClose, events, onUpload }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(events[0]); // Default to the first event
    const [selectedYear, setSelectedYear] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFiles(Array.from(event.target.files)); // Convert FileList to an array
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error messages

        if (!selectedYear) {
            setErrorMessage('Year is required!');
            return;
        }

        onUpload(selectedEvent, selectedYear, selectedFiles);
    };

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Upload Photos</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                    <form onSubmit={handleSubmit}>
                        <label>
                            Select Event:
                            <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
                                {events.map((event, index) => (
                                    <option key={index} value={event}>{event}</option>
                                ))}
                            </select>
                        </label>
                        <label>
    Select Year:
    <select 
        value={selectedYear} 
        onChange={(e) => setSelectedYear(e.target.value)}
    >
        <option value="">Select a Year</option> {/* Default option */}
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        {/* Add more years as needed */}
    </select>
</label>

                        <label>
                            Upload Photos:
                            <input 
                                type="file" 
                                multiple 
                                onChange={handleFileChange} 
                            />
                        </label>
                        <button type="submit">Upload</button>
                        <button type="button" onClick={onClose}>Close</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default UploadPhotosModal;
