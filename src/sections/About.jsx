import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Shield, Network, HardDrive, Headphones,
  Award, Briefcase, GraduationCap, ChevronRight, X, ZoomIn
} from "lucide-react";
import certCcnaFundamentals from "../assets/cert-ccna-fundamentals.jpg";
import certCiscoPacketTracer from "../assets/cert-cisco-packet-tracer.jpg";
import certUdemyWebdev from "../assets/cert-udemy-webdev.jpg";

// ── Technical Skills ──────────────────────────────────────────
const SKILL_GROUPS = [
  {
    icon: Network,
    label: "Networking",
    color: "text-primary",
    skills: [
      "LAN/WAN",
      "TCP/IP",
      "Cisco Catalyst 2960 and 3650",
      "Dual ISP failover",
      "Packet loss and latency diagnostics",
      "WinMTR",
      "Cisco Packet Tracer",
    ],
  },
  {
    icon: Shield,
    label: "Systems Administration & Security",
    color: "text-highlight",
    skills: [
      "Windows Server",
      "Active Directory",
      "DNS",
      "pfSense / Netgate",
      "pfBlockerNG",
      "Firewall policy administration",
      "Traffic prioritization",
      "PowerShell",
    ],
  },
  {
    icon: HardDrive,
    label: "Storage & Communications",
    color: "text-success",
    skills: [
      "TrueNAS CORE",
      "SMB file sharing",
      "NAS data migration",
      "Robocopy",
      "8x8 Work",
      "VoIP Studio",
      "VoIP troubleshooting",
    ],
  },
  {
    icon: Headphones,
    label: "Technical Support",
    color: "text-primary",
    skills: [
      "Windows and macOS",
      "Hardware and software troubleshooting",
      "Ticketing systems",
      "Preventive maintenance",
      "Incident resolution",
      "Vendor and ISP coordination",
    ],
  },
];

// ── Training & Course Certificates ────────────────────────────
const CERTIFICATES = [
  {
    id: "cert-ccna-fundamentals",
    title: "Learn CCNA 200-301 Network Fundamentals Online",
    issuer: "Simplilearn SkillUp",
    date: "November 2026",
    type: "Course Completion Certificate",
    image: certCcnaFundamentals,
    summary:
      "Completed online foundational training covering CCNA 200-301 networking concepts, IP addressing, routing, switching, and network fundamentals.",
    color: "border-primary/40 text-primary",
  },
  {
    id: "cert-packet-tracer",
    title: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "September 2026",
    type: "Course Completion Certificate",
    image: certCiscoPacketTracer,
    summary:
      "Completed hands-on introductory training on simulating, configuring, and troubleshooting network topologies using Cisco Packet Tracer.",
    color: "border-highlight/40 text-highlight",
  },
  {
    id: "cert-web-dev",
    title: "CSS, Bootstrap, JavaScript, Web Development Course",
    issuer: "Udemy",
    date: "February 2024",
    type: "Course Completion Certificate",
    image: certUdemyWebdev,
    summary:
      "Completed practical web development coursework covering responsive styling, CSS, Bootstrap, and JavaScript fundamentals.",
    color: "border-success/40 text-success",
  },
];

// ── Professional Experience ───────────────────────────────────
const TIMELINE = [
  {
    role: "IT Officer | Network & Infrastructure",
    company: "Thinklogic Media Group (TMG)",
    period: "September 2026 – Present",
    bullets: [
      "Monitor and troubleshoot LAN/WAN connectivity, packet loss, latency, ISP performance and dual-WAN failover.",
      "Configure and troubleshoot Cisco switches, routers and network devices.",
      "Administer pfSense firewall policies and traffic prioritization.",
      "Manage Windows Server services, Active Directory user accounts, domain services and DNS.",
      "Maintain TrueNAS storage and SMB file shares.",
      "Support NAS data migration using Robocopy.",
      "Troubleshoot 8x8 Work and VoIP Studio connectivity and call quality issues.",
      "Coordinate incident escalation with ISPs and technology vendors.",
      "Perform infrastructure monitoring, preventive maintenance and technical support.",
    ],
  },
  {
    role: "IT Support Technician",
    company: "Lourdes College",
    period: "July 2024 – April 2026",
    bullets: [
      "Provided hardware, software and network support to a campus community of 500+ end users.",
      "Resolved technical issues through tickets, walk-ins and email.",
      "Installed, configured and maintained computers, printers and peripherals.",
      "Performed monthly preventive maintenance and software updates.",
      "Created and managed student accounts and ID records.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Lourdes College",
    period: "January 2024 – May 2024",
    bullets: [
      "Assisted with web application development.",
      "Supported system migration, testing and debugging.",
      "Collaborated with a development team in an agile environment.",
    ],
  },
];

// ── Education ─────────────────────────────────────────────────
const EDUCATION = {
  degree: "Bachelor of Science in Information Technology – Web Development",
  school: "Lourdes College",
  period: "May 2019 – May 2024",
};

// ── Verified summary counters ─────────────────────────────────
const STATS = [
  { value: 2,   suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Campus End Users" },
  { value: 3,   suffix: "",  label: "IT & Support Roles" },
  { value: 3,   suffix: "",  label: "Course Certificates" },
];

function useCountUp(target, duration = 1200, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, shouldStart]);

  return count;
}

