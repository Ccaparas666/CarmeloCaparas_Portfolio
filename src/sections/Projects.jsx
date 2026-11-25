import { useState, useRef, useEffect } from "react";
import { Network, HardDrive, Server, Cloud, ExternalLink } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

// ════════════════════════════════════════════════════════════
//  PROJECTS & PRACTICAL EXPERIENCE
// ════════════════════════════════════════════════════════════
const PROJECTS = [
  {
    id: "ad-homelab",
    filterGroup: "Personal / HomeLab",
    badge: "Ongoing personal project",
    title: "Enterprise Active Directory HomeLab",
    description:
      "Building a simulated corporate IT environment to develop practical enterprise systems administration skills.",
    tags: [
      "Windows Server Core",
      "Active Directory Domain Services",
      "DNS",
      "Organizational Units",
      "Domain-joined workstations",
      "PowerShell",
      "RSAT",
      "VMware Workstation Pro",
    ],
    icon: Server,
    scope: "Personal HomeLab learning environment",
    github: "",
    liveUrl: "",
  },
  {
    id: "nas-migration",
    filterGroup: "Professional Experience",
    badge: "Professional experience",
    title: "NAS Data Migration",
    description:
      "Supported NAS data migration and file-sharing operations using TrueNAS CORE, SMB and Robocopy.",
    tags: ["TrueNAS CORE", "SMB", "Robocopy", "Windows Server"],
    icon: HardDrive,
    scope: "Production storage & file-sharing operations",
    github: "",
    liveUrl: "",
  },
  {
    id: "network-ops",
    filterGroup: "Professional Experience",
    badge: "Professional experience",
    title: "Network Infrastructure Operations",
    description:
      "Hands-on experience troubleshooting LAN/WAN connectivity, Cisco switches, pfSense firewalls, dual ISP failover, network latency and packet loss.",
    tags: [
      "Cisco Catalyst 2960/3650",
      "pfSense",
      "Dual ISP Failover",
      "WinMTR",
      "LAN/WAN",
    ],
    icon: Network,
    scope: "Enterprise network monitoring & incident resolution",
    github: "",
    liveUrl: "",
  },
  {
    id: "cloud-portfolio",
    filterGroup: "Personal / HomeLab",
    badge: "Personal project",
    title: "Cloud-Hosted Personal Portfolio",
    description:
      "Personal portfolio website hosted on Azure Static Web Apps.",
    tags: ["React", "Vite", "Tailwind CSS", "GitHub", "Azure Static Web Apps"],
    icon: Cloud,
    scope: "Static web deployment via GitHub & Azure",
    github: "https://github.com/Ccaparas666/CarmeloCaparas_Portfolio",
    liveUrl: "",
  },
];

const FILTERS = ["All", "Professional Experience", "Personal / HomeLab"];

// ── Fade-in hook ──────────────────────────────────────────────
function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Project card ──────────────────────────────────────────────
function ProjectCard({ project, delay }) {
  const [cardRef, visible] = useFadeIn(0.1);
  const { title, badge, description, tags, icon: CardIcon, scope, github, liveUrl } = project;
  const isProfessional = project.filterGroup === "Professional Experience";

  return (
    <article
      ref={cardRef}
      className="group card-noc border-border/60 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10
                 hover:-translate-y-1 relative overflow-hidden flex flex-col gap-4"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms, box-shadow 0.3s, border-color 0.3s, translate 0.3s`,
      }}
    >
      {/* Packet-sweep hover effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent
                   -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
      />

      {/* Card header */}
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
          <CardIcon size={18} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-base leading-tight">{title}</h3>
          <span
            className={`font-mono text-[10px] uppercase tracking-widest inline-block mt-1 ${
              isProfessional ? "text-primary" : "text-highlight"
            }`}
          >
            {badge}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{description}</p>

      {/* Scope */}
      <p className="font-mono text-xs text-success flex items-center gap-1.5">
        <span className="text-primary">▸</span> {scope}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span key={t} className="tag-chip">{t}</span>
        ))}
      </div>

      {/* Links (only if present) */}
      {(github || liveUrl) && (
        <div className="flex gap-4 pt-2 border-t border-border mt-auto">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              aria-label={`GitHub repository for ${title}`}
              className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Github size={13} /> GitHub
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Live link for ${title}`}
              className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-highlight transition-colors duration-200"
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
      )}
    </article>
  );
}

// ── Main component ─────────────────────────────────────────────
export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sectionRef, sectionVisible] = useFadeIn(0.05);

  const filtered = PROJECTS.filter(
    (p) => activeFilter === "All" || p.filterGroup === activeFilter
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen scroll-mt-24 section-padding"
      style={{
        opacity: sectionVisible ? 1 : 0,
        transition: "opacity 0.6s ease-out",
      }}
    >
      <div className="container mx-auto max-w-6xl">

        {/* Section header */}
        <div className="mb-10">
          <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-2">
            &gt;_ show projects --practical-experience
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Projects &amp; <span className="text-primary">Practical Experience</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-2xl">
            Production IT operations separated from personal HomeLab and self-hosted learning projects.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Project category filter"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              onClick={() => setActiveFilter(f)}
              className={`font-mono text-xs py-1.5 px-4 rounded-full border transition-all duration-200
                ${activeFilter === f
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
};
