const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    additionalDetails: {
        class: { type: String },
        branch: { type: String },
        division: { type: String },
        mobileNo: { type: String }
    }
});

module.exports = mongoose.model('User', userSchema);
