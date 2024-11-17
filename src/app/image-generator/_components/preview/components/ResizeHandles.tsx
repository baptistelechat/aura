import React, { useRef } from "react";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

const ResizeHandles = () => {
  const image = useImageGeneratorStore((s) => s.settings.image);
  const setImage = useImageGeneratorStore((s) => s.setImage);
  const isResizing = useRef(false);
  const initialMousePos = useRef({ x: 0, y: 0 });
  const initialScale = useRef(image.scale);

  const sensitivity = 500; // Plus la valeur est grande, plus les ajustements sont précis.

  const handleResizeStart =
    (direction: string) => (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      isResizing.current = true;
      initialMousePos.current = { x: event.clientX, y: event.clientY };
      initialScale.current = image.scale;

      // Ajoute les listeners pour suivre la souris
      window.addEventListener("mousemove", handleResize(direction));
      window.addEventListener("mouseup", handleResizeEnd);
    };

  const handleResize = (direction: string) => (event: MouseEvent) => {
    if (!isResizing.current) return;

    // Calcul de la différence de position
    const deltaX = event.clientX - initialMousePos.current.x;
    const deltaY = event.clientY - initialMousePos.current.y;

    // Ajustement du sens en fonction de la direction
    let adjustment = 0;
    switch (direction) {
      case "top-left":
      case "left":
      case "bottom-left":
        adjustment = -(deltaX + deltaY); // Inverse l'effet
        break;
      case "top-right":
      case "right":
      case "bottom-right":
        adjustment = deltaX + deltaY; // Effet normal
        break;
      case "top":
        adjustment = -deltaY; // Basé uniquement sur Y
        break;
      case "bottom":
        adjustment = deltaY; // Basé uniquement sur Y
        break;
    }

    // Corrections spécifiques pour diagonales
    if (direction === "top-right") {
      adjustment = deltaX - deltaY; // Prend en compte un mouvement diagonal
    } else if (direction === "bottom-left") {
      adjustment = -deltaX + deltaY; // Prend en compte un mouvement diagonal
    }

    // Ajustement avec la sensibilité
    adjustment /= sensitivity;

    // Mise à jour de l'échelle avec les limites [0, 1]
    const newScale = Math.min(
      1,
      Math.max(0, initialScale.current + adjustment)
    );

    setImage({ scale: newScale });
  };


  const handleResizeEnd = () => {
    isResizing.current = false;

    // Retire les listeners
    window.removeEventListener("mousemove", handleResize("bottom-right"));
    window.removeEventListener("mouseup", handleResizeEnd);
  };

  return (
    <div
      className="absolute left-0 top-0 size-full transition-all duration-300"
      style={{
        transform: `rotateX(${image.rotateX}deg) rotateY(${image.rotateY}deg) rotateZ(${image.rotateZ}deg)`,
      }}
    >
      {/* Top-Left */}
      <div
        className="absolute left-0 top-0 size-5 cursor-nwse-resize bg-red-500/50"
        style={{ transform: "translate(-50%, -50%)" }}
        onMouseDown={handleResizeStart("top-left")}
      />
      {/* Top-Right */}
      <div
        className="absolute right-0 top-0 size-5 cursor-nesw-resize bg-red-500/50"
        style={{ transform: "translate(50%, -50%)" }}
        onMouseDown={handleResizeStart("top-right")}
      />
      {/* Bottom-Left */}
      <div
        className="absolute bottom-0 left-0 size-5 cursor-nesw-resize bg-red-500/50"
        style={{ transform: "translate(-50%, 50%)" }}
        onMouseDown={handleResizeStart("bottom-left")}
      />
      {/* Bottom-Right */}
      <div
        className="absolute bottom-0 right-0 size-5 cursor-nwse-resize bg-red-500/50"
        style={{ transform: "translate(50%, 50%)" }}
        onMouseDown={handleResizeStart("bottom-right")}
      />
      {/* Top */}
      <div
        className="absolute left-1/2 top-0 size-5 cursor-ns-resize bg-red-500/50"
        style={{ transform: "translate(-50%, -50%)" }}
        onMouseDown={handleResizeStart("top")}
      />
      {/* Bottom */}
      <div
        className="absolute bottom-0 left-1/2 size-5 cursor-ns-resize bg-red-500/50"
        style={{ transform: "translate(-50%, 50%)" }}
        onMouseDown={handleResizeStart("bottom")}
      />
      {/* Left */}
      <div
        className="absolute left-0 top-1/2 size-5 cursor-ew-resize bg-red-500/50"
        style={{ transform: "translate(-50%, -50%)" }}
        onMouseDown={handleResizeStart("left")}
      />
      {/* Right */}
      <div
        className="absolute right-0 top-1/2 size-5 cursor-ew-resize bg-red-500/50"
        style={{ transform: "translate(50%, -50%)" }}
        onMouseDown={handleResizeStart("right")}
      />
    </div>
  );
};

export default ResizeHandles;
