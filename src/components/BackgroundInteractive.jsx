import { useState, useEffect, useCallback } from "react";

export const BackgroundInteractive = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {/* Static teal grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(32,178,166,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(32,178,166,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Cursor-revealed bright grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(32,178,166,0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(32,178,166,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          WebkitMaskImage: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      />

      {/* Soft cursor glow */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(32,178,166,0.18), transparent 70%)`,
        }}
      />

      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
    </div>
  );
};
