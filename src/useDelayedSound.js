import React, {useEffect, useState} from "react";

import useSound from "use-sound";
// import boopSfx from "url:./public/sound.mp3";

const useDelayedSound = () => {
  const [play, {stop}] = useSound("boopSfx");

  const playSound = () => {
    play();
    setTimeout(stop, 1001);
  };
  const [timerId, setTimerId] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const seconds = 1000; // * (eval(valToEval) || 1);
  // useTimeout(
  const playAfterTime = (timeToWait) => {
    const newId = setTimeout(() => {
      playSound();
    }, timeToWait);
    setTimerId(newId);
  };
  //   isTimerRunning ? 0 : null,
  // );

  return {playAfterTime, stop, cancel: () => {}};
};

export default useDelayedSound;
