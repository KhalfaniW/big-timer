//import React from 'react';
import {render, screen, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MiniApp from "./MiniApp";
import preview from "jest-preview";
import {debug} from "jest-preview";
// start

// end
//TODO add auutomatic mode
const section = (description, f) => f();
jest.useFakeTimers();
const second = 1000;
describe("regular timer tests", () => {
  const props = {timeScale: 1, initialTime: 10000};
  render(<MiniApp timeScale={1} initialTime={20} />);

  it("timer runs regularly", () => {
    userEvent.click(screen.getByText("Start"));

    act(() => {
      jest.advanceTimersByTime(second * 10);
    });
    preview.debug();
    expect(screen.getByTestId("timer")).toHaveTextContent(`10`);

    section("timer stops at end", () => {
      act(() => {
        jest.advanceTimersByTime(second * 100);
      });

      expect(screen.getByTestId("timer")).toHaveTextContent(`03`);
    });
  });
});

it("timer runs scaled by half", () => {
  const props = {timeScale: 1, initialTime: 10000};
  render(<MiniApp timeScale={2} initialTime={20} />);
  userEvent.click(screen.getByText("Start"));

  act(() => {
    jest.advanceTimersByTime(second * 10);
  });
  expect(screen.getByTestId("timer")).toHaveTextContent(`5`);
});

it("timer runs at double speed", () => {
  const props = {timeScale: 1, initialTime: 10000};
  render(<MiniApp timeScale={0.5} initialTime={10} />);
  userEvent.click(screen.getByText("Start"));

  act(() => {
    jest.advanceTimersByTime(second * 1);
  });

  expect(screen.getByTestId("timer")).toHaveTextContent(`8`);
});
