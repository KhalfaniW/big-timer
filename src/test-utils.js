import React from "react";

import {render, screen, fireEvent, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import VariableSpeedTimer from "./VariableSpeedTimer";

const second = 1000;
const runTimer = (timerProps) => {
  const allTimerProps = {
    ...timerProps,
    hoverTimeout: 100 * second,
    started: true,
  };
  render(<VariableSpeedTimer {...allTimerProps} />);
  //userEvent.click(screen.getByText("Start"));
};

const waitSeconds = (seconds) => {
  act(() => {
    jest.advanceTimersByTime(seconds * 1000);
  });
};

function assertTimerSeconds(secondsRemaning) {
  try {
    // TODO need to un mouse over if it is supposed to
    // fireEvent.mouseOver(screen.getByTestId("timer"));

    const timerTimeAsSeconds = screen
      .getByTestId("timer")
      .textContent.split(":")
      .reduce(
        (totalSeconds, timePart, index) =>
          totalSeconds +
          (index === 0 ? Number(timePart * 60) : Number(timePart)),
        0,
      );

    expect(timerTimeAsSeconds).toBe(secondsRemaning);
  } catch (error) {
    Error.captureStackTrace(error, assertTimerSeconds);
    throw error;
  }
}

const section = (description, sectionCode) => {
  try {
    sectionCode();
  } catch (error) {
    error.message = `(Section: ${description}) \n\n` + error.message;
    throw error;
  }
};

export {runTimer, section, assertTimerSeconds, waitSeconds};
