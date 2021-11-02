import React, { useState } from "react";
import { rendererProps } from "../interface";

import { generatePolygons } from "./functions";

function Renderer(props: rendererProps) {

  return (
    <div style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      // backgroundColor: "#ffffff",
    }}>{generatePolygons(props.anchors || [], props.clusters || [])}</div>
  );
}

export default Renderer;

