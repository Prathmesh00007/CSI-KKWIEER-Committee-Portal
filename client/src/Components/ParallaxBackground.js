import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import './ParallaxBackground.css';

const ParallaxBackground = () => {
    return (
        <ParallaxProvider>
            <div className="parallax-section">
                <Parallax className="parallax-layer" y={[-50, 50]} tagOuter="figure">
                    <div className="parallax-content">
                        <h1>Welcome to Our Event</h1>
                        <p>Experience the future of technology!</p>
                    </div>
                </Parallax>
            </div>
        </ParallaxProvider>
    );
};

export default ParallaxBackground;
