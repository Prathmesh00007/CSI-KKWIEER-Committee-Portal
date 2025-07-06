// AlreadyRegisteredModal.js
import React from 'react';
import './Modal.css'; // Import your modal styling

const AlreadyRegisteredModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h1>You have already registered for this event.</h1>
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default AlreadyRegisteredModal;
