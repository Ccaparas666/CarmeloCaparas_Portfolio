import { useState, useRef, useEffect } from "react";
import {
  ExternalLink, ChevronDown, ChevronUp,
  Network, Shield, Terminal, Cloud, Server
} from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import dayjs from "dayjs";
import { Edit, Plus, Trash, Save } from "lucide-react";

// ════════════════════════════════════════════════════════════
//  PROJECT DATA  — edit this array to add / change projects
// ════════════════════════════════════════════════════════════
const PROJECTS = [
  {
    id: "p1",
    category: "Networking",
    title: "Enterprise Campus Network Redesign",           // PLACEHOLDER
    description:
      "Full redesign of a 3-tier campus network: collapsed core with VSS, distribution with OSPF, and access with 802.1X port-auth and VLAN segmentation.",  // PLACEHOLDER
    tags: ["Cisco IOS-XE", "OSPF", "VSS", "802.1X", "VLAN", "QoS"],
    icon: Network,
    results: ["↓ 35% latency", "99.98% uptime achieved", "0 L2 loops post-STP hardening"],  // PLACEHOLDER
    github: "https://github.com/",   // PLACEHOLDER
    caseStudy: "",                   // PLACEHOLDER — leave blank to hide button
  },
  {
    id: "p2",
    category: "Security",
    title: "Zero-Trust Firewall Deployment",               // PLACEHOLDER
    description:
      "Deployed a next-gen firewall cluster with app-aware policies, TLS inspection, IPS tuning, and automated threat feed integration via Ansible.",  // PLACEHOLDER
    tags: ["Palo Alto", "Ansible", "IPS", "TLS Inspection", "SIEM"],
    icon: Shield,
    results: ["Blocked 12k threats in 30 days", "Reduced attack surface 60%", "Automated FW rule audits"],  // PLACEHOLDER
    github: "https://github.com/",   // PLACEHOLDER
    caseStudy: "",
  },
  {
    id: "p3",
    category: "Automation",
    title: "Network Automation Pipeline",                  // PLACEHOLDER
    description:
      "Built a Python + Ansible pipeline that provisions new branch VLANs, generates documentation, and validates configs against a golden template on every push.",  // PLACEHOLDER
    tags: ["Python", "Ansible", "Netmiko", "Git", "NAPALM", "Jinja2"],
    icon: Terminal,
    results: ["Provisioning time: 4h → 8min", "Zero config drift", "100% coverage on 80 devices"],  // PLACEHOLDER
    github: "https://github.com/",   // PLACEHOLDER
    caseStudy: "",
  },
  {
    id: "p4",
    category: "Cloud",
    title: "Multi-Cloud SD-WAN Overlay",                   // PLACEHOLDER
    description:
      "Designed a Cisco SD-WAN fabric bridging on-prem data centre, AWS VPC, and Azure VNet with application-aware routing and centralised policy management.",  // PLACEHOLDER
    tags: ["Cisco SD-WAN", "AWS VPC", "Azure VNet", "BGP", "IPSec"],
    icon: Cloud,
    results: ["↓ 40% WAN cost", "BFD sub-second failover", "Unified vManage dashboard"],  // PLACEHOLDER
    github: "https://github.com/",   // PLACEHOLDER
    caseStudy: "",
  },
  {
    id: "p5",
    category: "Networking",
    title: "ISP Core BGP Route Optimisation",              // PLACEHOLDER
    description:
      "Analysed BGP routing tables of an ISP, implemented route-maps and community filtering to enforce traffic engineering policies and reduce transit costs.",  // PLACEHOLDER
    tags: ["BGP", "Route-maps", "Communities", "Junos", "RPKI"],
    icon: Server,
    results: ["↓ 25% transit cost", "Improved peering ratio 3:1", "Full RPKI ROV in 2 weeks"],  // PLACEHOLDER
    github: "https://github.com/",   // PLACEHOLDER
    caseStudy: "",
  },
];

