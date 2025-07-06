const mongoose = require('mongoose');

// Define the schema for photos
const photoSchema = new mongoose.Schema({
    event: { type: String, required: true }, // Name of the event
    year: { type: String, required: true },  // Year of the event
    filePath: { type: String, required: true }, // Path to the uploaded photo
    uploadedAt: { type: Date, default: Date.now }, // Date of upload
    isPinned: { type: Boolean, default: false }
});

// Create the model from the schema
const Photo = mongoose.model('Photo', photoSchema);

// Export the model
module.exports = Photo;
