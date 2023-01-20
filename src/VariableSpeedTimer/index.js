import React, {useEffect, useState} from "react";

import {Circle} from "rc-progress";

import "./index.css";

function getTimerDisplay({timeRemaining, shouldShowMSForMinutes}) {
  const totalMilliseconds = timeRemaining;
  const {minutes, seconds, milliseconds} = {
    minutes: Math.trunc(totalMilliseconds / 60_000) % 60,
    seconds: Math.trunc(totalMilliseconds / 1000) % 60,
    milliseconds: Math.trunc(totalMilliseconds) % 1000,
  };

  const secondsDisplay = seconds.toString().padStart(2, "0");
  const millisecondsDisplay = milliseconds.toString().padStart(3, "0");

  if (minutes === 0) return `0:${secondsDisplay}.${millisecondsDisplay}`;

  if (shouldShowMSForMinutes)
    return `${minutes}:${secondsDisplay}.${millisecondsDisplay}`;
  else return `${minutes}:${secondsDisplay}`;
}

export default function VariableSpeedTimer({
  timeRemaining,
  totalTime,
  initialMinutes,
  onMinutesChange,
  initialSeconds,
  onSecondsChange,
  setInitialSeconds,
  //TODO simplify props replace with initial time
  started,
}) {
  const [hovering, setHovering] = useState(false);

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
        key={timeRemaining }
        strokeWidth={1}
        strokeColor="blue"
        percent={(timeRemaining / totalTime) * 100}
      />

      {started ? (
        <div className={"timer"} data-testid="timer">
          {getTimerDisplay({timeRemaining, shouldShowMSForMinutes: hovering})}
        </div>
      ) : (
        <div className="inputs">
          <label>
            Minutes
            <input
              type="number"
              maxLength="2"
              value={initialMinutes}
              onChange={(e) => onMinutesChange(Number(e.target.value))}
            />
          </label>
          <label>
            Seconds
            <input
              type="number"
              maxLength="2"
              value={initialSeconds}
              onChange={(e) => onSecondsChange(Number(e.target.value))}
            />
          </label>
        </div>
      )}
    </div>
  );
}
