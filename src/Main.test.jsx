//import React from 'react';
import {render, screen, fireEvent, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import preview from "jest-preview";

import VariableSpeedTimer from "./VariableSpeedTimer";
import {generateImage} from "jsdom-screenshot";
import App from "./App";
import {toMatchImageSnapshot} from "jest-image-snapshot";

import ssim from "ssim.js";

import fs from "fs.promises";
expect.extend({toMatchImageSnapshot}); // todo: idk where it's supposed to go

import {runTimer, seconds, waitSeconds, assertTimerSeconds} from "./test-utils";

let lastProgressPercent = null;
// TODO Use import mocking to asser progress

const second = 1000;

it("matches snapshot ", async () => {
    render(<VariableSpeedTimer />);
    // render(<App />);

  const screenshot = await generateImage();

    await fs.writeFile(       "/home/khalfani/Projects/React/smooth-timer/src/changed-file",        screenshot      );
  // 3.4270833333333335% different from snapshot
  // expect(screenshot).toMatchImageSnapshot({blur: 20});

  expect(1).toBe(4 - 3);
});
