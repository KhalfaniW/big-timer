import React, {useState, useEffect} from "react";

import VariableSpeedTimer from "./VariableSpeedTimer";
import {useAnimateProps} from "react-animate-props";

import {Line, Circle} from "rc-progress";
import Tween, {Easing} from "tweenkle";

import {throttle} from "lodash";
export default function AnimatedProgress({
  percent,
  paused,
  ...otherProps
}) {
    const [tween, setTween] = useState(null);

  return (
    <Circle
      percent={percent}
      strokeWidth={1}
      strokeColor="brown"
      {...otherProps}
    />
  );
}
