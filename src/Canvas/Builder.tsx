import React, { useEffect, useState } from "react";
import {
  circleAnchors,
  // moveZ,
  NodeEditor,
  updateAnchors,
  updateClusters,
} from "../library/poly/builder/functions";
import { modes, Anchor } from "../library/poly/interface";
import Renderer from "../library/poly/renderer/Renderer";
import Canvas from "./Canvas";
import {
  gitExample,
  gitExample2,
  gitExample3,
} from "../library/poly/renderer/anchorsInit";
import ReactJson from "react-json-view";
import Controls from "./Controls";

const Builder = () => {
  const id = "Anchors_Builder";
  const [anchors, setAnchors] = useState<Anchor[]>(gitExample.anchors);
  const [clusters, setClusters] = useState<number[][]>(gitExample.clusters);

  const [looseAnchors, setLooseAnchors] = useState<Anchor[]>([]);

  const [mode, setMode] = useState<string>(modes.move);
  const [index, setIndex] = useState<number>(anchors.length);
  const [moving, setMoving] = useState(-1);

  const [clustering, setClustering] = useState<number[]>([]);

  const [page, setPage] = useState<number>(1);
  const [saving, setSaving] = useState<boolean>(false);

  const [a1, setA1] = useState<Anchor[]>(gitExample.anchors);
  const [a2, setA2] = useState<Anchor[]>(gitExample2.anchors);
  const [a3, setA3] = useState<Anchor[]>(gitExample3.anchors);

  const [c1, setC1] = useState<number[][]>(gitExample.clusters);
  const [c2, setC2] = useState<number[][]>(gitExample2.clusters);
  const [c3, setC3] = useState<number[][]>(gitExample3.clusters);

  // page control listeners
  useEffect(() => {
    const tabNumbers = (event: any) => {
      if (event.key === "1") {
        setPage(1);
      } else if (event.key === "2") {
        setPage(2);
      } else if (event.key === "3") {
        setPage(3);
      }
    };
    window.addEventListener("keydown", tabNumbers);
    window.addEventListener("keydown", (e) => {
      if (e.key === "s") {
        setMode(modes.move);
        setSaving(true);
        setTimeout(() => {
          setSaving(false);
        }, 1500);
        if (page === 1) {
          const A = anchors;
          const C = clusters;
          console.log("Clusters", clusters);
          console.log("C saving", C);
          setA1(A);
          setC1(C);
        } else if (page === 2) {
          const A = anchors;
          const C = clusters;
          setA2(A);
          setC2(C);
        } else if (page === 3) {
          const A = anchors;
          const C = clusters;
          setA3(A);
          setC3(C);
        }
      }
    });
  }, [anchors, clusters, page]);

  // page listener
  useEffect(() => {
    if (page === 1) {
      const A = a1;
      const C = c1;
      console.log("C paging", C);
      setAnchors(A);
      setClusters(C);
    } else if (page === 2) {
      const A = a2;
      const C = c2;
      setAnchors(A);
      setClusters(C);
    } else if (page === 3) {
      const A = a3;
      const C = c3;
      setAnchors(A);
      setClusters(C);
    }
  }, [page]);

  // mode listener
  useEffect(() => {
    const handleKeyDown = (event: any): void => {
      if (event.key === modes.add) {
        setMoving(-1);
        setMode(modes.add);
      } else if (event.key === modes.remove) {
        setMoving(-1);
        setMode(modes.remove);
      } else if (event.key === modes.cluster) {
        setMoving(-1);
        setMode(modes.cluster);
      } else if (event.key === modes.hide) {
        setMoving(-1);
        setMode(modes.hide);
      } else if (event.key === modes.group) {
        setMoving(-1);
        setMode(modes.group);
      }
    };
    const handleKeyUp = (event: any): void => {
      if (event.key === modes.add) {
        setMode(modes.move);
      } else if (event.key === modes.remove) {
        setMode(modes.move);
      } else if (event.key === modes.cluster) {
        setMode(modes.move);
      } else if (event.key === modes.hide) {
        setMode(modes.move);
      } else if (event.key === modes.group) {
        setMode(modes.move);
      } else {
        if (event.key === "p") {
          console.log("anchors", JSON.stringify(anchors));
          console.log("clusters", JSON.stringify(clusters));
        }
      }
    };
    const handleRightClick = (event: any) => {
      event.preventDefault();
      setMoving(-1);
      setMode(modes.move);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("contextmenu", handleRightClick);
    // remove listeners on dismount
    return () => {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyUp", handleKeyUp);
      window.addEventListener("contextmenu", handleRightClick);
    };
  }, [moving]);

  useEffect(() => {
    // console.log(mode);
    if (mode === modes.move || mode === modes.group) {
      updateAnchors(setLooseAnchors, setAnchors);
      updateClusters(setClustering, setClusters);
    }
  }, [mode]);

  return (
    <div id={id} style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Controls />
        <div style={{ margin: "30px", marginTop: "0" }}>
          <h1>Data</h1>
          <ReactJson collapsed={2} src={{ anchors, clusters, clustering }} />
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "500px",
          transform: "translate(0%,-50%)",
          width: "1000px",
          height: "800px",
          backgroundColor: "black",
          borderRadius: "20px",
        }}
      >
        <Renderer anchors={anchors} clusters={clusters} />
        <Canvas
          mode={mode}
          anchors={anchors}
          index={index}
          setIndex={setIndex}
          setAnchors={setAnchors}
          looseAnchors={looseAnchors}
          setLooseAnchors={setLooseAnchors}
          moving={moving}
          setMoving={setMoving}
        >
          {circleAnchors(
            anchors,
            "rgb(83, 161, 235)",
            mode,
            setMoving,
            moving,
            setAnchors,
            setIndex,
            clustering,
            setClusters,
            setClustering
          )}
          {circleAnchors(
            looseAnchors,
            "#fc9c9c",
            mode,
            setMoving,
            moving,
            setAnchors,
            setIndex,
            clustering,
            setClusters,
            setClustering
          )}
        </Canvas>
        {mode === modes.move ? (
          <div>{NodeEditor(moving, setAnchors, anchors)}</div>
        ) : null}
        {/* bottom buttons can probably go into its own component */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            onClick={() => {
              setPage(1);
              if (mode === modes.group) {
                const A = anchors;
                const C = clusters;
                setA1(A);
                setC1(C);
              } else {
                setAnchors(a1);
                setClusters(c1);
              }
            }}
            style={{
              ...botButtonStyle,
              ...{
                backgroundColor: page === 1 ? "black" : "#f2f2f2",
                color: page === 1 ? "white" : "black",
              },
            }}
          >
            1
          </div>
          <div
            onClick={() => {
              setPage(2);
            }}
            style={{
              ...botButtonStyle,
              ...{
                backgroundColor: page === 2 ? "black" : "#f2f2f2",
                color: page === 2 ? "white" : "black",
              },
            }}
          >
            2
          </div>
          <div
            onClick={() => {
              setPage(3);
            }}
            style={{
              ...botButtonStyle,
              ...{
                backgroundColor: page === 3 ? "black" : "#f2f2f2",
                color: page === 3 ? "white" : "black",
              },
            }}
          >
            3
          </div>
          <div
            style={{
              ...botButtonStyle,
              ...{
                opacity: saving ? 1 : 0,
                width: "100px",
                borderRadius: "20px",
                transition: ".3s ease",
              },
            }}
          >
            Saving
          </div>
        </div>
      </div>
    </div>
  );
};
export default Builder;
const botButtonStyle = {
  margin: "10px",
  marginRight: "20px",
  marginLeft: 0,
  backgroundColor: "#f2f2f2",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};
