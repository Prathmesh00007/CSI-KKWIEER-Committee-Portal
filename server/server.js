const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT generation
const photoRoutes = require('./photoRoutes');
const multer = require('multer');
const path = require('path');
const registrationRoute = require('./registrationRoute');
const authRoutes = require('./auth');
const additionalDetailsRoutes = require('./additionalDetails');
const User = require('./models/User'); // Import the User model
const EventRegistration = require('./models/EventRegistration'); // Adjust the path as necessary
const Event = require('./models/Events');
const Events = require('./models/Events');


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});

const upload = multer({ storage });

// MongoDB connection
mongoose.connect('0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Event Schema


// Routes
// Get all events
app.get('/api/events', async (req, res) => {
  console.log("Received request for events");
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new event
app.post('/api/events', upload.single('coverImage'), async (req, res) => {
  try {
      // Handle eligibleClasses separately
      const eligibleClasses = Array.isArray(req.body.eligibleClasses) 
          ? req.body.eligibleClasses 
          : [req.body.eligibleClasses];

      // Create new event object with the data from req.body
      const newEvent = new Event({
          ...req.body, // Spread other fields
          coverImage: req.file ? req.file.path : null, // Add file path if file uploaded
          eligibleClasses // Include eligibleClasses array
      });

      await newEvent.save(); // Save the new event to the database
      res.status(201).json(newEvent); // Respond with the created event
  } catch (err) {
      console.error('Error creating event:', err); // Log the error
      res.status(400).json({ message: 'Invalid data' }); // Respond with an error message
  }
});

// Delete an event by ID
app.delete('/api/events/:id', async (req, res) => {
  try {
    const result = await Event.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event removed' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Get an event by its id
// Get event by ID
app.get('/api/events/:eventId', async (req, res) => {
  try {
      const eventId = req.params.eventId;
      const event = await Event.findById(eventId); // Ensure you're using the correct model
      if (!event) {
          return res.status(404).json({ message: 'Event not found.' });
      }
      res.json(event);
  } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Server error.' });
  }
});



// Get registrations for an event
app.get('/api/events/:eventId/registrations', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const registrations = await EventRegistration.find({ eventId }).populate('userId', 'name email mobileNo');
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Failed to fetch registrations.' });
  }
});

// End an event
// End an event
app.put('/api/events/:id/end', async (req, res) => {
  try {
      const eventId = req.params.id;
      const updatedEvent = await Event.findByIdAndUpdate(eventId, { status: 'past' }, { new: true });

      if (!updatedEvent) {
          return res.status(404).json({ message: 'Event not found' });
      }
      console.log('Updated Event:', updatedEvent); // Log the updated event

      res.json(updatedEvent); // Send the updated event back
  } catch (error) {
      console.error('Error ending event:', error);
      res.status(500).json({ message: 'Failed to end event.' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body; // Removed role as it's not needed for login

  try {
    const user = await User.findOne({ email }); // Use the User model instead of UserLogin
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: 'Unauthorized role' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

    console.log('Login successful for user:', email);
    res.json({ token, userId: user._id, role: user.role });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//user infromation on dashboard
// In your auth routes or a separate user routes file
app.get('/api/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from the authorization header
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
      const decoded = jwt.verify(token, 'your-secret-key'); // Use your secret key
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Return user information excluding password
      const { name, email, additionalDetails } = user;
      res.json({ name, email, additionalDetails });
  } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// In your backend route for uploading the report
app.post('/api/events/:id/upload-report', upload.single('report'), async (req, res) => {
  try {
      const eventId = req.params.id;

      if (!req.file) {
          return res.status(400).json({ msg: 'No file uploaded' });
      }
      
      const baseUrl = 'http://localhost:5000'; // Change this as needed for production
      const reportPath = `${baseUrl}/${req.file.path}`; // Construct full URL

      // Find the event and update its report field
      const updatedEvent = await Events.findByIdAndUpdate(eventId, { report: reportPath }, { new: true });

      if (!updatedEvent) {
          return res.status(404).json({ msg: 'Event not found' });
      }

      res.status(200).json({ msg: 'Report uploaded successfully', reportPath });
  } catch (error) {
      console.error('Error uploading report:', error);
      res.status(500).json({ msg: 'Server error' });
  }
});






// Photo Upload
app.use('/api/photos', photoRoutes); // Set base route for photos
app.use('/uploads', express.static('uploads'));
app.use('/api', registrationRoute);
app.use('/api/auth', authRoutes);
app.use('/api/details', additionalDetailsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
