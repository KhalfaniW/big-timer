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

  const [timeRemaining, setEstimatedTimeRemaining] = useState(initialTime);

  const [tween, setTween] = useState(null);
  const [realTimeElapsed, setRealTimeElapsed] = useState(0);

  const paused = currentInterval == 0;

  useInterval(
    () => {
      setEstimatedTimeRemaining((prevTime) =>
        Math.ceil(prevTime - currentInterval, 0),
      );
    },
    !paused && timeRemaining > 0 ? currentInterval / currentSpeedFactor : null,
  );

  useInterval(
    () => {
      setRealTimeElapsed((prevTime) => prevTime + 500);
    },
    !paused ? 500 : null,
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
        setCurrentSpeedFactor(speedFactor)
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
//   setEstimatedTimeRemaining(
//     (prevEstimatedTime) => prevEstimatedTime * speedFactor,
//   );
// }, [speedFactor]);
