import { Anchor } from "../interface";
import React, { useState } from "react";
import { start } from "repl";
const calculateShade = (anchors: Anchor[]) => {
  // anchors format ... [{i:0,x:0,y:10,z:0},{i:1,x:10,y:10,z:10}]
  var maxIZ: number = 0; //index
  var minIZ: number = 0;

  for (let i = 0; i < anchors.length; i++) {
    if (anchors[i].z > anchors[maxIZ].z) {
      maxIZ = i;
    }
    if (anchors[i].z < anchors[minIZ].z) {
      minIZ = i;
    }
  }
  console.log("max " + maxIZ, "min " + minIZ);
  const dz = +anchors[maxIZ].z - +anchors[minIZ].z; //max height - min height
  const X = anchors[maxIZ].x; // x of maxZ
  const Y = anchors[maxIZ].y; // y of maxZ
  const x = anchors[minIZ].x; // x of maxZ
  const y = anchors[minIZ].y; // y of maxZ

  const dx = X - x;
  const dy = Y - y;

  const d = Math.sqrt(dx * dx + dy * dy);

  console.log("dy", dy);

  const shade = .5 + (dz / 40) * (dy / 40) + (dz / 80) * (-dx / 80);
  return shade;
};

/**
 *
 * @param {any} props -takes anchors, color and children for use as component
 * @returns
 */
export const CreatePolyV3 = (props: any) => {
  const clone: any = props.anchors;
  var anchorText: string = "";

  const minI = (k: string) => {
    var I = 0;
    var lowest = clone[0][k];

    for (let i = 1; i < clone.length; i++) {
      if (clone[i][k] < lowest) {
        lowest = clone[i][k];
        I = i;
      }
    }
    return I;
  };
  const maxI = (k: string) => {
    var I = 0;
    var highest = clone[0][k];
    for (let i = 1; i < clone.length; i++) {
      if (clone[i][k] > highest) {
        highest = clone[i][k];
        I = i;
      }
    }
    return I;
  };
  const startX: number = clone[minI("x")].x;
  const startY: number = clone[minI("y")].y;
  const endX: number = clone[maxI("x")].x;
  const endY: number = clone[maxI("y")].y;
  const width = endX - startX;
  const height = endY - startY;
  console.log("width", width);
  console.log("height", height);

  var sumX = 0;
  var sumY = 0;
  props.anchors.forEach((anchor: Anchor) => {
    sumX += anchor.x;
    sumY += anchor.y;
  });
  const center = {
    x: sumX / props.anchors.length,
    y: sumY / props.anchors.length,
  };

  for (let i = 0; i < clone.length; i++) {
    if (i === clone.length - 1) {
      // last polygon point no comma after
      anchorText = anchorText.concat(`${clone[i].x}% ${clone[i].y}%`);
    } else {
      anchorText = anchorText.concat(`${clone[i].x}% ${clone[i].y}% , `);
    }
  }
  const text = `polygon(${anchorText})`;

  const shade = calculateShade(clone);

  return (
    <div
      onMouseEnter={() => {
        // setC("blue")
      }}
      onMouseLeave={() => {
        // setC("red")
      }}
      style={{
        position: "absolute",
        opacity: "100%",
        width: "100%",
        height: "100%",

        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        transition: ".3s ease",
        clipPath: text,
        textAlign: "center",

      }}
    >
      <div
        style={{
          left: `${startX}%`,
          top: `${startY}%`,
          position: "absolute",
          width: `${width}%`,
          height: `${height}%`,
          filter: `brightness(${shade})`,
          transition: ".3s ease",
          backgroundImage: `url(${"https://images.unsplash.com/photo-1579492450119-80542d516179?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY3JldGUlMjB0ZXh0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"})`,
        }}
      >{props.children}</div>
    </div>
  );
};

export const generatePolygons = (anchors: Anchor[], clusters: number[][]) => {
  if (anchors.length > 2 && clusters.length > 0) {
    const polys: any = [];
    for (let i = 0; i < clusters.length; i++) {
      const anchorCluster = [];
      for (let j = 0; j < clusters[i].length; j++) {
        anchorCluster.push(anchors[clusters[i][j]]);
      }
      // polys.push(<CreatePoly anchors={anchorCluster}></CreatePoly>);
      polys.push(<CreatePolyV3 anchors={anchorCluster} />);
      // CreatePolyV2(anchorCluster)
    }
    return polys;
  }
};
