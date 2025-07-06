import React, { useEffect, useMemo, useState } from "react";
import './Latest.css';
import {ey} from '../assets/eyantran.jpg'

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const CountDown = ({ deadline = new Date().toString() }) => {
  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000
    );

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  return (
    <div className="timer">
      {Object.entries({
        Days: time / DAY,
        Hours: (time / HOUR) % 24,
        Minutes: (time / MINUTE) % 60,
        Seconds: (time / SECOND) % 60,
      }).map(([label, value]) => (
        <div key={label} className="">
          <div className="box">
            <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
            <span className="text">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const Latest = () => {
 
   

    return (
      <div>
        <div className='latest-banner'>
            <img src="./images/eyantran.jpg" alt="" />
        </div>

        <section className="max-w-screen overflow-x-hidden">
      <div className="container">
        <div
          className="row text-start text-md-center"
          data-aos="fade-up"
          data-aos-delay="70"
        >
          <div className="theme__section">
            <h1>
              HELLO <span className="text-white">THERE</span>
            </h1>
            <p style={{ color: "#ffffffcc" }}>
              Are you ready to unravel the unexplored?
            </p>
            <CountDown deadline="2025-01-26T00:00:00Z" />
            <p className="p-md-5 p-0">
              To unlock the untapped opportunities and experience an
              unrestricted rush? As the new level enters play, there is a
              dynamic, fiery, and innovative energy in the air encouraging us
              to see beyond what is to what it may be! &nbsp;
              <span style={{ color: "red", fontWeight: "bold" }}>TEDx </span>
              TEDx KKWIEER is here to transport you into a thrilling MOSAIC OF
              MINDS and open your eyes to the possibilities of anything we can
              imagine, but outside the box!
            </p>
          </div>
        </div>
      </div>
    </section>
      </div>
      
    );
};

export default Latest;
