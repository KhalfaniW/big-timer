import {useEffect, useState} from "react";
import {useInterval} from "ahooks";

import Tween, {Easing} from "tweenkle";

export default function useVariableTimeTimer({
  speedFactor,
  started,
  initialTime,
}) {
  const [currentSpeedFactor, setCurrentSpeedFactor] = useState(speedFactor);
  const [currentInterval, setCurrentInterval] = useState(0);

  const [lastTick, setLastTick] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  const [tween, setTween] = useState(null);
  const [realTimeElapsed, setRealTimeElapsed] = useState(0);

  const paused = Number(currentInterval) === 0;

  const newInterval = 1;

  useEffect(() => {
    if (!paused) setLastTick(Date.now());
  }, [paused]);

  useEffect(() => {
    if (started) setLastTick(Date.now());
  }, [started]);

  //NOTE browsers set intervals to only run for every 1 second in when the page is in the background
  const timerInterval =
    document.visibilityState === "visible"
      ? currentInterval / currentSpeedFactor
      : 1000;

  useInterval(
    () => {
      const ticksToSimulate = Math.floor(
        //TODO test edge cases of rounding
        (Date.now() - lastTick) / (currentInterval / currentSpeedFactor),
      );
      setLastTick(Date.now());

      const curentTime = timeRemaining;
      const newTime = Math.max(
        curentTime - currentInterval * ticksToSimulate,
        0,
      );
      const tween = new Tween({
        start: 0,
        end: 100,
        duration: currentInterval / currentSpeedFactor,
        ease: Easing.Linear,
      });

      setTimeRemaining(newTime);
    },
    !paused && timeRemaining > 0 ? timerInterval : null,
  );

  useInterval(
    () => {
      setRealTimeElapsed((prevTime) => prevTime + 1000);
    },
    started && !paused ? 1000 : null,
  );

  const start = () => {
    setCurrentInterval(10);
  };

  const pauseTimer = () => {
    setCurrentInterval(null);
  };

  useEffect(() => {
    if (started) start();
    else pauseTimer();
  }, [started]);

  useEffect(() => {
    setCurrentSpeedFactor(speedFactor);
  }, [speedFactor]);

  return {
    start,
    pause: pauseTimer,
    setSpeedFactor: setCurrentSpeedFactor,

    currentSpeedFactor,
    timeRemaining,
    realTimeElapsed: 0,
  };
}
// useEffect(() => {
//   setTimeRemaining(
//     (prevEstimatedTime) => prevEstimatedTime * speedFactor,
//   );
// }, [speedFactor]);
