import React, { useState } from "react";
import { rendererProps } from "../interface";
import { blueClusters, clusterInit } from "./anchorsInit";
import { calculateStuff } from "./functions";
import "../../../App.css";

import { generatePolygons, CreatePolyV3 } from "./functions";

function Renderer(props: rendererProps) {
  const [booking, setBooking] = useState(false);

  const createColorPoly = (cluster: number[], filter: string) => {
    const a = cluster[0];
    const b = cluster[1];
    const c = cluster[2];

    var newAnchors: any = [];
    cluster.forEach((num) => {
      newAnchors.push(props.anchors[num]);
    });
    const stuff = calculateStuff([
      props.anchors[a],
      props.anchors[b],
      props.anchors[c],
    ]);
    return (
      <CreatePolyV3 anchors={newAnchors} color={"cyan"} filter={filter}>
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
          {/* {JSON.stringify(stuff.dot)}:{JSON.stringify(stuff.regC)} */}
        </div>
      </CreatePolyV3>
    );
  };

  const filterClusters = (clusters: number[][], filterString: string) => {
    var filtered: any = [];
    clusters.forEach((cluster) => {
      filtered.push(createColorPoly(cluster, filterString));
    });
    return filtered;
  };
  const black = [[0, 1, 2]];
  const blue = [
    [12, 13, 14],
    // [16, 17, 21],
    // [17, 18, 21],
    // [16, 17, 20],
    // [17, 18, 20],
  ];
  const green = [[3, 4, 5]];
  const orange = [[6, 7, 8]];
  const red = [[9, 10, 11]];

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

      {filterClusters(blue, "sepia(70%) hue-rotate(-50deg) saturate(1700%) ")}
      {filterClusters(green, "sepia(70%) hue-rotate(-50deg) saturate(1700%) ")}
      {filterClusters(orange, "sepia(70%) hue-rotate(-50deg) saturate(1700%) ")}
      {filterClusters(black, "brightness(50%) saturate(100%) contrast(3)")}
      {filterClusters(red, "brightness(50%) saturate(100%) contrast(3)")}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          fontSize: "50px",
          transform:
            "translate(-50%,-50%)  skewX(-1deg) skewY(2deg) skewX(-1deg) perspective(20px) rotateX(1deg)",
          fontWeight: 600,
          color: "#ffffffe8",
          filter: `drop-shadow(2px 2px 7px #9b030fc0)`,
        }}
      >
        BOOK
      </div>
      {/* <div
        style={{
          position: "absolute",
          left: "69%",
          top: "80%",
          fontSize: "50px",
          transform:
            "translate(-50%,-50%)  skewX(-1deg) skewY(2deg) skewX(-5deg) perspective(70px) rotateX(-5deg) rotateZ(2deg)",
          fontWeight: 600,
          color: "white",
          filter: `drop-shadow(2px 2px 7px #9b030fc0)`,
        }}
      >
        FAQ
      </div> */}
    </div>
  );
}

export default Renderer;
