import { StopIcon, StartIcon } from "./icons";
import React from "react";
import { formatTime } from "../logic/functions";
import "./StopWatch.scss";

type StopwatchProps = {
  onPause: () => void;
  onStart: () => void;
  time: number;
  isActive: boolean;
};

const Stopwatch: React.FC<StopwatchProps> = ({
  onPause,
  onStart,
  time,
  isActive,
}) => (
  <div className="timer">
    {formatTime(time)}
    {isActive ? (
      <button className="stopBtn" onClick={onPause}>
        <StopIcon />
      </button>
    ) : (
      <button className="playBtn" onClick={onStart}>
        <StartIcon />
      </button>
    )}
  </div>
);

export default Stopwatch;
