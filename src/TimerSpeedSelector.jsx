import React, {useEffect, useState} from "react";

import {TextField} from "@mui/material";
import {css} from "@emotion/css";

export default function TimerSpeedSelector({onSpeedChange}) {
  const [firstSpeedSelection, setFirstSpeedSelection] = useState(1);

  const [secondSpeedSelection, setSecondSpeedSelection] = useState(1);

  const [hovering, setHovering] = useState(false);

  const [currentSpeed, setCurrentSpeed] = useState(1);
  useEffect(() => {
    const randomSlowdownBetweenMinAndMax = Math.floor(
      Math.random() * (secondSpeedSelection - firstSpeedSelection + 1) +
        firstSpeedSelection,
    ) + Number((Math.random().toFixed(2)));
    onSpeedChange(1 / randomSlowdownBetweenMinAndMax);
    setCurrentSpeed(1 / randomSlowdownBetweenMinAndMax);
  }, [firstSpeedSelection, secondSpeedSelection]);
  const slowdownRate = 1 / currentSpeed;
  return (
    <div className="container">
      <TextField
        id="standard-number"
        label="Slowdown From"
        type="number"
        value={firstSpeedSelection}
        onChange={(e) => setFirstSpeedSelection(Number(e.target.value))}
        InputProps={{inputProps: {min: 0, max: 10}}}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
      <TextField
        id="standard-number"
        label="Slowdown To"
        type="number"
        value={secondSpeedSelection}
        onChange={(e) => setSecondSpeedSelection(Number(e.target.value))}
        InputProps={{inputProps: {min: 0, max: 10}}}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
      />
      <div
        className={css`

display: inline-block;
            width: 200px;
          `}
        onMouseLeave={() => {
          setHovering(false);
        }}
        onMouseOver={() => {
          setHovering(true);
        }}
      >
        <span
          className={css`
            background: ${hovering ? "none" : "gray"};
display: inline-block;
            min-width: 20px;
          `}
        >
      {hovering ? slowdownRate: ". "}
        </span>
        x slowdown.
        {hovering &&
          `1 second becomes ${slowdownRate} ${
            slowdownRate === 1 ? "second" : "seconds"
          }`}
      </div>
    </div>
  );
}
