import { useEffect, useState } from "react";

import { Anchor, getMouseCoords, coord, coordsToAnchor, handleCanvasClick, canvasProps, circleAnchors } from "../library/poly/builder/functions";

const Canvas = (props: canvasProps) => {
    const id = "Anchors_Canvas"
    return (
        <div
            id={id}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                backgroundColor: "#000000",
                cursor: props.mode ? "crosshair" : "auto",
            }}
            onMouseUp={(event) => {
                handleCanvasClick(event, id, props)
            }}
        >
            {circleAnchors(props.anchors, "rgb(83, 161, 235)", props.mode)}
            {circleAnchors(props.looseAnchors, "#fc9c9c", props.mode)}
        </div>
    );
};

export default Canvas;



