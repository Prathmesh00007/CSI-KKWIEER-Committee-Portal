import React, { useState, useEffect } from 'react';
import './GalleryPage.css'; // Reuse your CSS
import axios from 'axios'; // If you are using axios for API calls
import { ReactComponent as Year1 } from '../assets/events/24-25.svg'
import { ReactComponent as Year2 } from '../assets/events/23-24.svg'
import { ReactComponent as Year3 } from '../assets/events/22-23.svg'
import { ReactComponent as Gallery } from '../assets/gallery/Gallery.svg';

const UserGalleryPage = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const events = ["Equinox", "E-Yantran", "Campus to Corporate", "UI/UX Workshop", "DBMS Mini-Project", "Industrial Visit" ];
    const years = ["2024", "2023", "2022"];

    const fetchPhotos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/photos'); // Adjust endpoint if necessary
            const allPhotos = response.data;

            // Filter photos based on selected event and year
            const filteredPhotos = allPhotos.filter(photo => 
                (!selectedEvent || photo.event === selectedEvent) &&
                (!selectedYear || photo.year === selectedYear)
            );

            setPhotos(filteredPhotos);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, [selectedEvent, selectedYear]);

    return (
        <div className="gallery-page-container">
            <div className="gallery-header">
                <Gallery />
            </div>
            <div className="gallery-scrollbar">
                <div className="gallery-event-buttons">
                    {events.map((event, index) => (
                        <button key={index} onClick={() => setSelectedEvent(event)}>
                            {event}
                        </button>
                    ))}
                </div>
            </div>

            <div className='gallery-layout'>

            <div className="gallery-side-panel"> {/* Aside panel for year selection */}
                   
                   {years.map((year, index) => (
                       <button key={index} onClick={() => setSelectedYear(year)}>
                           {year === "2024" && <Year1 />} 
                           {year === "2023" && <Year2 />} 
                           {year === "2022" && <Year3 />}
                           
                           
                       </button>
                   ))}
               </div>

            <div className="gallery-main-panel">
                <div className="gallery-card-container">
                    {photos.length === 0 ? (
                        <p>No photos available for the selected event and year.</p>
                    ) : (
                        photos.map((photo, index) => (
                            <div key={index} className="gallery-event-card">
                                <img 
                                    src={`http://localhost:5000/${photo.filePath}`} 
                                    alt="Gallery" 
                                    style={{ width: '100%' }} 
                                />
                                <div className="gallery-card-buttons">
                                    <button>View</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            </div>
        </div>
    );
};

export default UserGalleryPage;
