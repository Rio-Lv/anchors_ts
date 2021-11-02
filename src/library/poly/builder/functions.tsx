import { modes, Anchor, coord, canvasProps } from "../interface";
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
      const anchorsClone: Anchor[] = anchors;
      looseAnchors.forEach((looseAnchor: Anchor) => {
        anchorsClone[looseAnchor.i] = looseAnchor;
      });
      return anchorsClone;
    });
    return [];
  });
};
/**
 *
 * @param {any} event -Takes mouse clicke event
 * @param {string}  id -canvas id
 * @param setAnchors
 * @param setLooseAnchors
 */
export const addLooseAnchor = (
  event: any,
  id: string,
  index: number,
  setIndex: Function,
  setAnchors: Function,
  setLooseAnchors: Function
) => {
  setAnchors((anchors: Anchor[]) => {
    const coords: coord = getMouseCoords(event, id);
    setLooseAnchors((looseAnchors: Anchor[]) => {
      const anchor: Anchor = { i: index, x: coords.x, y: coords.y, z: 0 };
      return [...looseAnchors, ...[anchor]];
    });

    setIndex((Index: number) => {
      return index + 1;
    });
    return anchors;
  });
};

const deleteNode = (
  index: number,
  setAnchors: Function,
  setIndex: Function,
  setClusters: Function
) => {

  setAnchors((anchors: Anchor[]) => {
    setIndex((Index: number) => {
      return anchors.length - 1;
    });

    const corrected: Anchor[] = [];
    anchors.forEach((anchor: Anchor) => {
      if (anchor.i !== index) {
        if (anchor.i > index) {
          const down: Anchor = {
            i: anchor.i - 1,
            x: anchor.x,
            y: anchor.y,
            z: anchor.z,
          };
          corrected.push(down);

        } else {
          corrected.push({
            i: anchor.i,
            x: anchor.x,
            y: anchor.y,
            z: anchor.z,
          });
        }
      }
    });
    return corrected;
  });
};
export const updateClusters = (
  setClustering: Function,
  setClusters: Function
): void => {
  setClustering((clustering: number[]) => {
    if (clustering.length > 2) {
      setClusters((clusters: number[][]) => {
        const clustersClone: number[][] = clusters;
        clustersClone.push(clustering);
        return clustersClone;
      });
    }
    return [];
  });
};
const addClusteringNode = (index: number, setClustering: Function): void => {
  setClustering((clustering: number[]) => {
    const clone = [...clustering];
    clone.push(index);
    return clone;
  });
};
/**
 * @param {Anchor[]} anchors
 * @param {string} color
 * @param {string} mode - avoids conflicting functions
 * @param {Function} setMoving - allow for the movement of a node
 * @param {number} moving - the node that shall be moved
 * @returns
 */
export const circleAnchors = (
  anchors: Anchor[],
  color: string,
  mode: string,
  setMoving: Function,
  moving: number,
  setAnchors: Function,
  setIndex: Function,
  clustering: number[],
  setClusters: Function,
  setClustering: Function
) => {
  const uid = "circleAnchors_";
  const size: number = 20;

  const circles = [];
  for (let i = 0; i < anchors.length; i++) {
    const whichColor = () => {
      if (moving === i) {
        return "#59c2ff";
      } else if (mode === modes.remove) {
        return "#e64e4e";
      } else if (mode === modes.add) {
        return "#15eb39";
      } else if (mode === modes.cluster) {
        const clusterColor = "#f7bf0a"
        if (clustering.length === 0) {
          return clusterColor;
        } else {
          if (clustering.includes(i)) {
            return clusterColor
          } else {
            return "#ffffff"
          }
        }
      } else {
        return "#ffffff";
      }
    };

    circles.push(
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (mode === modes.move) {
            setMoving(anchors[i].i);
          } else if (mode === modes.remove) {
            deleteNode(i, setAnchors, setIndex, setClusters);
          } else if (mode === modes.cluster) {
            addClusteringNode(i, setClustering)
          }
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
          pointerEvents: mode === modes.add || moving !== -1 ? "none" : "auto",
          backgroundColor: whichColor(),
          transform: "translate(-50%,-50%)",
        }}
      >
        {anchors[i].i}
      </div>
    );
  }
  return circles;
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
  if (props.mode === modes.add) {
    addLooseAnchor(
      event,
      id,
      props.index,
      props.setIndex,
      props.setAnchors,
      props.setLooseAnchors
    );
  } else if (props.mode === modes.move && props.moving !== -1) {
    const index = props.moving;
    props.setAnchors((anchors: Anchor[]) => {
      const clone: Anchor[] = anchors;
      const coords = getMouseCoords(event, id);
      clone[index] = { i: index, x: coords.x, y: coords.y, z: 0 };

      props.setMoving(-1);
      return clone;
    });
  }
};
