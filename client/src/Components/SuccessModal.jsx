// SuccessModal.js
import React from 'react';
import './Modal.css'; // Import your modal styling

const SuccessModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h1>Successfully registered for the event!</h1>
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
