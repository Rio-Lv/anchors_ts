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
    const [mode, setMode] = useState("");

    // shift mode listener
    useEffect(() => {
        const handleKeyDown = (event: any): void => {
            if (event.key === add) {
                setMode(add);
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
    }, [mode]);

    // anchors listener
    useEffect(() => {
        console.log("anchors", anchors);
    }, [anchors]);
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
                    setAnchors={setAnchors}
                    looseAnchors={looseAnchors}
                    setLooseAnchors={setLooseAnchors}
                />
            </div>
        </div>
    );
};
export default Builder;
