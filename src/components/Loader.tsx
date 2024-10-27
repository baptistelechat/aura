import React, { useEffect } from "react";

export enum LoaderEnum {
  BOUNCY = "bouncy",
  BOUNCY_ARC = "bouncyArc",
  CARDIO = "cardio",
  CHAOTIC_ORBIT = "chaoticOrbit",
  DOT_PULSE = "dotPulse",
  DOT_SPINNER = "dotSpinner",
  DOT_STREAM = "dotStream",
  DOT_WAVE = "dotWave",
  GRID = "grid",
  HATCH = "hatch",
  HELIX = "helix",
  HOURGLASS = "hourglass",
  INFINITY = "infinity",
  JELLY = "jelly",
  JELLY_TRIANGLE = "jellyTriangle",
  LEAPFROG = "leapfrog",
  LINE_SPINNER = "lineSpinner",
  LINE_WOBBLE = "lineWobble",
  METRONOME = "metronome",
  MIRAGE = "mirage",
  MIYAGI = "miyagi",
  MOMENTUM = "momentum",
  NEWTONS_CRADLE = "newtonsCradle",
  ORBIT = "orbit",
  PING = "ping",
  PINWHEEL = "pinwheel",
  PULSAR = "pulsar",
  QUANTUM = "quantum",
  REULEAUX = "reuleaux",
  RING = "ring",
  RING2 = "ring2",
  RIPPLES = "ripples",
  SPIRAL = "spiral",
  SQUARE = "square",
  SQUIRCLE = "squircle",
  SUPERBALLS = "superballs",
  TAIL_CHASE = "tailChase",
  TAILSPIN = "tailspin",
  TREADMILL = "treadmill",
  TREFOIL = "trefoil",
  TRIO = "trio",
  WAVEFORM = "waveform",
  WOBBLE = "wobble",
  ZOOMIES = "zoomies",
}

export type LoaderProps = {
  loader: LoaderEnum;
  size?: string;
  stroke?: string;
  strokeLength?: string;
  bgOpacity?: string,
  speed?: string;
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loader,
  size = "42",
  stroke = "5",
  strokeLength ="0.15",
  bgOpacity = "0.1",
  speed = "1.2",
  color = "black",
}) => {
  useEffect(() => {
    const load = async () => {
      const ldrsModule = await import("ldrs");
      ldrsModule[loader].register("ldrs-icon");
    };
    load();
  }, [loader]);

  return (
    <div className="">
      <ldrs-icon
        size={size as string}
        stroke={stroke}
        stroke-length={strokeLength}
        bg-opacity={bgOpacity}
        speed={speed}
        color={color}
      ></ldrs-icon>
    </div>
  );
};

export default Loader;
