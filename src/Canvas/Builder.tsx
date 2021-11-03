import React, { useEffect, useState } from "react";
import {
    circleAnchors,
    moveZ,
    NodeEditor,
    updateAnchors,
    updateClusters,

} from "../library/poly/builder/functions";
import { modes, Anchor } from "../library/poly/interface";
import Renderer from "../library/poly/renderer/Renderer";
import Canvas from "./Canvas";
import { init } from "../library/poly/renderer/anchorsInit";

const Builder = () => {
    const id = "Anchors_Builder";
    const [anchors, setAnchors] = useState<Anchor[]>(init);
    const [looseAnchors, setLooseAnchors] = useState<Anchor[]>([]);
    const [mode, setMode] = useState<string>(modes.move);
    const [index, setIndex] = useState<number>(anchors.length);
    const [moving, setMoving] = useState(-1);

    const [clustering, setClustering] = useState<number[]>([]);
    const [clusters, setClusters] = useState<number[][]>([
        [0, 1, 2],
        [1, 2, 3],
    ]);

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
            }

        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        // remove listeners on dismount
        return () => {
            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("keyUp", handleKeyUp);
        };
    }, [moving]);


    useEffect(() => {
        console.log(mode)
        if (mode === modes.move) {
            updateAnchors(setLooseAnchors, setAnchors);
            updateClusters(setClustering, setClusters);
            console.log("twice")
        }
    }, [mode]);

    const whichColor = () => {
        if (mode === modes.remove) {
            return "#e64e4e";
        } else if (mode === modes.add) {
            return "#15eb39";
        } else if (mode === modes.cluster) {
            return "#f7bf0a"
        } else {
            return "#a1a1a1";
        }
    };

    return (
        <div id={id} style={{ display: "flex", flexDirection: "column" }}>
            <div>Builder : {JSON.stringify(anchors)}</div>
            <div>Cluster : {JSON.stringify(clusters)}</div>
            <div>Clustering : {JSON.stringify(clustering)}</div>
            <div>Moving : {moving}</div>
            <div
                style={{
                    position: "relative",
                    marginTop: "20px",
                    marginLeft: "40px",
                    width: "1000px",
                    height: "700px",
                    border: `${whichColor()} 2px solid`,
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

                {mode === modes.move ? <div>{NodeEditor(moving, setAnchors, anchors)}</div> : null}

            </div>
        </div>
    );
};
export default Builder;
