
import { Home } from "./sections/Home"
import { About } from "./sections/About"
import { Projects } from "./sections/Projects"
import { Contact } from "./sections/Contact"
import { Navbar } from "./layout/Navbar"

function App() {

  return (
    <>
      <div className="min-h-screen overflow-x-hidden">
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
