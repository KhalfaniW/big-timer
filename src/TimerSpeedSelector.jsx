import React, {useEffect, useState} from "react";

import {TextField} from "@mui/material";
import {css} from "@emotion/css";
import {usePrevious} from "ahooks";
import {useUrlSearchParams} from "use-url-search-params";

const randomNumBetween = (num1, num2) =>
  Number(
    (Math.abs(num2 - num1) * Math.random() + Math.min(num1, num2)).toFixed(2),
  );
export default function TimerSpeedSelector({
  showTimeControls = true,
  onSpeedChange,
}) {
  const [firstSpeedSelection, setFirstSpeedSelection] = useState(1);

  const [secondSpeedSelection, setSecondSpeedSelection] = useState(1);

  const [hovering, setHovering] = useState(false);

  const [currentSpeed, setCurrentSpeed] = useState(1);

  const previousSpeed = usePrevious(currentSpeed);
  const [searchParams] = useUrlSearchParams();

  const [factor, setFactor] = useState(1);

  const searchParamsVals = JSON.stringify(searchParams);
  useEffect(() => {
    // avoid using useEffect on load?
    const params = JSON.parse(searchParamsVals);

    if (params.min && params.max) {
      const factor = params.factor > 0 ? params.factor : 1;
      setFirstSpeedSelection(params.min);
      setSecondSpeedSelection(params.max);
      setFactor(factor);
      setCurrentSpeed(1 / randomNumBetween(params.min, params.max) / factor);
    }
  }, [searchParamsVals]);

  useEffect(() => {
    onSpeedChange(currentSpeed / factor);
  }, [currentSpeed, factor]);

  const slowdownRate = 1 / (currentSpeed / factor);
  return (
    <div className="container">
      {showTimeControls && (
        <>
          <input
            className={css`
              color: black;
            `}
            onChange={(e) => {
              const factor = Number(e.target.value);
              if (factor > 0) {
                setFactor(factor);
              }
            }}
            value={factor}
            type="text"
            id="fname"
            name="fname"
          />
          <label>
            Slowdown Min
            <input
              type="number"
              maxLength="2"
              min="0"
              max="100"
              value={firstSpeedSelection}
              onChange={(e) => {
                const newSpeed = Number(e.target.value);
                setFirstSpeedSelection(newSpeed);
                const randomSlowdownBetweenMinAndMax = randomNumBetween(
                  newSpeed,
                  secondSpeedSelection,
                );
                setCurrentSpeed(1 / randomSlowdownBetweenMinAndMax);
              }}
            />
          </label>
          <label>
            Slowdown Max
            <input
              type="number"
              maxLength="2"
              min="0"
              max="100"
              value={secondSpeedSelection}
              onChange={(e) => {
                const newSpeed = Number(e.target.value);
                setSecondSpeedSelection(newSpeed);
                const randomSlowdownBetweenMinAndMax = randomNumBetween(
                  firstSpeedSelection,
                  newSpeed,
                );
                setCurrentSpeed(1 / randomSlowdownBetweenMinAndMax);
              }}
            />
          </label>
        </>
      )}
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
        {hovering && (
          <>
            <span
              className={css`
                background: ${hovering ? "none" : "gray"};
                display: inline-block;
                min-width: 20px;
              `}
            >
              {hovering ? slowdownRate : ". "}
            </span>
            x slowdown. `1 second becomes ${slowdownRate} $
            {slowdownRate === 1 ? "second" : "seconds"}`
          </>
        )}
      </div>
    </div>
  );
}
