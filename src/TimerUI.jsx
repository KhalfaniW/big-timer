import React, {useState, useEffect} from "react";

import {Line, Circle} from "rc-progress";
import {css} from "@emotion/css";

import VariableSpeedTimer from "./VariableSpeedTimer";
import calculateSlowdown from "./calculate-slowdown";
import TimerSpeedSelector from "./TimerSpeedSelector";

export default function CompleteTimer({speedFactor, onTimerStart}) {
  const [initialMinutes, setInitialMinutes] = useState(2);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [stopped, setStopped] = useState(false);

  const [started, setStarted] = useState(false);

  const [completed, setCompleted] = useState(true);

  const [timeRemaining, setTimeRemaining] = useState(0);

  const keyForResetingTimer = initialMinutes + initialSeconds + stopped;

  const miniProgressBarIntervalSeconds = 30;
    const nextProgresssSeconds = ((timeRemaining/1000) % miniProgressBarIntervalSeconds)

  const miniProgressBarPercent =
        (nextProgresssSeconds/  miniProgressBarIntervalSeconds)*100
  if (window.shouldDebug) debugger;

  return (
    <>
      {/*why: might want to give up in the middle so use line as a checkpoint */}
      <Line
        key={timeRemaining}
        strokeWidth={1}
        strokeColor="blue"
        percent={miniProgressBarPercent}
        initialTimeUntilEnd={timeRemaining}
      />
      <div className="complete-timer">
        <div key={keyForResetingTimer}>
          <VariableSpeedTimer
            speedFactor={speedFactor}
            onTimeChange={setTimeRemaining}
            {...{
              started,
              initialSeconds,
              setInitialSeconds,
              initialMinutes,
              setInitialMinutes,
            }}
          />
        </div>

        <div className="controls">
          {!started ? (
            <button
              className={
                "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }
              onClick={() => {
                setStarted(true);
                onTimerStart((initialMinutes * 60 + initialSeconds) * 1000);
                setStopped(false);
              }}
            >
              Start
            </button>
          ) : (
            <button
              container
              onClick={() => {
                setStarted(false);
              }}
            >
              Pause
            </button>
          )}
          {started && (
            <button
              onClick={() => {
                setStarted(false);
                // reset timer
                setStopped(true);
              }}
            >
              Stop
            </button>
          )}
        </div>
      </div>
    </>
  );
}
