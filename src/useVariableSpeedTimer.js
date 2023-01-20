import {useEffect, useState, useRef} from "react";
import {useInterval} from "ahooks";
import _ from "lodash";

import {transformation} from "transform-js";

export default function useVariableTimeTimer({
  speedFactor,
  onTimerEnd,
  initialTime,
}) {
  const [stopped, setStopped] = useState(false);
  const [started, setStarted] = useState(false);

  const [currentSpeedFactor, setCurrentSpeedFactor] = useState(speedFactor);

  const [paused, setPaused] = useState(false);
  const [lastTick, setLastTick] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  const tween = useRef(null);
  const [realTimeElapsed, setRealTimeElapsed] = useState(0);

  useEffect(() => {
    setCurrentSpeedFactor(speedFactor);
  }, [speedFactor]);

  const start = () => {
    setStarted(true);
    tween.current.start();

    if (started) setLastTick(Date.now());
  };

  const stopTimer = () => {
    window.tween = tween.current;
    setStopped(true);
    setStarted(false);
    console.log("STOP", tween.current);
    tween.current?.stop();
    init();
  };

  const pause = () => {
    //
    window.tween = tween.current;
    tween.current?.pause();
    // if (paused) setLastTick(Date.now());
    // else stopTimer();
  };

  const init = () => {
    // if(currentSpeedFactor == 0) debugger;
    tween.current?.stop();
    tween.current = transformation(
      initialTime,
      0,
      (value) => {
        // ({start, end, duration, progress, ease, value}) => {
        // if (paused || timeRemaining === 0) return;
        console.log({value});
        if (value === 0) {
          console.log(started, "ENDED");
          // onTimerEnd();
        }
        // Manipulate element or variable based on tween value

        setTimeRemaining(value);
        // }
      },
      {duration: initialTime * (1 / currentSpeedFactor)},
    );

    function update(newValue) {
      // ...
      console.log(newValue);
    }

    // t.start();

    // tween.current = timerTween;
    // console.log("tween made", tween.current, {
    //   start: initialTime,
    //   end: 0,
    //   duration: initialTime * (1 / currentSpeedFactor),
    //   initialTime,
    //   paused,
    //   currentSpeedFactor,
    //   tween,
    //   ease: Easing.Linear,
    // });

    // timerTween.on("complete", () => {});
    // timerTween.on("tick");
  };

  //NOTE browsers set intervals to only run for every 1 second in when the page is in the background

  return {
    start,
    init,
    started,
    stopped,
    paused,
    togglePause: () => {
      if (paused) {
        tween.current?.resume();
        setPaused(false);
      } else {
        tween.current?.pause();
        setPaused(true);
      }
    },
    setSpeedFactor: setCurrentSpeedFactor,
    stopTimer,
    currentSpeedFactor,
    timeRemaining,
    realTimeElapsed: 0,
  };
}
