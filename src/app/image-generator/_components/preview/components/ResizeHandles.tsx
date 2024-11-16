import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

const ResizeHandles = () => {
  const image = useImageGeneratorStore((s) => s.settings.image);

  const handleResize = (direction: string) => (event: React.MouseEvent) => {
    console.log(`Mouse position: ${event.clientX}, ${event.clientY}`);
    console.log("Direction:", direction);
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
        onMouseDown={handleResize("top-left")}
      />
      {/* Top-Right */}
      <div
        className="absolute right-0 top-0 size-5 cursor-nesw-resize bg-red-500/50"
        style={{ transform: "translate(50%, -50%)" }}
        onMouseDown={handleResize("top-right")}
      />
      {/* Bottom-Left */}
      <div
        className="absolute bottom-0 left-0 size-5 cursor-nesw-resize bg-red-500/50"
        style={{ transform: "translate(-50%, 50%)" }}
        onMouseDown={handleResize("bottom-left")}
      />
      {/* Bottom-Right */}
      <div
        className="absolute bottom-0 right-0 size-5 cursor-nwse-resize bg-red-500/50"
        style={{ transform: "translate(50%, 50%)" }}
        onMouseDown={handleResize("bottom-right")}
      />
      {/* Top */}
      <div
        className="absolute left-1/2 top-0 size-5 cursor-ns-resize bg-red-500/50"
        style={{ transform: "translate(-50%, -50%)" }}
        onMouseDown={handleResize("top")}
      />
      {/* Bottom */}
      <div
        className="absolute bottom-0 left-1/2 size-5 cursor-ns-resize bg-red-500/50"
        style={{ transform: "translate(-50%, 50%)" }}
        onMouseDown={handleResize("bottom")}
      />
      {/* Left */}
      <div
        className="absolute left-0 top-1/2 size-5 cursor-ew-resize bg-red-500/50"
        style={{ transform: "translate(-50%, -50%)" }}
        onMouseDown={handleResize("left")}
      />
      {/* Right */}
      <div
        className="absolute right-0 top-1/2 size-5 cursor-ew-resize bg-red-500/50"
        style={{ transform: "translate(50%, -50%)" }}
        onMouseDown={handleResize("right")}
      />
    </div>
  );
};

export default ResizeHandles;
