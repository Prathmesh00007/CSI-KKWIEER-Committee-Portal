// Modal.js
import React from 'react';
import './Modal.css'; // You can style this as you like

const Modal = ({ event, onClose }) => {
    if (!event) return null; // If no event, don't render

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <div className='event-overview'>
                    <div id='tital'>
                        <h2 id='eveov'>EVENT DETAILS</h2>
                    </div>
                    <table className="event-table">
                        <tbody>
                            <tr>
                                <th>EVENT TITLE</th>
                                <td>{event.title}</td>
                            </tr>
                            <tr>
                                <th>EVENT DATE</th>
                                <td>{new Date(event.date).toLocaleDateString()}</td> {/* Format date */}
                            </tr>
                            <tr>
                                <th>EVENT TIME</th>
                                <td>{event.time}</td>
                            </tr>
                            <tr>
                                <th>EVENT LOCATION</th>
                                <td>{event.location}</td>
                            </tr>
                            <tr>
                                <th>EVENT DESCRIPTION</th>
                                <td>{event.description}</td>
                            </tr>
                            <tr>
                                <th>EVENT TYPE</th>
                                <td>{event.type}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
