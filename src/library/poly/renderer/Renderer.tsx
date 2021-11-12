import React, { useState } from "react";
import { rendererProps } from "../interface";
import { calculateStuff } from "./functions";

import { generatePolygons, CreatePolyV3 } from "./functions";

function Renderer(props: rendererProps) {
  const [booking, setBooking] = useState(false);

  const createColorPoly = (a: number, b: number, c: number, filter: string) => {
    const stuff = calculateStuff([
      props.anchors[a],
      props.anchors[b],
      props.anchors[c],
    ]);
    return (
      <CreatePolyV3
        anchors={[props.anchors[a], props.anchors[b], props.anchors[c]]}
        color={"cyan"}
        filter={filter}
      >
        <div
          onMouseEnter={() => {
            setBooking(true);
            console.log("hovering");
          }}
          onMouseLeave={() => {
            setBooking(false);
          }}
          style={{
            position: "relative",
            width: `${100}%`,
            height: `${100}%`,
            transition: ".3s ease",
            cursor: "pointer",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "22px",
            top: "40%",
          }}
        >
          {JSON.stringify(stuff.dot)}:{JSON.stringify(stuff.regC)}
          {/* {JSON.stringify(stuff.B)}
          {JSON.stringify(stuff.C)} */}
        </div>
      </CreatePolyV3>
    );
  };

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
      {createColorPoly(4, 5, 7, "")}
    </div>
  );
}

export default Renderer;
