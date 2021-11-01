import { useEffect, useState } from "react";

import { handleCanvasClick, canvasProps } from "../library/poly/builder/functions";

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
                cursor: props.mode || props.moving !== -1 ? "crosshair" : "auto",
            }}
            onClick={(event) => {
                handleCanvasClick(event, id, props)
            }}
        >
            {props.children}
        </div>
    );
};

export default Canvas;



