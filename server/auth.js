const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const router = express.Router();

require('dotenv').config(); 
// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        user = new User({
            name,
            email,
            password,
            role
        });

        // Hash the password before saving the user
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Send back the user ID and token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ msg: 'User registered successfully', userId: user._id, token, role: user.role, email: user.email });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' }); // Send JSON response
    }
});

module.exports = router;
