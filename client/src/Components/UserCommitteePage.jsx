import React, { useState, useEffect } from "react";
import "./UserCommitteePage.css"; // Include your own CSS for additional styling if needed.
import Navbar from './NavBar';

const committeeMembers = [
  { image: "/images/img1.jpg" },
  { image: "/images/img2.jpg" },
  { image: "/images/img3.jpg" },
  { image: "/images/img4.jpg" },
  { image: "/images/img5.png" },
  { image: "/images/img6.png" },
  { image: "/images/img7.png" },
  { image: "/images/img8.png" },
  { image: "/images/img9.png" },
  { image: "/images/img10.png" },
  { image: "/images/img11.png" },
  { image: "/images/img12.png" },
  { image: "/images/img13.png" },
  { image: "/images/img14.png" },
  { image: "/images/img15.png" },
  { image: "/images/img16.png" },
  { image: "/images/img17.png" },
  { image: "/images/img18.png" },
  { image: "/images/img19.png" },
  { image: "/images/img20.png" },
  { image: "/images/img21.png" },
  { image: "/images/img22.png" },
  { image: "/images/img23.png" },
  { image: "/images/img24.png" },
];

const UserCommitteePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen width is smaller than 768px to set isMobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the state on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ marginTop: "5rem" }}>
      <h1 className="committee-heading1">Our Committee for AY 2024-2025!</h1>

      <div className="sexy-container">
        {/* Carousel Container */}
        <div
          id="committeeCarousel"
          className="carousel slide"
          data-ride="carousel"
          data-interval="3000"
        >
          <div className="carousel-inner">
            {committeeMembers.map((member, index) => {
              // Create a new slide for each member if it's a mobile device
              if (isMobile) {
                return (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={`slide-${index}`}
                  >
                    <div className="row justify-content-center">
                      <div className="col-12">
                        <div className="card text-center border m-2" style={{ borderRadius: '25px' }}>
                          <img
                            src={member.image}
                            className="card-img-top"
                            alt={`Member ${index + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // For non-mobile devices, group every 4 members into one slide
              if (index % 4 === 0) {
                return (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={`slide-${index}`}
                  >
                    <div className="row">
                      {committeeMembers
                        .slice(index, index + 4)
                        .map((memberInSlide, i) => (
                          <div className="col-md-3" key={`member-${index + i}`}>
                            <div className="card text-center border m-2" style={{ borderRadius: '25px' }}>
                              <img
                                src={memberInSlide.image}
                                className="card-img-top"
                                alt={`Member ${index + i + 1}`}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              }
              return null; // Ignore members that aren't the start of a new slide
            })}
          </div>

          {/* Carousel Controls */}
          <a
            className="carousel-control-prev"
            href="#committeeCarousel"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#committeeCarousel"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCommitteePage;
