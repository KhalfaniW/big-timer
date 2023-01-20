import React, {useState, useRef, useEffect} from "react";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {css} from "@emotion/css";
import img1 from "./imgs/original.png";

import ssim from "ssim.js";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function ImageDiff() {
  const canvasRef = useRef(null);
  function handleClick() {
    // let canvas = canvasRef;
    let canvas = canvasRef.current;

    // Request media
    navigator.mediaDevices
      .getDisplayMedia()
      .then((stream) => {
        console.log("YEETus");

        // Grab frame from stream
        let track = stream.getVideoTracks()[0];
        let capture = new ImageCapture(track);
        capture.grabFrame().then((bitmap) => {
          // Stop sharing
          track.stop();

          // Draw the bitmap to canvas
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          canvas.getContext("2d").drawImage(bitmap, 0, 0);

          console.log(canvas.toDataURL());

          // Grab blob from canvas
          canvas.toBlob((blob) => {
            // Do things with blob here
            console.log("output blob:", blob);
          });
        });
      })
      .catch((e) => console.error(e));
  }
  return (
    <div>
      <img src={img1}/>
      <img src="./imgs/new.png"/>
      <canvas
        className={css`
          display: none;
        `}
        ref={canvasRef}
        id="canvas1"
      ></canvas>

      <button
        className={css`
          position: absolute;
        `}
        onClick={handleClick}
      >
        compare
      </button>
    </div>
  );
}
