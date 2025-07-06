
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './GalleryPage.css'; // Import your CSS file
import { ReactComponent as Gallery } from '../assets/gallery/Gallery.svg';
import UploadPhotosModal from './UploadPhotosModal'; // Import the modal
import { ReactComponent as Year1 } from '../assets/events/24-25.svg'
import { ReactComponent as Year2 } from '../assets/events/23-24.svg'
import { ReactComponent as Year3 } from '../assets/events/22-23.svg'
import { ReactComponent as UploadPhoto} from '../assets/uploadphoto.svg';


const GalleryPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [photos, setPhotos] = useState([]);
    const [pinnedPhotos, setPinnedPhotos] = useState([]); // State for pinned photos
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const events = [
       "Equinox", "E-Yantran", "Campus to Corporate", "UI/UX Workshop", "DBMS Mini-Project", "Industrial Visit"    ]; // Add your event names
    const years = ["2024", "2023", "2022"]; // List of years for filtering

    const handlePhotoUpload = async (eventName, year, files) => {
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('photos', file);
        });
        formData.append('event', eventName);
        formData.append('year', year || new Date().getFullYear().toString());
    
        try {
            setLoading(true); // Start loading
            const response = await fetch('http://localhost:5000/api/photos/upload', { // Updated route
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Photos uploaded successfully:', data);
                setPhotos([...photos, ...data.photos]); // Add new photos to the state
                setModalOpen(false); // Close modal after successful upload
            } else {
                console.error('Upload failed:', response.statusText);
                setError('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading photos:', error);
            setError('Error uploading photos');
        } finally {
            setLoading(false); // Stop loading after request completes
        }
    };

    // Fetch photos from the server when the component mounts
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/photos'); // Fetch photos from your server
                const data = await response.json();
                console.log(data);
                setPhotos(data); // No need for `data.photos` if API returns an array directly
            } catch (error) {
                console.error('Error fetching photos:', error);
                setError('Error fetching photos');
            } finally {
                setLoading(false);
            }
        };
        
        fetchPhotos();
    }, []);

    const handleRemovePhoto = async (photoId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/photos/${photoId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                const updatedPhotos = photos.filter(photo => photo._id !== photoId);
                const updatedPinnedPhotos = pinnedPhotos.filter(photo => photo._id !== photoId);
                setPhotos(updatedPhotos);
                setPinnedPhotos(updatedPinnedPhotos);
            } else {
                console.error('Failed to remove photo:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing photo:', error);
        }
    };
    

    const handlePinPhoto = async (photo) => {
        try {
            const response = await fetch(`http://localhost:5000/api/photos/pin/${photo._id}`, {
                method: 'PATCH',
            });
    
            if (response.ok) {
                const updatedPhoto = await response.json();
                setPhotos(photos.map(p => p._id === updatedPhoto._id ? updatedPhoto : p));
                setPinnedPhotos(updatedPhoto.isPinned ? [...pinnedPhotos, updatedPhoto] : pinnedPhotos.filter(p => p._id !== updatedPhoto._id));
            } else {
                console.error('Failed to update photo:', response.statusText);
            }
        } catch (error) {
            console.error('Error pinning photo:', error);
        }
    };
    

    const filteredPhotos = photos.filter(photo => 
        (selectedYear ? photo.year === selectedYear : true) &&
        (selectedEvent ? photo.event === selectedEvent : true)
    );

    return (
        <div className="gallery-page-container">
            <div className="gallery-header">
                <Gallery />
            <div className='upload-button'>
                <button onClick={() => setModalOpen(true)}><UploadPhoto /></button>
            </div>
                
            </div>
            <div className="gallery-scrollbar">
                <div className="event-buttons">
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
                        <button className='year' key={index} onClick={() => setSelectedYear(year)}>
                            {year === "2024" && <Year1 />} 
                            {year === "2023" && <Year2 />} 
                            {year === "2022" && <Year3 />}
                            
                        </button>
                    ))}
                </div>
                
                <div className="gallery-main-panel">
    <div className="gallery-card-container">
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <>
                {pinnedPhotos.length > 0 && (
                    <>
                        
                        {pinnedPhotos.map((photo) => (
                            <div key={photo._id} className="event-card">
                                <img 
                                    src={`http://localhost:5000/${photo.filePath}`} 
                                    alt="Pinned" 
                                    style={{ width: '100%' }} 
                                />
                                <div className="gallery-card-buttons">
                                    <button onClick={() => handleRemovePhoto(photo._id)}>Remove</button>
                                    <button onClick={() => handlePinPhoto(photo)}>Unpin</button> {/* Unpin button */}
                                </div>
                            </div>
                        ))}
                    </>
                )}
                
                {filteredPhotos.length === 0 ? (
                    <p>No photos available for the selected event and year.</p>
                ) : (
                    filteredPhotos
                        .filter(photo => !pinnedPhotos.some(pinnedPhoto => pinnedPhoto._id === photo._id)) // Exclude pinned photos
                        .map((photo) => (
                            <div key={photo._id} className="gallery-event-card">
                                <img 
                                    src={`http://localhost:5000/${photo.filePath}`} 
                                    alt="Uploaded" 
                                    style={{ width: '100%' }} 
                                />
                                <div className="gallery-card-buttons">
                                    <button onClick={() => handlePinPhoto(photo)}>
                                        {pinnedPhotos.some(pinnedPhoto => pinnedPhoto._id === photo._id) ? 'Unpin' : 'Pin'}
                                    </button>
                                    <button onClick={() => handleRemovePhoto(photo._id)}>Remove</button>
                                </div>
                            </div>
                        ))
                )}
            </>
        )}
    </div>
</div>


 

            </div>


            {/* Upload Photos Modal */}
            <UploadPhotosModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                events={events}
                onUpload={handlePhotoUpload} // Handle upload in the modal
            />
        </div>
    );
};

export default GalleryPage;
