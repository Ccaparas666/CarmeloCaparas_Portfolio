import { Menu, X, Radio } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#home",     label: "Home",     id: "home"     },
  { href: "#about",    label: "About",    id: "about"    },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#contact",  label: "Contact",  id: "contact"  },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen,        setIsOpen]        = useState(false);
  const [scrolled,      setScrolled]      = useState(false);

  // ── Scroll-position active-link tracking ──────────────────
  useEffect(() => {
    const observers = [];

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Navbar shadow on scroll ────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setActiveSection(id);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300
        ${scrolled
          ? "border-border bg-background/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "border-transparent bg-transparent"
        }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 md:px-12">

        {/* Logo */}
        <a
          href="#home"
          onClick={() => handleNav("home")}
          className="flex items-center gap-2 group"
          aria-label="Go to top"
        >
          <Radio
            size={18}
            className="text-primary group-hover:animate-ping-pulse transition-all"
          />
          <span className="font-mono font-bold tracking-tighter text-lg">
            CARMELO<span className="text-primary">.</span>
          </span>
        </a>

        {/* Desktop nav pills */}
        <div className="hidden lg:flex items-center bg-card/60 border border-border rounded-full px-2 py-1 gap-1">
          {NAV_LINKS.map(({ href, label, id }) => (
            <a
              href={href}
              key={id}
              onClick={() => handleNav(id)}
              className={`text-sm font-mono font-medium py-1.5 px-5 rounded-full transition-all duration-200
                ${activeSection === id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            onClick={() => handleNav("contact")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-bold py-2.5 px-7 rounded-full
                       hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            Contact Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-foreground p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border lg:hidden
                    transition-all duration-300 ease-in-out
                    ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
      >
        <div className="flex flex-col p-6 gap-2">
          {NAV_LINKS.map(({ href, label, id }) => (
            <a
              href={href}
              key={id}
              onClick={() => handleNav(id)}
              className={`font-mono text-base py-3 px-4 rounded-lg border transition-all duration-200
                ${activeSection === id
                  ? "bg-primary/10 border-primary/40 text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => handleNav("contact")}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-center mt-3
                       hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
          >
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
};
