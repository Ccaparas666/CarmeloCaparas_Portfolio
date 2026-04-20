
import { Home } from "./sections/Home"
import { About } from "./sections/About"
import { Projects } from "./sections/Projects"
import { Contact } from "./sections/Contact"
import { Navbar } from "./layout/Navbar"
import { useState } from "react"
function App() {
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
      <div className="min-h-screen overflow-x-hidden grid-background" onMouseMove={handleMouseMove} style={{
        // These variables tell CSS where the mouse is
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
      }}>
        {/* --- INTERACTIVE GRID SYSTEM --- */}
        <div>
          {/* Layer 2: The High-Contrast Colored Grid (Visible only on hover) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                             linear-gradient(to right, #3b82f6 1px, transparent 1px), 
                            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
                         `, // Note: I used #3b82f6 (Blue 500) here to guarantee you see the color change. Replace with your primary.
              backgroundSize: '40px 40px',
              WebkitMaskImage: `radial-gradient(150px circle at ${mousePos.x - (mousePos.x / 50)}px ${mousePos.y - (mousePos.y / 50)}px, black 0%, transparent 100%)`,
              maskImage: `radial-gradient(150px circle at ${mousePos.x - (mousePos.x / 50)}px ${mousePos.y - (mousePos.y / 50)}px, black 0%, transparent 100%)`,
            }}
          />

          {/* Layer 3: A soft glow "glow stick" effect under the mouse */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(100px circle at ${mousePos.x - (mousePos.x / 50)}px ${mousePos.y - (mousePos.y / 50)}px, rgba(59, 130, 246, 0.3), transparent 70%)`,
            }}
          />
        </div>
        <Navbar />
        <main>
          {/* sections */}
          <Home />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  )
}

export default App
