import React, {useState, useEffect} from "react";

import "./index.css";
import VariableSpeedTimer from "./VariableSpeedTimer";

import {useAnimateProps} from "react-animate-props";
import ReactDOM from "react-dom";
import {TextField} from "@mui/material";
import {Line, Circle} from "rc-progress";
import Tween, {Easing} from "tweenkle";

function MiniApp() {
  const [initialMinutes, setInitialMinutes] = useState(2);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [timeSlowdownLevel, setTimeSlowdownLevel] = useState(-1);
  const [speedFactor, setTimeSpeedFactor] = useState(0);

  useEffect(() => {
    setTimeSpeedFactor(calculateTimeSpeedFactor(timeSlowdownLevel));
  }, [timeSlowdownLevel]);

  const totalInitalSeconds = initialMinutes * 60 + initialSeconds;
  const keyForResetingTimer = totalInitalSeconds;
  return (
    <>
      <TextField
        id="standard-number"
        label="Minutes"
        value={initialMinutes}
        onChange={(e) => setInitialMinutes(Number(e.target.value))}
        sx={{width: 50}}
        inputProps={{maxLength: 2}}
        type="number"
        variant="standard"
      />
      <TextField
        id="standard-number"
        label="Seconds"
        value={initialSeconds}
        onChange={(e) => setInitialSeconds(Number(e.target.value))}
        sx={{width: 50}}
        inputProps={{maxLength: 2}}
        type="number"
        variant="standard"
      />
      <TextField
        id="standard-number"
        label="Factor Level"
        type="number"
        value={timeSlowdownLevel}
        onChange={(e) => setTimeSlowdownLevel(Number(e.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
      {speedFactor && totalInitalSeconds ? (
        <div key={keyForResetingTimer}>
          <VariableSpeedTimer
            timeSpeedFactor={speedFactor}
            initialTime={totalInitalSeconds}
          />
        </div>
      ) : null}
    </>
  );
}
ReactDOM.render(<MiniApp />, document.getElementById("root"));

function calculateTimeSpeedFactor(timeSlowdownLevel) {
  if (Math.random() < 0.1) {
    return 1;
  }
  const getRandomNumInclusive = (min, max) =>
    Math.random() * (max - min + 1) + min;
  const timeSpeedDict = {
      [-1]: 1,
    0: 1 / getRandomNumInclusive(1, 3),
    1: 1 / getRandomNumInclusive(2.3, 5),
    2: 1 / getRandomNumInclusive(2, 5),
    3: 1 / getRandomNumInclusive(5, 8),
    // 5: 1/5,
  };

  const speedFactor = timeSpeedDict[timeSlowdownLevel];

  if (typeof speedFactor === undefined)
    throw new Error("time speed level undefined");

  return speedFactor;
}
