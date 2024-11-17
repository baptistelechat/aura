import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import React, { Dispatch, SetStateAction, useRef } from "react";

interface IResizeHandlesProps {
  setIsHover: Dispatch<SetStateAction<boolean>>;
}

const ResizeHandles = ({ setIsHover }: IResizeHandlesProps) => {
  const image = useImageGeneratorStore((s) => s.settings.image);
  const setImage = useImageGeneratorStore((s) => s.setImage);
  const isResizing = useRef(false);
  const initialMousePos = useRef({ x: 0, y: 0 });
  const initialScale = useRef(image.scale);

  const sensitivity = 500;

  const handleResizeStart =
    (direction: string) => (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      isResizing.current = true;
      initialMousePos.current = { x: event.clientX, y: event.clientY };
      initialScale.current = image.scale;

      window.addEventListener("mousemove", handleResize(direction));
      window.addEventListener("mouseup", handleResizeEnd);

      setIsHover(true);
    };

  const handleResize = (direction: string) => (event: MouseEvent) => {
    if (!isResizing.current) return;

    const deltaX = event.clientX - initialMousePos.current.x;
    const deltaY = event.clientY - initialMousePos.current.y;

    let adjustment = 0;
    switch (direction) {
      case "top-left":
      case "left":
      case "bottom-left":
        adjustment = -(deltaX + deltaY);
        break;
      case "top-right":
      case "right":
      case "bottom-right":
        adjustment = deltaX + deltaY;
        break;
      case "top":
        adjustment = -deltaY;
        break;
      case "bottom":
        adjustment = deltaY;
        break;
      case "top-right":
        adjustment = deltaX - deltaY;
        break;
      case "bottom-left":
        adjustment = -deltaX + deltaY;
        break;
    }

    if (direction === "top-right") {
      adjustment = deltaX - deltaY; 
    } else if (direction === "bottom-left") {
      adjustment = -deltaX + deltaY;
    }

    adjustment /= sensitivity;

    const newScale = Math.min(
      1,
      Math.max(0, initialScale.current + adjustment)
    );
    setImage({ scale: newScale });
  };

  const handleResizeEnd = () => {
    isResizing.current = false;
    window.removeEventListener("mousemove", handleResize("bottom-right"));
    window.removeEventListener("mouseup", handleResizeEnd);
    setTimeout(() => setIsHover(false), 500);
  };

  const resizeHandleConfigs = [
    {
      direction: "top-left",
      position: "top-0 left-0",
      cursor: "nwse-resize",
      translate: "-50%, -50%",
    },
    {
      direction: "top-right",
      position: "top-0 right-0",
      cursor: "nesw-resize",
      translate: "50%, -50%",
    },
    {
      direction: "bottom-left",
      position: "bottom-0 left-0",
      cursor: "nesw-resize",
      translate: "-50%, 50%",
    },
    {
      direction: "bottom-right",
      position: "bottom-0 right-0",
      cursor: "nwse-resize",
      translate: "50%, 50%",
    },
    {
      direction: "top",
      position: "top-0 left-1/2",
      cursor: "ns-resize",
      translate: "-50%, -50%",
    },
    {
      direction: "bottom",
      position: "bottom-0 left-1/2",
      cursor: "ns-resize",
      translate: "-50%, 50%",
    },
    {
      direction: "left",
      position: "left-0 top-1/2",
      cursor: "ew-resize",
      translate: "-50%, -50%",
    },
    {
      direction: "right",
      position: "right-0 top-1/2",
      cursor: "ew-resize",
      translate: "50%, -50%",
    },
  ];

  return (
    <div
      className="absolute left-0 top-0 size-full transition-all duration-300"
      style={{
        transform: `rotateX(${image.rotateX}deg) rotateY(${image.rotateY}deg) rotateZ(${image.rotateZ}deg)`,
      }}
    >
      {resizeHandleConfigs.map(({ direction,position, cursor, translate }) => (
        <div
          key={position}
          className={`absolute ${position} size-8 bg-red-500/50`}
          style={{
            cursor,
            transform: `translate(${translate})`,
          }}
          onMouseDown={handleResizeStart(direction)}
        />
      ))}
    </div>
  );
};

export default ResizeHandles;
