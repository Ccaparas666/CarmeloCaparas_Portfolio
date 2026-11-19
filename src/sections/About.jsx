import { useEffect, useRef, useState } from "react";
import {
  Shield, Network, Cloud, Terminal, Wrench,
  Award, Briefcase, ChevronRight
} from "lucide-react";

// ── Skill categories ──────────────────────────────────────────
const SKILL_GROUPS = [
  {
    icon: Network,
    label: "Routing & Switching",
    color: "text-primary",
    skills: ["OSPF", "BGP", "EIGRP", "STP", "VLAN", "VTP", "MPLS", "QoS"],
  },
  {
    icon: Shield,
    label: "Security",
    color: "text-danger",
    skills: ["Firewall", "ACL", "VPN/IPSec", "NAT/PAT", "IDS/IPS", "Zero Trust", "802.1X"],
  },
  {
    icon: Cloud,
    label: "Cloud / Virtualization",
    color: "text-highlight",
    skills: ["AWS VPC", "Azure VNet", "GCP", "VMware", "EVE-NG", "GNS3"],
  },
  {
    icon: Terminal,
    label: "Automation",
    color: "text-success",
    skills: ["Python", "Ansible", "Netmiko", "NAPALM", "Terraform", "YANG/NETCONF"],
  },
  {
    icon: Wrench,
    label: "Tools & Hardware",
    color: "text-muted-foreground",
    skills: ["Cisco IOS/IOS-XE", "Junos", "Wireshark", "SolarWinds", "Zabbix", "PRTG", "pfSense"],
  },
];

// ── Certifications – PLACEHOLDER, replace with real ones ──────
const CERTS = [
  { label: "CCNA",           issuer: "Cisco",     year: "20XX", color: "border-primary/50 text-primary" },
  { label: "CCNP Enterprise",issuer: "Cisco",     year: "20XX", color: "border-primary/50 text-primary" },
  { label: "CompTIA Network+",issuer: "CompTIA",  year: "20XX", color: "border-highlight/50 text-highlight" },
  { label: "AWS SAA",        issuer: "Amazon",    year: "20XX", color: "border-success/50 text-success" },
];

// ── Experience timeline – PLACEHOLDER ─────────────────────────
const TIMELINE = [
  {
    role: "Senior Network Engineer",          // PLACEHOLDER
    company: "Company Name",                  // PLACEHOLDER
    period: "20XX – Present",
    desc: "Managed enterprise WAN/LAN infrastructure, led SD-WAN migration, reduced MTTR by 40%.", // PLACEHOLDER
  },
  {
    role: "Network Engineer",                 // PLACEHOLDER
    company: "Company Name",                  // PLACEHOLDER
    period: "20XX – 20XX",
    desc: "Deployed multi-site OSPF+BGP topology, implemented ACL security policies.", // PLACEHOLDER
  },
  {
    role: "NOC Technician",                   // PLACEHOLDER
    company: "Company Name",                  // PLACEHOLDER
    period: "20XX – 20XX",
    desc: "24/7 monitoring and incident response for 300+ managed devices.", // PLACEHOLDER
  },
];

// ── Animated stat counter ─────────────────────────────────────
const STATS = [
  { value: 5,   suffix: "+", label: "Years Exp."       },  // PLACEHOLDER
  { value: 30,  suffix: "+", label: "Projects"         },  // PLACEHOLDER
  { value: 500, suffix: "+", label: "Devices Managed"  },  // PLACEHOLDER
  { value: 99,  suffix: "%", label: "Uptime SLA"       },  // PLACEHOLDER
];

function useCountUp(target, duration = 1500, shouldStart = false) {
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
  const count = useCountUp(value, 1200, started);
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
  const [sectionRef, sectionVisible] = useFadeIn(0.1);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen scroll-mt-24 section-padding"
      style={{
        opacity:   sectionVisible ? 1 : 0,
        transform: sectionVisible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div className="container mx-auto max-w-6xl">

        {/* Section header */}
        <div className="mb-12">
          <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-2">
            &gt;_ show interface about
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            About <span className="text-primary">Me</span>
          </h2>
        </div>

        {/* Top grid: bio + stat cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">

          {/* Bio */}
          <div className="lg:col-span-2 card-noc border-primary/15 flex flex-col gap-4">
            <div className="terminal-block rounded-md p-3 text-sm">
              <span className="text-primary">$</span>{" "}
              <span className="text-muted-foreground">cat about.txt</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {/* PLACEHOLDER – replace with your actual bio */}
              I&apos;m a network engineer with <strong className="text-foreground">X+ years of experience</strong> designing,
              implementing, and troubleshooting enterprise and service-provider networks.
              I specialize in building resilient multi-site topologies, enforcing security
              policies, and automating repetitive ops tasks with Python and Ansible.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {/* PLACEHOLDER */}
              Whether it&apos;s a BGP route-policy tune-up, a zero-trust firewall rollout,
              or an infrastructure-as-code migration to Terraform, I thrive on solving
              complex problems that keep networks fast, secure, and self-healing.
            </p>

            {/* Key attributes */}
            <div className="flex flex-wrap gap-2 mt-2">
              {["Problem Solver", "Documentation-first", "On-call Ready", "Automation Mindset"].map((t) => (
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
              ["Name",     "Carmelo Caparas"],
              ["Location", "Philippines"],          // PLACEHOLDER
              ["Role",     "Network Engineer"],
              ["Available","Yes — open to roles"],  // PLACEHOLDER
              ["Languages","Filipino, English"],    // PLACEHOLDER
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

        {/* Skills by category */}
        <div className="mb-14">
          <h3 className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-6">
            &gt;_ show skills --all
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

        {/* Certifications */}
        <div className="mb-14">
          <h3 className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <Award size={14} /> Certifications
          </h3>
          <div className="flex flex-wrap gap-4">
            {CERTS.map((c) => (
              <div
                key={c.label}
                className={`card-noc border ${c.color} flex flex-col gap-1 min-w-[140px]`}
              >
                <span className={`font-mono text-sm font-bold ${c.color.split(" ")[1]}`}>
                  {c.label}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {c.issuer} · {c.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience timeline */}
        <div>
          <h3 className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <Briefcase size={14} /> Experience
          </h3>
          <div className="relative border-l border-primary/20 pl-6 flex flex-col gap-8">
            {TIMELINE.map((item, i) => (
              <div key={i} className="relative">
                {/* Dot on timeline */}
                <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-primary/80 border-2 border-background" />
                <div className="card-noc border-border/50 hover:border-primary/30 transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <div>
                      <p className="font-semibold text-foreground flex items-center gap-1">
                        <ChevronRight size={14} className="text-primary" />
                        {item.role}
                      </p>
                      <p className="font-mono text-xs text-primary">{item.company}</p>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded-full whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
