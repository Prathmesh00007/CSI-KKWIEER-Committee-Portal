import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import arr from '../assets/icons8-arrow-50.png';
import car1 from '../assets/car1.png';
import car2 from '../assets/car2.png';
import car3 from '../assets/car3.png';
import Navbar from './NavBar';
import UserCommitteePage from './UserCommitteePage';
import axios from 'axios';
import mention from '../assets/Slide 16_9 - 9.png'

const HomePage = () => {
    


    return (
        <div className="home-container">
            <Navbar />
            
            {/* First Section */}
           

            <div className='content'>
            <div id="homeCarousel" className="carousel slide" data-ride="carousel">
            {/* Remove "bs-" prefix */}
    <div className="carousel-inner"> {/* Update class name */}
      {/* First carousel item: box1log */}
      <div className="carousel-item active">
        <div className="content">
          <div className="box1log">
            <h1 id="h1log">Computer Society of India</h1>
            <h1 id="h1log1">KKWIEER Student Chapter</h1>
            <p className="p1log">
              Prof. Dr. S.S. Sane receiving “Best Student Branch” Award on 51th Annual Convention at Coimbatore.<br />
              The seed for the Computer Society of India (CSI) was first sown in the year 1965 with a handful of IT<br />
              enthusiasts who were a computer user group and felt the need to organize their activities. They<br />
              also wanted to share their knowledge and exchange ideas on what they felt were a fast emerging<br />
              sector. Today the CSI takes pride in being the largest and most professionally managed<br />
              association of and for IT professionals in India.
            </p>
            <div className='mockk'>
            <div className="box1-container">
              <div className="group11">
                <p className="con">Contributors</p>
                <p className="cha">Chapters</p>
              </div>
              <div className="group12">
                <p className="contri">500+</p>
                <p className="chap">72</p>
              </div>
            </div>
            <div className='mockk2'>
            <button
              type="button"
              className="btn1log"
              onClick={() => window.open('https://www.kkwagh.edu.in/engineering/csi', '_blank', 'noopener,noreferrer')}
            >
              <img src={arr} width={40} height={40} alt="Link Icon" />
            </button>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second carousel item: right-homebox */}
      <div className="carousel-item">
        <div className="right-homebox">
          <div className="box2log">
            <h1 className="h2log">What We Do?</h1>
            <p className="p2log">
              Having 488 student branches and rooted firmly at 73 different locations, CSI has plans of opening more chapters & activity centers in smaller towns of the country.
            </p>
            <a href='https://csiindia.org/#' target='_blank' rel="noopener noreferrer">
              <button className="btn2log"><img src={arr} width={40} height={40} alt="Link Icon" /></button>
            </a>
          </div>

          <div className="box3log">
            <h1 className="h2log">CSI Awards</h1>
            <p className="p2log">
              We Recognize Innovations And Indigenous Developments In The Field Of Information Technology In India. CSI Awards Are Instituted To Acknowledge
            </p>
            <a href='https://csiindia.org/home/awards' target='_blank' rel="noopener noreferrer">
              <button className="btn2log"><img src={arr} width={40} height={40} alt="Link Icon" /></button>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Carousel controls */}
    <a className="carousel-control-prev" href="#homeCarousel" role="button" data-slide="prev"> {/* Change from button to anchor */}
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span> {/* Change from "visually-hidden" to "sr-only" */}
    </a>
    <a className="carousel-control-next" href="#homeCarousel" role="button" data-slide="next"> {/* Change from button to anchor */}
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span> {/* Change from "visually-hidden" to "sr-only" */}
    </a>
  </div>
</div>


            {/* Second Section - User Committee Page */}
            <div className='committee'>
                <UserCommitteePage />
            </div>

            {/* Third Section - Event Information */}
             <div className='mentininfo'>
                <img src={mention} id='ment' alt="Logo" style={{  
                width: '100%',  
                height: '100vh',  
                objectFit: 'cover',  
                zIndex: 1  
             }} />  
             </div>

             <div id='event12info'>

<div class="Evegallerywrapper">


