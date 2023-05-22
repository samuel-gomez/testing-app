import React, { useState, useEffect } from "react";
import "./Discover.css";

import Person from "../components/Person";

const Fab = ({ kind, large, onClick }) => (
  <button
    onClick={onClick}
    className={`btn-default btn-floating waves-effect waves-light ${
      large && "btn-large"
    }`}
  >
    <i className="material-icons">{kind}</i>
  </button>
);

const succ = (current, min, max) => (current === max ? min : current + 1);
const pred = (current, min, max) => (current === min ? max : current - 1);

const Discover = ({ people }) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setPlay] = useState(false);

  const showNextPerson = () => setCurrent(succ(current, 0, people.length - 1));

  const showPrevPerson = () => setCurrent(pred(current, 0, people.length - 1));

  const play = () => {
    setPlay(true);
    showNextPerson();
  };

  const pause = () => setPlay(false);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrent((current + 1) % people.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [current, people.length, isPlaying]);

  return (
    <div className="Discover">
      <div className="card-container">
        <Person person={people[current]} />
      </div>
      <div className="fab-container">
        <Fab kind="skip_previous" onClick={showPrevPerson} />
        {isPlaying ? (
          <Fab kind="pause" large onClick={pause} />
        ) : (
          <Fab kind="play_arrow" large onClick={play} />
        )}
        <Fab kind="skip_next" onClick={showNextPerson} />
      </div>
    </div>
  );
};

export default Discover;
