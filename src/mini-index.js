import React from "react";

import "./index.css";
import MiniApp from "./MiniApp";
import ReactDOM from "react-dom";

 ReactDOM.render(
     <MiniApp timeScale={1} initialTime={2}/>
                 , document.getElementById("root"));
