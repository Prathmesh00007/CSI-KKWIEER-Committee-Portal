import React from 'react';
import './Nav.css';
import arr from '../assets/logoh1.png' // Update the path to your image
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const navigate = useNavigate(); 

    return (
        <div id="navlog">
            <div className='nav1'>
            <img src={arr} id='img1log' alt="Logo" />
            </div>

            <div className='nav2'>
            <ul id='ullog'>       
            <li><RouterLink to="/events">Events</RouterLink></li>
            <li><RouterLink to="/committee">Committee</RouterLink></li>
            <li><RouterLink to="/gallery">Gallery</RouterLink></li>
            <li><RouterLink to="/latest-news">Latest News</RouterLink></li>
            <li><ScrollLink to="footer" smooth={true} duration={500}  >Contact Us</ScrollLink></li>
            </ul>
            </div>
            <div className='nav3'>
            <button id="loginlog" className="btnlo" onClick={() => navigate('/login')}>
                Login
            </button>
            <button id="signuplog" className="btnlo" onClick={() => navigate('/signup')}>
                SignUp
            </button>
            </div>
        </div>
    );
};

export default Navbar;
