import React, {useState, useEffect} from "react";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {css} from "@emotion/css";

// import "./index.css";
import "./App.css";

import TimerController from "./TimerController";
import TimerSpeedSelector from "./TimerSpeedSelector";

import ImageDiff from "./ImageDiff";
import html2canvas from "html2canvas";
window.html2canvas = html2canvas;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const pluralize = (count, singularWord, pluralWord) => {
    return count === 1 ? singularWord : pluralWord;
  };

  const [speedFactor, setSpeedFactor] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const [timerRunning, setTimerRunning] = useState(false);

  const initialMinutes = Math.floor(timerSeconds / 60);
  const initialSeconds = timerSeconds % 60;

  return (
      <div
        className={`content   bg-gray-800 ${css`
          height: 100vh;
        `}`}
      >
        {timerRunning && (
          <h1
            className={`${css`
              margin-top: 53px;
              font-size: 3.3rem;
              line-height: 2.5rem;
            `}`}
          >
            {getTitle(initialMinutes, initialSeconds)}
          </h1>
        )}
        <button
          className={css`
            height: 100vh;
          `}
        >
          Show Timer Speed
        </button>

        <TimerSpeedSelector
          showTimeControls={!timerRunning}
          onSpeedChange={(newSpeedFactor) => {
            setSpeedFactor(newSpeedFactor);
          }}
        />
        <TimerController
          onTimerStart={(initialTime) => {
            setTimerRunning(true);
            setTimerSeconds(Math.floor(initialTime / 1000));
          }}
          onTimerStop={() => {
            setTimerRunning(false);
          }}
          speedFactor={speedFactor}
        />
      </div>
  );
}

function getTitle(minutes, seconds) {
  if (minutes > 0 && seconds > 0) return `${minutes} min ${seconds}s timer`;

  if (seconds > 0) return `${seconds} sec timer`;
  if (minutes > 0) return `${minutes} min timer`;

  return "Timer";
}
