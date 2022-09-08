import React, {useEffect, useState} from "react";
export default function App() {
  const [valToEval, setValToEval] = useState("");
  const [currentInterval, setCurrentInterval] = useState(0);

  const {start, stop, timeLeft, setTime} = useVariableTimer();

  return (
    <>
      <input
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
      {millisecondsToTime(timeLeft)}
      <button>Start</button>
    </>
  );
}
function millisecondsToTime(ms){
   return ms
    
}

function useVariableTimer() {
  return {
    start: 0,
    stop: 0,
    timeLeft: 0,
    setTime: 0,
  };
}
