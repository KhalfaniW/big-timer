
import {useInterval} from "ahooks";
// import {Slider} from "@mui/material";

import {useEffect, useState} from "react";
import useDelayedSound from "./useDelayedSound";

export default function DilatedCountdown() {
  const [valToEval, setValToEval] = useState("");
  const [lastRun, setLastRun] = useState("");

  const [currentInterval, setCurrentInterval] = useState(0);
  const secondsToTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${
      seconds % 60 === 0 ? "00" : (seconds % 60).toFixed(4)
    }`;
  const [seconds, setSeconds] = useState(0);
  const nDigitNum = (n) => Math.floor((Math.random() * Math.pow(10, n)) % 60);
  const [time, setTime] = useState(
    new Date(`7/10/2013 9:${nDigitNum(2)}:${nDigitNum(2)}`),
  );
  // new Date('7/10/2013 20:12:34')

  /* add time checkpoints
  work unit x time then extend it
  */
  useEffect(() => {
    setLastRun(Math.random());
  }, [currentInterval]);

  const updateMSintreval = 151;

  useInterval(
    () => {
      console.log(currentInterval);
      setSeconds((s) => s + updateMSintreval / 1000);
      setTime((time) => new Date(time.getTime() + updateMSintreval));
    },
    currentInterval ? (eval(currentInterval) || 1) * updateMSintreval : null,
  );

  const BoopButton = () => {
    const {playAfterTime} = useDelayedSound();
      console.log(8)
    return (
      <button
        onClick={() => {
            console.log(99999)
        }}
      >
        Set timer3
      </button>
    );
  };

  return (
    <div className="App">
      <textarea
        onDoubleClick={() => {
          setCurrentInterval(valToEval);
        }}
        onChange={(e) => setValToEval(e.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            setCurrentInterval(valToEval);
          }
        }}
        value={valToEval}
      />
      <h3 className="time-display">{secondsToTime(seconds)}</h3>
      {time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}
      <BoopButton />
      [remember to plus slow down]
      <br />
      {lastRun}

    </div>
  );
}
