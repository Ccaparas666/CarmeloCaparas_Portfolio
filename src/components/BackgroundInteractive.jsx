import { useState } from "react";

export const BackgroundInteractive = () => {

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  // Get coordinates relative to the section
  const rect = e.currentTarget.getBoundingClientRect();
  setMousePos({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  });
};
    return (
        <>
        </>
    )
}