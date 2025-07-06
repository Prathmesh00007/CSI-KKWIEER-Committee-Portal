const express = require('express');
const multer = require('multer');
const Photo = require('./models/Photo'); // Import your Photo model
const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to handle file upload
router.post('/upload', upload.array('photos'), async (req, res) => {
  try {
    const files = req.files; // Retrieve uploaded files
    const event = req.body.event;
    const year = req.body.year;

    const savedPhotos = [];

    for (const file of files) {
      // Create a new photo document and replace backslashes with forward slashes
      const photo = new Photo({
        filePath: file.path.replace(/\\/g, '/'), // Use file.path
        event,
        year,
        isPinned: false
      });
      await photo.save(); // Save the photo to the database
      savedPhotos.push(photo); // Add to the saved photos array
    }

    res.status(200).json({ message: 'Photos uploaded successfully', photos: savedPhotos });
  } catch (error) {
    console.error('Error uploading photos:', error);
    res.status(500).json({ error: 'Failed to upload photos.', details: error.message });
  }
});

// Corrected route to fetch photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().sort({ isPinned: -1 }); // Sort by pinned status
    res.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos from the database.' });
  }
});


// Route to delete a photo
router.delete('/:id', async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    res.json({ message: 'Photo removed successfully', photo });
  } catch (error) {
    console.error('Error removing photo:', error);
    res.status(500).json({ error: 'Failed to remove photo.', details: error.message });
  }
});

// Route to pin/unpin a photo
router.patch('/pin/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    photo.isPinned = !photo.isPinned; // Toggle pin status
    await photo.save();

    res.json(photo); // Send back the updated photo
  } catch (error) {
    console.error('Error updating photo:', error);
    res.status(500).json({ error: 'Failed to update photo.', details: error.message });
  }
});




module.exports = router;
