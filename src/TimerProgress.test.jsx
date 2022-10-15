//import React from 'react';
import {render, screen, fireEvent, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import preview from "jest-preview";

import VariableSpeedTimer from "./VariableSpeedTimer";

import {runTimer, seconds, waitSeconds, assertTimerSeconds} from "./test-utils";

let lastProgressPercent = null;
jest.mock("rc-progress", () => {
  const mockComponennt = (progresBarProps) => {
    lastProgressPercent = progresBarProps.percent;

    return `Mock component ${progresBarProps}`;
  };

  return {Line: mockComponennt, Circle: mockComponennt};
});

// TODO Use import mocking to asser progress

jest.useFakeTimers();
function assertProgressPercent(percentRemaning) {
  try {
    // TODO replace with query of render params
    const actualProgressPercent = lastProgressPercent;
    if (Math.abs(actualProgressPercent - percentRemaning) < 1) {
      expect(actualProgressPercent).toBeCloseTo(percentRemaning, 0);
    } else {
      expect(window.progressBarPercent).toBe(percentRemaning);
    }
  } catch (error) {
    Error.captureStackTrace(error, assertProgressPercent);
    throw error;
  }
}

const second = 1000;

it("progress bar follows timer at regular speed", () => {
    runTimer({speedFactor: 1, initialSeconds: 100});
  waitSeconds(50);

  assertProgressPercent(50);
});

it("progress bar follows timer", () => {
    runTimer({speedFactor: 2, initialSeconds: 100});

  waitSeconds(10);

  assertProgressPercent(80);
});


it("progress bar resets time when hovering changes the speed", () => {
  runTimer({speedFactor: 2, initialSeconds: 100});

  fireEvent.mouseOver(screen.getByTestId("timer-hover-handler"));
  waitSeconds(10);
  assertTimerSeconds(90);
  fireEvent.mouseLeave(screen.getByTestId("timer-hover-handler"));
  assertProgressPercent(90);

  waitSeconds(30);

  fireEvent.mouseOver(screen.getByTestId("timer-hover-handler"));

  assertTimerSeconds(30);
  assertProgressPercent(30);
});

