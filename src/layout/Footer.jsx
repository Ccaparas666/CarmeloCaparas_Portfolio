import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
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
        <p className="font-mono text-xs text-muted-foreground order-last md:order-none">
          © {year} Carmelo Caparas — Network Engineer
        </p>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook profile"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <FaFacebook size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};
