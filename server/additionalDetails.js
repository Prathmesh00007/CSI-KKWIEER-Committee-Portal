const express = require('express');
const router = express.Router();
const User = require('./models/User'); // Ensure you import your User model correctly

// Route for updating additional details
router.post('/additional-details', async (req, res) => {  
    const { userId, class: userClass, branch, division, mobileNo } = req.body;  
   
    try {  
      // Find the user by their ID and update additional details  
      const user = await User.findByIdAndUpdate(  
        userId,  
        {  
          additionalDetails: {  
            class: userClass,  
            branch,  
            division,  
            mobileNo  
          }  
        },  
        { new: true } // Return the updated document  
      );  
   
      if (!user) {  
        return res.status(404).json({ msg: 'User not found' });  
      }  
   
      res.json({ msg: 'Additional details saved successfully', user });  
    } catch (error) {  
      console.error(error.message);  
      res.status(500).send('Server error');  
    }  
});

module.exports = router;
