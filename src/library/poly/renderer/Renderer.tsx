import React from "react";
import { rendererProps } from "../interface";

import "../../../App.css";

import { generatePolygons } from "./functions";

function Renderer(props: rendererProps) {
  const speed = 0.1;

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      {generatePolygons(props.anchors || [], props.clusters || [], speed)}
    </div>
  );
}

export default Renderer;
