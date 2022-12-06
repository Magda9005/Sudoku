import { PlayIcon } from "./icons";
import React from "react";
import "./PauseModal.scss";

type PauseModalProps = {
  onStart: () => void;
};

const PauseModal: React.FC<PauseModalProps> = ({ onStart }) => (
  <div className="pauseModal">
    <button onClick={onStart} className="playButton">
      <PlayIcon />
    </button>
  </div>
);
export default PauseModal;
