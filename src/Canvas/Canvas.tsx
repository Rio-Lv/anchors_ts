import { handleCanvasClick } from "../library/poly/builder/functions";
import { canvasProps, modes } from "../library/poly/interface";
/**
 * 
 * @param props 
 * @returns div with {position: "relative",
                width: "100%",
                height: "100%",}
 * 
 */
const Canvas = (props: canvasProps) => {
  const id = "Anchors_Canvas";
  return (
    <div
      id={id}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        // backgroundColor: "#000000",
        pointerEvents: props.mode === modes.hide ? "none" : "auto",
        cursor:
          (props.mode !== modes.move || props.moving !== -1) &&
          props.mode !== modes.cluster &&
          props.mode !== modes.remove
            ? "crosshair"
            : "auto",
      }}
      onClick={(event) => {
        handleCanvasClick(event, id, props);
      }}
    >
      {props.children}
    </div>
  );
};

export default Canvas;
