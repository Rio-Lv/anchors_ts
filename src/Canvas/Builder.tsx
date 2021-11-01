import React, { useEffect, useState } from "react";
import {
    Anchor,
    circleAnchors,
    coordsToAnchor,
    getMouseCoords,
    updateAnchors,
    Modes
} from "../library/poly/builder/functions";
import Canvas from "./Canvas";

const modes: Modes = { add: "Shift", remove: "Delete", move: "" }
const { add, remove, move } = modes;

const Builder = () => {
    const id = "Anchors_Builder";
    const [anchors, setAnchors] = useState<Anchor[]>([]);
    const [looseAnchors, setLooseAnchors] = useState<Anchor[]>([]);
    const [mode, setMode] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const [moving, setMoving] = useState(-1);

    // shift mode listener
    useEffect(() => {
        const handleKeyDown = (event: any): void => {
            if (event.key === add) {
                setMode(add);
            } else if (event.key === "d") {
                setMode(remove)
            }
        };
        const handleKeyUp = (event: any): void => {
            setMode(move)
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
        if (mode === move) {
            updateAnchors(setLooseAnchors, setAnchors);
        }
        console.log(mode)
    }, [mode]);

    useEffect(() => {
        console.log(anchors)
    }, [anchors])
    useEffect(() => {
        console.log(moving)
    }, [moving])

    const Block = {
        marginTop: "20px",
        marginLeft: "40px",
        width: "1000px",
        height: "700px",
        border: mode ? "2px solid red" : "2px solid black",
    };

    return (
        <div id={id}>
            Builder : {JSON.stringify(anchors)}
            <div style={Block}>
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
                    {circleAnchors(anchors, "rgb(83, 161, 235)", mode, setMoving, moving, setAnchors, setIndex)}
                    {circleAnchors(looseAnchors, "#fc9c9c", mode, setMoving, moving, setAnchors, setIndex)}
                </Canvas>
            </div>
        </div>
    );
};
export default Builder;
