import React, {useEffect, useState} from "react";

import {TextField} from "@mui/material";
import {css} from "@emotion/css";
import {Line, Circle} from "rc-progress";
import {useTimeout} from "ahooks";

import "./index.css";

import useDelayedSound from "../useDelayedSound";
import useVariableSpeedTimer from "../useVariableSpeedTimer";

import {playRemoteSound} from "../sound";

export default function VariableSpeedTimer({
  speedFactor,
    onTimeChange,
    //TODO simplify props replace with initial time
  initialSeconds = 0,
  setInitialSeconds,
  initialMinutes = 0,
  setInitialMinutes,

  started,
  hoverTimeout = 3000,

}) {
  const [lastRun, setLastRun] = useState("");

  const initialTime = (initialMinutes * 60 + initialSeconds) * 1000;

  const {
    start,
    pause,
    currentSpeedFactor,
    running,
    currentInterval,
    // remove and replace with prop change
    setSpeedFactor,
    timeRemaining,
    realTimeElapsed,
  } = useVariableSpeedTimer({
    speedFactor,
    started,
    initialTime: (initialMinutes * 60 + initialSeconds) * 1000,
  });

  const [hovering, setHovering] = useState(false);



  useEffect(() => {
    const newSpeedFactor = hovering ? 1 : speedFactor;
    setSpeedFactor(newSpeedFactor);
  }, [hovering]);

  useTimeout(() => setHovering(false), hovering ? hoverTimeout : null);

  useEffect(() => {
      onTimeChange(timeRemaining)
    if (timeRemaining === 0)
      playRemoteSound("https://m.khal.me/files/sound/2ding.mp3");
  }, [timeRemaining]);

    const seconds = Math.floor(timeRemaining / 1000);
  const updateMSintreval = 151;
  const iniitalTotalSeconds = initialTime / currentSpeedFactor / 1000;
  const currentProgress = seconds / currentSpeedFactor / iniitalTotalSeconds;

  const paused = Boolean(currentInterval);
  // if(!window.stopdebug)   debugger;

  return (
    <div className="stack-container">
      {started && (
        <div
          className={"timer-hover-handler"}
          data-testid="timer-hover-handler"
          onMouseLeave={() => {
            setHovering(false);
          }}
          onMouseOver={() => {
            setHovering(true);
          }}
        />
      )}

      <Circle
        className={css`
          opacity: ${hovering ? "0%" : "100%"};
        `}
        key={timeRemaining}
        strokeWidth={1}
        strokeColor="brown"
        percent={(timeRemaining / initialTime) * 100}
        paused={paused}
        initialTimeUntilEnd={timeRemaining}
      />

      {started ? (
        <div
          className={
            css`
              ${!hovering && "display: none"};
            ` + " timer"
          }
          data-testid="timer"
        >
          {Math.floor(seconds / 60)}:
          {seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60}
        </div>
      ) : (
        <div className="inputs">
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
        </div>
      )}
    </div>
  );
}