<div id='infogallery'>
    <div id="carouselExampleAutoplayinginfo" className="carousel slide" data-ride="carousel" data-interval="2500">
                    <div className="carousel-innerinfo">
                        <div className="carousel-item active">
                            <img src={car1} className="d-block w-100" alt="Slide 1" />
                        </div>
                        <div className="carousel-item">
                            <img src={car2} className="d-block w-100" alt="Slide 2" />
                        </div>
                        <div className="carousel-item">
                            <img src={car3} className="d-block w-100" alt="Slide 3" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleAutoplayinginfo" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleAutoplayinginfo" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
    </div>

    <div class="info-section">
      <h1 id='eventinfo'>Your Vision, <br/>Our Expertise!</h1>
      <p id='infoeve'>
        Our club organizes a variety of events, such as seminars, workshops, hackathons, and tech talks, aimed at fostering creativity and collaboration in the tech community. These events allow members to explore new technologies, sharpen their skills, and connect with fellow enthusiasts. Check out the gallery below for highlights of our past events and see how we bring the tech community together!
      </p>
    </div>

  <script src="script.js"></script>

    </div>
</div>
<footer id="footer" className="bg-[#EAF1FB] space-between py-6  mt-8">
      <div className="container mx-auto  px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center flex-wrap">
          {/* About Section */}
          <div className="w-full md:w-1/3 text-gray-800 mb-4 md:mb-0">
            <h3 className="font-bold text-2xl mb-3 transition-transform transform hover:scale-105">About CSI<br/> KKWIEER Student Chapter</h3>
            <p className="text-sm text-start Stransition-colors duration-300 hover:text-gray-700">
            We are the Student Branch of the Computer Society of India (CSI) at K.K Wagh Institute of Engineering Education and Research, Nashik.

We organize exciting and fun events for all you computer enthusiasts which enables networking with like-minded people along with upskilling yourselves.

Our focus is to build a healthy community of highly motivated individuals who want to build their careers in computer science and it's related fields.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-1/3 text-gray-800 text-center mb-4 md:mb-0">
  <h3 className="font-bold text-2xl mb-3 transition-transform transform hover:scale-105">Follow Us</h3>
  <ul className="space-y-2 text-start">
              <li>
                <a href="https://www.instagram.com/csi_kkwieer?igsh=Z29ubmR2MjNtM2Vk" className="hover:text-gray-600 transition duration-300 text-lg hover:underline">Instagram</a>
              </li>
              <li>
                <a href="https://www.facebook.com/engg.kkwagh?mibextid=ZbWKwL" className="hover:text-gray-600 transition duration-300 text-lg hover:underline">Facebook</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/csi-kkwieer/?originalSubdomain=in" className="hover:text-gray-600 transition duration-300 text-lg hover:underline">LinkedIn</a>
              </li>
              
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="w-full md:w-1/3 text-gray-800 text-right">
  <h3 className="font-bold text-2xl mb-3 transition-transform transform hover:scale-105">Developers</h3>
  <div className="flex flex-col items-start space-y-4"> 
              <a href="https://www.linkedin.com/in/prathmesh-ranade-13a42b265?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-800 hover:text-gray-600 transition duration-300 transform hover:scale-125">
                <i className="fab fa-facebook-f">Prathmesh Ranade</i>
              </a>
              <a href="https://www.linkedin.com/in/shantanu-patil-83b3ab290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-800 hover:text-gray-600 transition duration-300 transform hover:scale-125">
                <i className="fab fa-twitter">Shantanu Patil</i>
              </a>
              <a href="https://www.linkedin.com/in/ayush-lad-163a05295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-800 hover:text-gray-600 transition duration-300 transform hover:scale-125">
                <i className="fab fa-linkedin-in">Ayush Lad</i>
              </a>
              <a href="https://www.linkedin.com/in/ankit-khandelwal-002474295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-800 hover:text-gray-600 transition duration-300 transform hover:scale-125">
                <i className="fab fa-instagram">Ankit Khandelwal</i>
              </a>
              <a href="https://www.linkedin.com/in/chintan-mehta-687402281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-800 hover:text-gray-600 transition duration-300 transform hover:scale-125">
                <i className="fab fa-instagram">Chintan Mehta</i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        
      </div>
    </footer>    
</div>
    );
};

export default HomePage;
