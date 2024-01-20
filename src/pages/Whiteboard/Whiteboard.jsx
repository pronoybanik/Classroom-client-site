import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import PrimaryButton from "../../shared/PrimaryButton";

const Whiteboard = () => {
  const canvasEl = useRef(null);
  const [penWidth, setPenWidth] = useState(3);
  const [fabricCanvas, setFabricCanvas] = useState();
  const [penColor, setPenColor] = useState("red");
  const [toggleEraser, setToggleEraser] = useState(false);

  useEffect(() => {
    const options = {
      isDrawingMode: true, // Set to true if you want to enable drawing mode
      selection: false, // Disable object selection
      // Add more options as needed
    };

    const canvas = new fabric.Canvas(canvasEl.current, options);

    const updateCanvasContext = (canvasInstance) => {
      if (canvasInstance) {
        // Example: Set a background color
        canvasInstance.setBackgroundColor("", () => {
          canvasInstance.renderAll();
        });
      }
    };

    updateCanvasContext(canvas);
    setFabricCanvas(canvas);
    setToggleEraser(canvas);
    return () => {
      updateCanvasContext(null);
      canvas.dispose();
    };
  }, [canvasEl]);

  const changePenWidth = (width) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = width;
      setPenWidth(width);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };

  const changePenColor = (color) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = color;
      setPenColor(color);
      fabricCanvas.renderAll.bind(fabricCanvas);
    }
  };

  const downloadBoard = () => {
    const pngData = fabricCanvas.toDataURL("pag");
    const downloadLink = document.createElement("a");
    const fileName = `whiteBoard-session-${Math.random()
      .toString()
      .replace(".", "")}.png`;

    downloadLink.href = pngData;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
    }
  };

  const toggleErase = () => {
    if (fabricCanvas) {
      if (toggleErase) {
        changePenColor("#FFFFFF");
        setToggleEraser(false);
      } else {
        changePenColor("#FFFFFF");
        setToggleEraser(true);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="my-6 text-center ">
        <p className="border-b border-black pb-2 mx-auto w-72 text-3xl font-bold uppercase">
          White board
        </p>
      </div>
      <div className="bg-white my-4">
        <canvas width="1400" height="650" ref={canvasEl} />
      </div>
      <div className="flex items-center  justify-evenly">
        <div>
          <div className="flex items-center gap-4">
            <label className="text-sm font-bold">Pen Width: -{penWidth}</label>
            <input
              type="range"
              onChange={(e) => changePenWidth(e.target.value)}
              value={penWidth}
              min={1}
              max={30}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-bold">Pen Color -{penColor}</label>
            <input
              type="color"
              onChange={(e) => changePenColor(e.target.value)}
              value={penColor}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div onClick={() => downloadBoard()}>
            <PrimaryButton secondary>Download white Board</PrimaryButton>
          </div>
          <div onClick={() => clearCanvas()}>
            <PrimaryButton secondary>Clear White Board</PrimaryButton>
          </div>

          <div onClick={() => toggleErase()}>
            <PrimaryButton secondary>
              {toggleEraser ? "Remove" : "Use"} Erase
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
