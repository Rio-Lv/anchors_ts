import React, { useEffect, useState } from "react";
import { circleAnchors, updateAnchors, updateClusters } from "../library/poly/builder/functions";
import { modes, Anchor } from "../library/poly/interface";
import Renderer from "../library/poly/renderer/Renderer";
import Canvas from "./Canvas";
import { init } from "../library/poly/renderer/anchorsInit";

const Builder = () => {
    const id = "Anchors_Builder";
    const [anchors, setAnchors] = useState<Anchor[]>([]);
    const [looseAnchors, setLooseAnchors] = useState<Anchor[]>(init);
    const [mode, setMode] = useState<string>(modes.move);
    const [index, setIndex] = useState<number>(0);
    const [moving, setMoving] = useState(-1);

    const [clustering, setClustering] = useState<number[]>([])
    const [clusters, setClusters] = useState<number[][]>([[0, 1, 2], [1, 2, 3]])

    // shift mode listener
    useEffect(() => {
        const handleKeyDown = (event: any): void => {
            if (event.key === modes.add) {
                setMode(modes.add);
            } else if (event.key === modes.remove) {
                setMode(modes.remove)
            }
        };
        const handleKeyUp = (event: any): void => {
            setMode(modes.move)
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
        if (mode === modes.move) {
            updateAnchors(setLooseAnchors, setAnchors);
            updateClusters(setClustering, setClusters);
        }
        console.log(mode)
    }, [mode]);

    useEffect(() => {
        console.log(anchors)
    }, [anchors])
    useEffect(() => {
        console.log(moving)
    }, [moving])



    return (
        <div id={id}>
            Builder : {JSON.stringify(anchors)}
            <div style={{
                position: "relative",
                marginTop: "20px",
                marginLeft: "40px",
                width: "1000px",
                height: "700px",
                border: mode ? "2px solid red" : "2px solid black",
            }}>
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
                    {circleAnchors(anchors, "rgb(83, 161, 235)", mode, setMoving, moving, setAnchors, setIndex, setClusters)}
                    {circleAnchors(looseAnchors, "#fc9c9c", mode, setMoving, moving, setAnchors, setIndex, setClusters)}
                </Canvas>

            </div>
        </div>
    );
};
export default Builder;
