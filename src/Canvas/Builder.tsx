import React, { useEffect, useState } from "react";
import {
    circleAnchors,
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
            setMoving(-1)

            if (event.key === modes.add) {
                setMode(modes.add);
            } else if (event.key === modes.remove) {
                setMode(modes.remove);
            } else if (event.key === modes.cluster) {
                setMode(modes.cluster);
            }

        };
        const handleKeyUp = (event: any): void => {
            setMode(modes.move);
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        // remove listeners on dismount
        return () => {
            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("keyUp", handleKeyUp);
        };
    }, []);

    useEffect(() => {
        setIndex(anchors.length);
    }, [anchors]);
    useEffect(() => {
        if (mode === modes.move) {
            updateAnchors(setLooseAnchors, setAnchors);
            updateClusters(setClustering, setClusters);
        }
        console.log(mode);
    }, [mode]);

    useEffect(() => {
        console.log(clustering)
    }, [clustering])

    return (
        <div id={id} style={{ display: "flex", flexDirection: "column" }}>
            <div>
                Builder : {JSON.stringify(anchors)}
            </div>
            <div>
                Cluster : {JSON.stringify(clusters)}
            </div>
            <div>
                Clustering : {JSON.stringify(clustering)}
            </div>
            <div
                style={{
                    position: "relative",
                    marginTop: "20px",
                    marginLeft: "40px",
                    width: "1000px",
                    height: "700px",
                    border: mode !== modes.move ? "2px solid red" : "2px solid black",
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
            </div>
        </div>
    );
};
export default Builder;
