//import React from 'react';
import {render, screen, fireEvent, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import preview from "jest-preview";


import {runTimer, section, waitSeconds, assertTimerSeconds} from "./test-utils";

jest.useFakeTimers();

it.only("timer runs regularly", () => {
    runTimer({speedFactor: 1, initialSeconds: 20});

    waitSeconds(3);

    preview.debug();
    assertTimerSeconds(17);
    return;

    waitSeconds(10);

    section("timer stops at end", () => {
        waitSeconds(100);

        assertTimerSeconds(0);
    });
});
it("timer runs regularly", () => {
  runTimer({speedFactor: 1, initialSeconds: 20});

  waitSeconds(10);

  preview.debug();
  assertTimerSeconds(10);


  waitSeconds(10);

  section("timer stops at end", () => {
    waitSeconds(100);

    assertTimerSeconds(0);
  });
});

it("timer runs at half speed", () => {
  runTimer({speedFactor: 0.5, initialSeconds: 20});

  waitSeconds(10);
  assertTimerSeconds(15);
});

it("timer runs at double speed", () => {
  runTimer({speedFactor: 2, initialSeconds: 10});

  waitSeconds(1);

  assertTimerSeconds(8);
});


it.skip("timer runs regular speed when hovered", () => {
  runTimer({speedFactor: 2, initialSeconds: 20});


  fireEvent.mouseOver(screen.getByTestId("timer-hover-handler"));

  waitSeconds(5);
  assertTimerSeconds(15);

  section("timer continues as normal", () => {
    fireEvent.mouseLeave(screen.getByTestId("timer-hover-handler"));
    waitSeconds(5);

    assertTimerSeconds(5);
  });
});
