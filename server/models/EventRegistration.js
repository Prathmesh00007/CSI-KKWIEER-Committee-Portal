const mongoose = require('mongoose');

// Define the schema for event registrations
const registrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    klass: { type: String, required: true },
    division: { type: String, required: true },
    mobileNo: { type: String, required: true },
    email: { type: String, required: true },
    eventId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    eligibility: {
        type: [String], // Store eligible years as an array of strings like ['FY', 'SY', 'TY', 'BY']
        required: true,
    }// Reference to the event
});

// Export the model
module.exports = mongoose.model('EventRegistration', registrationSchema);
