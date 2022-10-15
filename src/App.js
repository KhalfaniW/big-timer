import React, {useState, useEffect} from "react";
import {useAnimateProps} from "react-animate-props";
import ReactDOM from "react-dom";
import {TextField} from "@mui/material";
import {Line, Circle} from "rc-progress";
import Tween, {Easing} from "tweenkle";

import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.css";
import "./App.css";

import TimerUI from "./TimerUI";
import calculateSlowdown from "./calculate-slowdown";
import TimerSpeedSelector from "./TimerSpeedSelector";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const pluralize = (count, singularWord, pluralWord) => {
  return count === 1 ? singularWord : pluralWord;
};
export default function App() {
  const [timeSlowdownLevel, setTimeSlowdownLevel] = useState(-1);
  const [speedFactor, setSpeedFactor] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    setSpeedFactor(calculateSlowdown(timeSlowdownLevel));
  }, [timeSlowdownLevel]);

  const initialMinutes = Math.floor(timerSeconds / 60);
  const initialSeconds = timerSeconds % 60;

  const timerTitle =
    initialMinutes > 0
      ? `${initialMinutes} minute timer`
      : `${initialSeconds} second timer`;
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="content   bg-gray-800">
        {timerRunning && <h1>{timerTitle}</h1>}
        <TimerSpeedSelector onSpeedChange={setSpeedFactor} />
        <TimerUI
          onTimerStart={(initialTime) => {
            setTimerRunning(true);
            setTimerSeconds(Math.floor(initialTime / 1000));
          }}
          speedFactor={speedFactor}
        />
      </div>
    </ThemeProvider>
  );
}
