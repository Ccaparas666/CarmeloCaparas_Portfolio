import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Activity } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/40 backdrop-blur-sm">
      <div className="container mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* System status */}
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Activity size={14} className="text-success animate-pulse" />
          <span>
            system status:{" "}
            <span className="text-success font-medium">all systems operational</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="font-mono text-xs text-muted-foreground order-last md:order-none text-center">
          © {year} Carmelo A. Caparas Jr. — IT Officer | Network &amp; Infrastructure
        </p>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:carcapz123@gmail.com"
            aria-label="Send email to Carmelo A. Caparas Jr."
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <FaEnvelope size={18} />
          </a>
          <a
            href="https://github.com/Ccaparas666"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/carmelo-caparas-jr-4399a9289/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};