function StatCard({ value, suffix, label, started }) {
  const count = useCountUp(value, 1100, started);
  return (
    <div className="card-noc text-center border-primary/20 hover:border-primary/40 transition-colors duration-200">
      <p className="font-mono text-3xl md:text-4xl font-black text-primary">
        {count}{suffix}
      </p>
      <p className="font-mono text-xs text-muted-foreground mt-1 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

// ── Section fade-in hook ───────────────────────────────────────
function useFadeIn(threshold = 0.15) {
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

// ── Main component ─────────────────────────────────────────────
export const About = () => {
  const [sectionRef, sectionVisible] = useFadeIn(0.08);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    if (selectedCert) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedCert]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen scroll-mt-24 section-padding"
      style={{
        opacity:   sectionVisible ? 1 : 0,
        transform: sectionVisible ? "none" : "translateY(32px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div className="container mx-auto max-w-6xl">

        {/* Section header */}
        <div className="mb-12">
          <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-2">
            &gt;_ show interface profile
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            About <span className="text-primary">Me</span>
          </h2>
        </div>

        {/* Top grid: bio + quick info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">

          {/* Bio */}
          <div className="lg:col-span-2 card-noc border-primary/15 flex flex-col gap-4">
            <div className="terminal-block rounded-md p-3 text-sm">
              <span className="text-primary">$</span>{" "}
              <span className="text-muted-foreground">cat summary.txt</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              IT Officer with over two years of professional IT experience in end-user
              support, network troubleshooting and infrastructure operations. Hands-on
              experience with Cisco switches, pfSense firewalls, Windows Server, Active
              Directory, DNS, NAS storage and VoIP systems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Experienced in incident resolution, preventive maintenance and vendor
              coordination, with a background supporting a campus community of 500+
              end users.
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "Network Troubleshooting",
                "Infrastructure Operations",
                "Incident Resolution",
                "Vendor & ISP Coordination",
              ].map((t) => (
                <span key={t} className="tag-chip">{t}</span>
              ))}
            </div>
          </div>

          {/* Quick info panel */}
          <div className="card-noc border-primary/15 font-mono text-sm flex flex-col gap-3">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
              whois carmelo
            </p>
            {[
              ["Name",     "Carmelo A. Caparas Jr."],
              ["Title",    "IT Officer | Network & Infrastructure"],
              ["Location", "Cagayan de Oro City, Philippines"],
              ["Exp.",     "2+ years"],
              ["Degree",   "BSIT – Web Development"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2 text-xs">
                <span className="text-muted-foreground w-20 shrink-0">{k}</span>
                <span className="text-foreground">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stat counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} started={sectionVisible} />
          ))}
        </div>

        {/* Technical Skills */}
        <div className="mb-14">
          <h3 className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-6">
            &gt;_ show skills --all
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SKILL_GROUPS.map(({ icon: SkillIcon, label, color, skills }) => ( // eslint-disable-line no-unused-vars
              <div
                key={label}
                className="card-noc border-border/60 hover:border-primary/30 transition-colors duration-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <SkillIcon size={16} className={color} />
                  <span className={`font-mono text-xs font-semibold uppercase tracking-wider ${color}`}>
                    {label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span key={s} className="tag-chip">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Experience timeline */}
        <div className="mb-14">
          <h3 className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <Briefcase size={14} /> Professional Experience
          </h3>
          <div className="relative border-l border-primary/20 pl-6 flex flex-col gap-8">
            {TIMELINE.map((item, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-primary/80 border-2 border-background" />
                <div className="card-noc border-border/50 hover:border-primary/30 transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <p className="font-semibold text-foreground flex items-center gap-1">
                        <ChevronRight size={14} className="text-primary shrink-0" />
                        {item.role}
                      </p>
                      <p className="font-mono text-xs text-primary">{item.company}</p>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground border border-border px-2.5 py-0.5 rounded-full whitespace-nowrap self-start sm:self-center">
                      {item.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-muted-foreground text-sm leading-relaxed">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="text-primary font-mono text-xs mt-1">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-14">
          <h3 className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <GraduationCap size={14} /> Education
          </h3>
          <div className="card-noc border-primary/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="font-semibold text-foreground">{EDUCATION.degree}</p>
              <p className="font-mono text-xs text-primary mt-1">{EDUCATION.school}</p>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground border border-border px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-center">
              {EDUCATION.period}
            </span>
          </div>
        </div>

        {/* Training & Course Certificates */}
        <div>
          <h3 className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
            <Award size={14} /> Training &amp; Course Certificates
          </h3>
          <p className="font-mono text-xs text-muted-foreground mb-6">
            Course completions and technical training — click any card for enlarged details.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CERTIFICATES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCert(c)}
                className={`group card-noc border ${c.color} text-left flex flex-col justify-between gap-3 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 overflow-hidden`}
              >
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-border bg-terminal">
                  <img
                    src={c.image}
                    alt={`${c.title} certificate`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-200 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 font-mono text-xs bg-background/90 text-primary border border-primary/40 px-3 py-1.5 rounded-full">
                      <ZoomIn size={13} /> View Certificate
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">
                    {c.type}
                  </span>
                  <span className="font-semibold text-sm text-foreground leading-snug block">
                    {c.title}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/60 w-full">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {c.issuer} · {c.date}
                  </span>
                  <ZoomIn size={13} className="text-primary shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enlarged certificate modal (portaled to body so fixed positioning is always viewport-centered) */}
      {selectedCert &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
          >
            <div
              className="card-noc border-primary/40 max-w-3xl w-full shadow-2xl relative flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 pb-3 border-b border-border">
                <div>
                  <p className="font-mono text-[11px] text-primary uppercase tracking-widest">
                    {selectedCert.type}
                  </p>
                  <h4 id="cert-modal-title" className="text-lg font-bold text-foreground mt-1">
                    {selectedCert.title}
                  </h4>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">
                    {selectedCert.issuer} · {selectedCert.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate details"
                  className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="rounded-lg overflow-hidden border border-border bg-terminal">
                <img
                  src={selectedCert.image}
                  alt={`${selectedCert.title} enlarged certificate`}
                  className="w-full h-auto max-h-[65vh] object-contain mx-auto"
                />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedCert.summary}
              </p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