const FILTERS = ["All", "Networking", "Security", "Automation", "Cloud"];

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
  const { title, description, tags, icon: CardIcon, results, github, caseStudy } = project;

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
          <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
            {project.category}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{description}</p>

      {/* Key results */}
      <div className="flex flex-col gap-1">
        {results.map((r) => (
          <p key={r} className="font-mono text-xs text-success flex items-center gap-1.5">
            <span className="text-primary">▸</span> {r}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span key={t} className="tag-chip">{t}</span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 pt-1 border-t border-border mt-auto">
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
        {caseStudy && (
          <a
            href={caseStudy}
            target="_blank"
            rel="noreferrer"
            aria-label={`Case study for ${title}`}
            className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-highlight transition-colors duration-200"
          >
            <ExternalLink size={13} /> Case Study
          </a>
        )}
      </div>
    </article>
  );
}

// ── Playground (todo app) collapsible ─────────────────────────
function Playground() {
  const [open, setOpen] = useState(false);
  const [inputTodoList, setInputTodoList] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  function handleKeyDown(event) {
    if (event.key === "Enter") addTodoList();
  }

  function addTodoList() {
    if (!inputTodoList.trim()) return;
    setTodoList((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        todo: inputTodoList.trim(),
        date: dayjs().format("MMM D, YYYY"),
      },
    ]);
    setInputTodoList("");
  }

  function deleteTodo(id) {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  }

  function editTodo(id, currentValue) {
    setEditingId(id);
    setEditValue(currentValue ?? "");
  }

  function saveEdit(id) {
    setTodoList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, todo: editValue } : item))
    );
    setEditingId(null);
  }

  return (
    <div className="card-noc border-border/50 mt-16">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Terminal size={15} className="text-muted-foreground" />
          mini_apps / playground — task tracker demo
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div className="mt-5 flex flex-col gap-4">
          <div className="terminal-block rounded-md p-3 text-xs">
            <span className="text-primary">$</span>{" "}
            <span>todo-cli --list-all</span>
          </div>

          {/* Input row */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="New task…"
              className="flex-1 min-w-0 px-4 py-2 rounded-lg bg-terminal border border-border text-foreground
                         font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              value={inputTodoList}
              onChange={(e) => setInputTodoList(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="New task input"
            />
            <button
              className="flex items-center gap-2 bg-primary text-primary-foreground py-2 px-5 rounded-lg font-mono text-sm
                         hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
              onClick={addTodoList}
              aria-label="Add task"
            >
              <Plus size={15} /> ADD
            </button>
          </div>

          {/* Todo list */}
          <div className="divide-y divide-border">
            {todoList.length === 0 && (
              <p className="font-mono text-xs text-muted-foreground py-4 text-center">
                No tasks. Add one above.
              </p>
            )}
            {todoList.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3">
                <div className="flex-1 min-w-0">
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => saveEdit(item.id)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(item.id)}
                      className="w-full bg-terminal border border-primary/50 rounded px-2 py-1 text-sm font-mono focus:outline-none"
                      aria-label={`Edit task: ${item.todo}`}
                      autoFocus
                    />
                  ) : (
                    <p className="text-sm text-foreground truncate">{item.todo}</p>
                  )}
                  <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{item.date}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {editingId === item.id ? (
                    <button
                      onClick={() => saveEdit(item.id)}
                      aria-label="Save task"
                      className="text-success hover:text-success/80 transition-colors"
                    >
                      <Save size={15} strokeWidth={2.5} />
                    </button>
                  ) : (
                    <button
                      onClick={() => editTodo(item.id, item.todo)}
                      aria-label={`Edit task: ${item.todo}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Edit size={15} strokeWidth={2.5} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo(item.id)}
                    aria-label={`Delete task: ${item.todo}`}
                    className="text-muted-foreground hover:text-danger transition-colors"
                  >
                    <Trash size={15} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────
export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sectionRef, sectionVisible] = useFadeIn(0.05);

  const filtered = PROJECTS.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
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
            &gt;_ show projects --verbose
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Network <span className="text-primary">Projects</span>
          </h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 80} />
          ))}
        </div>

        {/* Playground */}
        <Playground />
      </div>
    </section>
  );
};
