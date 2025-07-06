const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
