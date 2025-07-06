const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    coverImage: String,
    status: { type: String, enum: ['upcoming', 'ongoing', 'past']},
    eligibleClasses: { type: [String]
    },
    report: {
      type: String, // This will store the file path or URL to the uploaded report
      default: null,
    },
    participantLimit: {
      type: Number, // Stores the maximum number of participants allowed
      required: true, // If you want this to be a required field
      min: 1, // Ensure that the limit is at least 1 participant
    },
    currentParticipants: { type: Number, default: 0 } 
  });
  


  module.exports = mongoose.model('Event', eventSchema);