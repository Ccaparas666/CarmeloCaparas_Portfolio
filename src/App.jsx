import { Home } from "./sections/Home";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { Contact } from "./sections/Contact";
import { Navbar } from "./layout/Navbar";
import { BackgroundInteractive } from "./components/BackgroundInteractive";
import { Footer } from "./layout/Footer";

function App() {
  return (
    <>
      <BackgroundInteractive />
      <Navbar />
      <main className="relative">
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
