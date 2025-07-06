import React, { useState } from 'react';  
import axios from 'axios';  
import { useParams } from 'react-router-dom';  
import { useAuth } from './AuthContext';
  
const RegisterUser = ({ eventId, onClose, onSuccess }) => {  
  const { userId } = useAuth();
  const [formData, setFormData] = useState({  
   name: '',  
   klass: '',  
   division: '',  
   mobileNo: '',  
   email: '',  
  });  
  
  const handleChange = (e) => {  
   const { name, value } = e.target;  
   setFormData(prevData => ({ ...prevData, [name]: value }));  
  };  
  
  const handleSubmit = async (e) => {  
   e.preventDefault();  

 const registrationData = { ...formData, userId }; 

   try {  
    await axios.post(`http://localhost:5000/api/events/${eventId}/register`, registrationData);  
    console.log('onClose:', onClose); // Add this line to check the onClose prop  
    if (typeof onClose === 'function') {  
      onClose(); // Close the registration form after successful registration  
    } else {  
      console.error('onClose is not a function');  
    }  
    if (typeof onSuccess === 'function') {  
      onSuccess(); // Show success modal after successful registration  
    } else {  
      console.error('onSuccess is not a function');  
    }  
   } catch (error) {  
    console.error('Error registering user:', error);  
   }  
  };  
  
  return (  
   <div className="registration-form">  
    <h2>Register for Event</h2>  
    <form onSubmit={handleSubmit}>  
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />  
      <input type="text" name="klass" placeholder="Class" onChange={handleChange} required />  
      <input type="text" name="division" placeholder="Division" onChange={handleChange} required />  
      <input type="text" name="mobileNo" placeholder="Mobile No" onChange={handleChange} required />  
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />  
      <button type="submit" >Submit</button>  
      <button type="button" onClick={onClose}>Cancel</button>  
    </form>  
   </div>  
  );  
};  
  
export default RegisterUser;
