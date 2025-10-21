'use client'

import dynamic from 'next/dynamic';
import dogAnimation from '../animations/dog.json';

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => ({ default: mod.Player })), {
  ssr: false,
  loading: () => <div style={{ height: "200px", width: "200px" }} />
});

export default function AnimatedDog() {
  return (
    <Player
      autoplay
      loop
      src={dogAnimation}
      style={{ height: "200px", width: "200px" }}
    />
  );
}
