import React, { useState } from "react";
import { rendererProps } from "../interface";

import { generatePolygons, CreatePolyV3 } from "./functions";

function Renderer(props: rendererProps) {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        // backgroundColor: "#ffffff",
      }}
    >
      {generatePolygons(props.anchors || [], props.clusters || [])}
      <CreatePolyV3
        anchors={[props.anchors[0], props.anchors[1], props.anchors[2]]}
        color={"cyan"}
      >
        <h1 style={{ color: "black", transform: "translate(-100%,-10%)" }}>Hello</h1>
      </CreatePolyV3>
    </div>
  );
}

export default Renderer;
