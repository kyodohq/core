import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Ecctrl from "ecctrl";
import { Perf } from "r3f-perf";
import Lights from "./lights";
import CharacterModel from "./character";
import Map from "./map";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
];

export const World = () => {
  return (
    <Canvas shadows>
      <Perf position="top-right" />
      <Environment background files="/night.hdr" />
      <Lights />
      <Physics timeStep="vary">
        <Suspense fallback={null}>
          <KeyboardControls map={keyboardMap}>
            <Ecctrl>
              <CharacterModel />
            </Ecctrl>
          </KeyboardControls>
          <Map />
        </Suspense>
      </Physics>
    </Canvas>
  );
};
