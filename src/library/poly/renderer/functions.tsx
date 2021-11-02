import { Anchor } from "../interface";
const calculateShade = (anchors: Anchor[]) => {
  // anchors format ... [{i:0,x:0,y:10,z:0},{i:1,x:10,y:10,z:10}]
  var sz = 0; //sum z
  for (let i = 0; i < anchors.length; i++) {
    sz += anchors[i].z;
  }
  const az = sz / anchors.length; // average z

  return Math.random();
};

const createPoly = (anchors: Anchor[], color: string) => {
  const Color = color || "black";
  var anchorText: string = "";

  for (let i = 0; i < anchors.length; i++) {
    if (i === anchors.length - 1) {
      // last polygon point no comma after
      anchorText = anchorText.concat(`${anchors[i].x}% ${anchors[i].y}%`);
    } else {
      anchorText = anchorText.concat(`${anchors[i].x}% ${anchors[i].y}% , `);
    }
  }
  const text = `polygon(${anchorText})`;

  return (
    <div
      style={{
        position: "absolute",
        opacity: "50%",
        width: "100%",
        height: "100%",
        backgroundColor: Color,
        filter: `brightness(${calculateShade(anchors)})`,
        clipPath: text,
        transition: ".3s ease",
      }}
    ></div>
  );
};
/**
 * @param anchors 
 * @param clusters 
 * @returns 
 */

export const generatePolygons = (anchors: Anchor[], clusters: number[][]) => {
  if (anchors.length > 2 && clusters.length > 0) {
    const polys: any = [];
    console.log("from generage poly")
    console.log("anchors", anchors);
    console.log("clusters", clusters)
    for (let i = 0; i < clusters.length; i++) {
      const anchorCluster = [];
      for (let j = 0; j < clusters[i].length; j++) {
        anchorCluster.push(anchors[clusters[i][j]]);
      }
      polys.push(createPoly(anchorCluster, "grey"));
    }
    return polys;
  }
};
