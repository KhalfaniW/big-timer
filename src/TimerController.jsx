import React, {useState, useEffect} from "react";

import {Line, Circle} from "rc-progress";
import {css} from "@emotion/css";

import VariableSpeedTimer from "./VariableSpeedTimer";
import calculateSlowdown from "./calculate-slowdown";
import TimerSpeedSelector from "./TimerSpeedSelector";
import useVariableSpeedTimer from "./useVariableSpeedTimer";
import {playRemoteSound} from "./sound";

export default function CompleteTimer({
  speedFactor,
  onTimerStop,
  onTimerStart,
}) {
  const [initialMinutes, setInitialMinutes] = useState(2);
  const [initialSeconds, setInitialSeconds] = useState(0);

  const {
    start,
    started,
    paused,
    stopped,
    togglePause,
    currentSpeedFactor,

    stopTimer,
    currentInterval,
    // remove and replace with prop change
    setSpeedFactor,
    timeRemaining,
    init,
    realTimeElapsed,
  } = useVariableSpeedTimer({
    speedFactor,
    onTimerEnd: () => {
      playRemoteSound("https://m.khal.me/files/sound/2ding.mp3");
    },
    initialTime: (initialMinutes * 60 + initialSeconds) * 1000,
  });

  const running = started;

  const [hacks, setFn] = useState(null);

  const [completed, setCompleted] = useState(true);

  const keyForResetingTimer = initialMinutes + initialSeconds + stopped;

  const miniProgressBarIntervalSeconds = 30;
    console.log({initialSeconds,initialMinutes})
  return (
    <>
      <div key={keyForResetingTimer}>
        <div className="complete-timer">
          <VariableSpeedTimer
            speedFactor={speedFactor}
            started={started}
            timeRemaining={timeRemaining}
            initialMinutes={initialMinutes}
            initialSeconds={initialSeconds}
            onSecondsChange={setInitialSeconds}
            onMinutesChange={setInitialMinutes}
            totalTime={(initialMinutes * 60 + initialSeconds) * 1000}
          />

          <div className="controls">
            {!running && (
              <button
                className={
                  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                }
                onClick={() => {
                  init();
                  start();
                  onTimerStart((initialMinutes * 60 + initialSeconds) * 1000);
                }}
              >
                Start
              </button>
            )}

            {running && (
              <button
                onClick={() => {
                  togglePause();
                }}
              >
                {paused ? "Resume" : "Pause"}
              </button>
            )}
            {started && (
              <button
                onClick={() => {
                  stopTimer();
                  onTimerStop();
                }}
              >
                Stop
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
