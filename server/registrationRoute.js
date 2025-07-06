const express = require('express');
const EventRegistration = require('./models/EventRegistration'); // Your registration model
const Events = require('./models/Events'); 
const router = express.Router();

router.post('/events/:eventId/register', async (req, res) => {
  const { userId, name, klass, division, mobileNo, email } = req.body;
  const eventId = req.params.eventId;

  if (!userId || !eventId) {
      return res.status(400).json({ message: 'User ID and Event ID are required.' });
  }

  try {
    // Find the event by eventId
    const event = await Events.findById(eventId);
    if (!event) {
        return res.status(404).json({ message: 'Event not found.' });
    }

    // Check if the user has already registered for the event
    const existingRegistration = await EventRegistration.findOne({ userId, eventId });
    if (existingRegistration) {
        return res.status(400).json({ message: 'You have already registered for this event.' });
    }

    // Check if the user's class is eligible for this event
    if (!event.eligibleClasses.includes(klass)) {
        return res.status(400).json({ message: `You are not eligible to register for this event. Only ${event.eligibleClasses.join(', ')} classes can register.` });
    }

    // Check if the participant limit has been reached
    if (event.currentParticipants >= event.participantLimit) {
        return res.status(400).json({ error: 'Registration is full for this event.' });
    }

    // If the user is eligible and there is space, create a new registration
    const newRegistration = new EventRegistration({
        userId,
        eventId,
        name,
        klass,
        division,
        mobileNo,
        email
    });

    await newRegistration.save();

    // Increment the participant count after successful registration
    event.currentParticipants += 1;
    await event.save();

    return res.status(201).json({ message: 'Registration successful!' });

} catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Server error.', error: error.message });
}
});

module.exports = router;
