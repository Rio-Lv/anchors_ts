import React, { useState } from "react";
import { rendererProps } from "../interface";
import { blueClusters, clusterInit } from "./anchorsInit";
import { calculateStuff } from "./functions";
import "../../../App.css";

import { generatePolygons, CreatePolyV3 } from "./functions";

function Renderer(props: rendererProps) {
  const [booking, setBooking] = useState(false);
  const [speed, setSpeed] = useState(0.1);

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
      <CreatePolyV3
        anchors={newAnchors}
        color={"cyan"}
        filter={filter}
        speed={speed}
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
            cursor: "pointer",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "22px",
            top: "40%",
            overflow: "hidden",
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
  const blue = [[12, 13, 14]];
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
      {generatePolygons(props.anchors || [], props.clusters || [], speed)}
      {/* {filterClusters(blue, "sepia(70%) hue-rotate(-50deg) saturate(1700%) ")}
      {filterClusters(green, "sepia(70%) hue-rotate(-50deg) saturate(1700%) ")}
      {filterClusters(orange, "sepia(70%) hue-rotate(-50deg) saturate(1700%) ")}
      {filterClusters(black, "brightness(50%) saturate(100%) contrast(3)")}
      {filterClusters(red, "brightness(50%) saturate(100%) contrast(3)")} */}
    </div>
  );
}

export default Renderer;
