import { Anchor } from "../interface";
import React, { useState } from "react";
import { start } from "repl";
const lightVector = [0, 1, 1];
const startLight = 1.2;
const dotRatio = 0.4;
export const calculateStuff = (anchors: Anchor[]) => {
  const A = {
    x: anchors[1].x - anchors[0].x,
    y: anchors[1].y - anchors[0].y,
    z: anchors[1].z - anchors[0].z,
  };
  const B = {
    x: anchors[2].x - anchors[0].x,
    y: anchors[2].y - anchors[0].y,
    z: anchors[2].z - anchors[0].z,
  };
  const C = [
    A.y * B.z - A.z * B.y,
    A.z * B.x - A.x * B.z,
    A.x * B.y - A.y * B.x,
  ];

  var maxDim = 0;
  for (let i = 0; i < C.length; i++) {
    if (Math.abs(C[i]) > maxDim) {
      maxDim = C[i];
    }
  }
  const regC: number[] = [];
  for (let i = 0; i < C.length; i++) {
    regC.push(+(C[i] / maxDim).toPrecision(4));
  }
  // linear light

  var dot = 0;
  for (let i = 0; i < lightVector.length; i++) {
    dot += regC[i] * lightVector[i];
  }

  return {
    shade: startLight - dot * dotRatio,
    A: A,
    B: B,
    C: C,
    regC: regC,
    dot: dot,
  };
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
  // console.log("width", width);
  // console.log("height", height);

  for (let i = 0; i < clone.length; i++) {
    if (i === clone.length - 1) {
      // last polygon point no comma after
      anchorText = anchorText.concat(`${clone[i].x}% ${clone[i].y}%`);
    } else {
      anchorText = anchorText.concat(`${clone[i].x}% ${clone[i].y}% , `);
    }
  }
  const text = `polygon(${anchorText})`;

  const stuff = calculateStuff(clone);
  const shade = stuff.shade;

  const textUrl =
    "https://images.photowall.com/products/60455/concrete-texture-3.jpg?h=699&q=85";

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
          filter: props.filter
            ? `brightness(${shade}) ${props.filter}`
            : `brightness(${shade})`,
          left: `${startX}%`,
          top: `${startY}%`,
          position: "absolute",
          width: `${width}%`,
          height: `${height}%`,
          transition: ".3s ease",
          backgroundPosition: "center",
          // backgroundRepeat: "no-repeat",
          // transform: "scale(1.1) skewX(5deg) skewY(5deg) skewZ(5deg)",
          // backgroundSize: "100% 100%",
          // backgroundSize: width > height ? `${width * 10}px ${width * 10}px` : `${height * 7}px ${height * 7}px`,
          backgroundImage: `url(${textUrl})`,
        }}
      >
        {props.children}
      </div>
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
