import { useEffect } from "react";
/**
 * @interface {i:__,x:__,y:__,z:__} 
 */
export interface Anchor {
  i: number;
  x: number;
  y: number;
  z: number;
}
export interface coord {
  x: number;
  y: number;
}
/**
 * @interface -properties: mode , anchors , setAnchors , looseAnchors , setLooseAnchors
 */
export interface canvasProps {
  mode: string;
  anchors: Anchor[];
  setAnchors: Function;
  looseAnchors: Anchor[];
  setLooseAnchors: Function;
}
/**
 * @interface -move is empty and is default 
 */
export interface Modes {
  add: "Shift";
  remove: "Delete";
  move: "";
}

/**
 *
 * @param {number} x - mouse X position relative to div in percentage
 * @param {number} y - mouse Y position relative to div in percentage
 * @param {Anchor[]} looseAnchors - List of loose anchors. Used here for its length for indexing
 * @returns {Anchor} - returns an Anchor in format {i:_,x:_,y:_,z:_}
 */
export const coordsToAnchor = (
  i: number,
  x: number,
  y: number,
  looseAnchors: Anchor[]
): Anchor => {
  const anchor: Anchor = { i: i, x: x, y: y, z: 0 };
  return anchor;
};
/**
 *
 * @param event - the event returned by the mouse
 * @param id - unique string need to use document.getElementById(...)
 * @returns {coord} - return a coordinate in percentage relative to the div
 */
export const getMouseCoords = (event: any, id: string): coord => {
  var rect = event.target.getBoundingClientRect();
  var x = event.clientX - rect.left; //x position within the element.
  var y = event.clientY - rect.top; //y position within the element.

  const width = document.getElementById(id)?.offsetWidth || 1;
  const height = document.getElementById(id)?.offsetHeight || 1;

  const percentX = Math.floor((x / width) * 100);
  const percentY = Math.floor((y / height) * 100);

  const newPercentCoord: coord = { x: percentX, y: percentY };

  return newPercentCoord;
};
/**
 * @param {Function} setLooseAnchors - taking the loose anchors to append on to the existing, Then emptying loose Anchors
 * @param {Function} setAnchors - simpply adding them together, index management moved to handleCanvasClick
 */
export const updateAnchors = (
  setLooseAnchors: Function,
  setAnchors: Function
) => {
  setLooseAnchors((looseAnchors: Anchor[]) => {
    setAnchors((anchors: Anchor[]) => {
      const pushedLooseAnchors: Anchor[] = [];

      looseAnchors.forEach((item: Anchor) => {
        pushedLooseAnchors.push({
          i: item.i,
          x: item.x,
          y: item.y,
          z: item.z,
        });
      });

      return [...anchors, ...pushedLooseAnchors];
    });
    return [];
  });
};
/**
 * @param {object} event - event return by Mouse Click
 * @param {string} id - unique id to use in get mouse coords
 * @param {canvasProps} props - props brought in from Builder to Canvas
 */
export const handleCanvasClick = (
  event: any,
  id: string,
  props: canvasProps
) => {
  if (props.mode === "Shift") {
    const coords: coord = getMouseCoords(event, id);

    props.setAnchors((anchors: Anchor[]) => {
      props.setLooseAnchors((looseAnchors: Anchor[]) => {

        if (anchors.length === 0) {
          if (looseAnchors.length === 0) {
            const looseAnchor: Anchor = { i: 0, x: coords.x, y: coords.y, z: 0 }
            return [looseAnchor]
          } else {
            const index: number = looseAnchors.length;
            const looseAnchor = coordsToAnchor(index, coords.x, coords.y, looseAnchors);
            return [...looseAnchors, ...[looseAnchor]]
          }
        } else {
          const index: number = anchors[anchors.length - 1].i + looseAnchors.length;
          const looseAnchor = coordsToAnchor(index, coords.x, coords.y, looseAnchors);
          return [...looseAnchors, ...[looseAnchor]]
        }

      });
      return anchors
    })
  }
};
/**
 * 
 * @param {Anchor[]} anchors 
 * @param color 
 * @returns 
 */
export const circleAnchors = (anchors: Anchor[], color: string, mode: string) => {
  const uid = "circleAnchors_";
  const size: number = 20;

  const circles = [];
  for (let i = 0; i < anchors.length; i++) {
    circles.push(
      <div
        onClick={(e) => {
          e.stopPropagation();

        }}
        key={uid + i}
        style={{
          fontWeight: 600,
          fontSize: "13px",

          position: "absolute",
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          textAlign: "center",
          transition: ".3s ease",
          boxSizing: "border-box",
          cursor: "pointer",
          userSelect: "none",
          left: `${anchors[i].x}%`,
          top: `${anchors[i].y}%`,
          pointerEvents: mode ? "none" : "auto",
          backgroundColor: mode ? color : "#e7e7e7",
          transform: "translate(-50%,-50%)",
        }}
      >
        {anchors[i].i}
      </div>
    );
  }
  return circles;
};
