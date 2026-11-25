import { useEffect, useRef, useState } from "react";
import { SquareKanban, ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import heroNetworkImg from "../assets/hero-network-setup.jpg";

// ── Typing subtitle strings ───────────────────────────────────
const SUBTITLES = [
  "IT Officer",
  "Network & Infrastructure",
  "Systems & Firewall Admin",
  "Technical Support",
];

function useTypingEffect(strings, typingSpeed = 70, pauseMs = 1800, deletingSpeed = 40) {
  const [displayed, setDisplayed] = useState("");
  const [strIdx,    setStrIdx]    = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[strIdx];
    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIdx === current.length) {
      delay = pauseMs;
    } else if (isDeleting && charIdx === 0) {
      setTimeout(() => {
        setIsDeleting(false);
        setStrIdx((i) => (i + 1) % strings.length);
      }, 0);
      return;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charIdx < current.length) {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!isDeleting && charIdx === current.length) {
        setIsDeleting(true);
      } else if (isDeleting) {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, strIdx, strings, typingSpeed, pauseMs, deletingSpeed]);

  return displayed;
}

// ── Mini topology SVG ─────────────────────────────────────────
const NODES = [
  { id: "inet",    x: 50,  y: 30,  label: "DUAL-ISP", type: "cloud"   },
  { id: "fw",      x: 50,  y: 110, label: "PFSENSE",  type: "router"  },
  { id: "core",    x: 50,  y: 190, label: "CAT-SW",   type: "switch"  },
  { id: "access1", x: 15,  y: 265, label: "AD-DNS",   type: "server"  },
  { id: "access2", x: 85,  y: 265, label: "VOIP",     type: "switch"  },
  { id: "srv",     x: 50,  y: 265, label: "TRUENAS",  type: "server"  },
];

const LINKS = [
  { from: "inet",  to: "fw"      },
  { from: "fw",    to: "core"    },
  { from: "core",  to: "access1" },
  { from: "core",  to: "access2" },
  { from: "core",  to: "srv"     },
];

const NODE_ICONS = {
  cloud:  "☁",
  router: "⬡",
  switch: "▣",
  server: "▬",
};

function Packet({ x1, y1, x2, y2, duration, delay }) {
  const pathRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const pathEl = pathRef.current;
    const circEl = circleRef.current;
    if (!pathEl || !circEl) return;

    const len = pathEl.getTotalLength();
    let startTime = null;
    let rafId;

    const animate = (ts) => {
      if (!startTime) startTime = ts + delay;
      const elapsed = ts - startTime;
      if (elapsed < 0) { rafId = requestAnimationFrame(animate); return; }

      const progress = (elapsed % duration) / duration;
      const pt = pathEl.getPointAtLength(progress * len);
      circEl.setAttribute("cx", pt.x);
      circEl.setAttribute("cy", pt.y);

      const alpha = progress < 0.1
        ? progress / 0.1
        : progress > 0.85
        ? (1 - progress) / 0.15
        : 1;
      circEl.setAttribute("opacity", alpha.toFixed(2));

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [x1, y1, x2, y2, duration, delay]);

  return (
    <>
      <path
        ref={pathRef}
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        fill="none"
        stroke="none"
      />
      <circle
        ref={circleRef}
        r={2.2}
        fill="#20b2a6"
        cx={x1}
        cy={y1}
      />
    </>
  );
}

function TopologySVG() {
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 100 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Network infrastructure topology diagram"
      className="w-full h-full"
    >
      {LINKS.map(({ from, to }) => {
        const a = nodeMap[from], b = nodeMap[to];
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x} y1={a.y}
            x2={b.x} y2={b.y}
            stroke="rgba(32,178,166,0.3)"
            strokeWidth={0.8}
            strokeDasharray="2 2"
          />
        );
      })}

      {LINKS.map(({ from, to }, i) => {
        const a = nodeMap[from], b = nodeMap[to];
        return (
          <Packet
            key={`pkt-${i}`}
            x1={a.x} y1={a.y}
            x2={b.x} y2={b.y}
            duration={2200 + i * 400}
            delay={i * 600}
          />
        );
      })}

      {NODES.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x} cy={n.y} r={8}
            fill="none"
            stroke="rgba(32,178,166,0.15)"
            strokeWidth={4}
          />
          <circle
            cx={n.x} cy={n.y} r={5}
            fill="#141a1f"
            stroke="#20b2a6"
            strokeWidth={0.9}
          />
          <text
            x={n.x} y={n.y + 1.5}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="4.5"
            fill="#20b2a6"
          >
            {NODE_ICONS[n.type]}
          </text>
          <text
            x={n.x + (n.x < 40 ? -11 : n.x > 60 ? 11 : 0)}
            y={n.y + (n.x < 40 || n.x > 60 ? 1 : -9)}
            textAnchor={n.x < 40 ? "end" : n.x > 60 ? "start" : "middle"}
            dominantBaseline="middle"
            fontSize="4"
            fill="rgba(163,228,215,0.8)"
            fontFamily="JetBrains Mono, monospace"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Signal-ring overlay on the photo ──────────────────────────
function SignalRings() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border border-primary/30"
          style={{
            width:  `${60 + i * 24}%`,
            height: `${60 + i * 24}%`,
            animationName: "ping-pulse",
            animationDuration: `${1.6 + i * 0.5}s`,
            animationTimingFunction: "ease-out",
            animationIterationCount: "infinite",
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Main Home component ────────────────────────────────────────
export const Home = () => {
  const subtitle = useTypingEffect(SUBTITLES);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center scroll-mt-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-28 lg:py-20">

        {/* ── Left column: text ──────────────────────────────── */}
        <div className="flex flex-col gap-7 text-center lg:text-start items-center lg:items-start order-2 lg:order-1">

          {/* Status pill */}
          <div className="status-pill border-success/40 bg-success/10 text-success">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse inline-block" />
            ONLINE · Cagayan de Oro City, PH
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <p className="font-mono text-sm text-primary tracking-[0.2em] uppercase">
              Carmelo A. Caparas Jr.
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.92]">
              IT
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-300">
                OFFICER
              </span>
            </h1>

            {/* Typing subtitle */}
            <div className="h-8 flex items-center justify-center lg:justify-start">
              <span className="font-mono text-base md:text-lg text-muted-foreground">
                &gt;_ {subtitle}
                <span
                  aria-hidden="true"
                  style={{ animationName: "blink", animationDuration: "1s", animationTimingFunction: "step-end", animationIterationCount: "infinite" }}
                  className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
                />
              </span>
            </div>
          </div>

          {/* Body copy */}
          <p className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed">
            IT Officer with 2+ years of hands-on experience in end-user support,
            network troubleshooting, and infrastructure operations — working with
            Cisco switches, pfSense firewalls, Windows Server, Active Directory,
            TrueNAS, and VoIP systems.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 px-8 rounded-full font-bold shadow-lg shadow-primary/20
                         hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              View Experience &amp; Labs <SquareKanban size={18} />
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary py-3.5 px-8 rounded-full font-bold
                         hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              Contact Me <ExternalLink size={18} />
            </a>
          </div>

          {/* Social links */}
          <div className="flex justify-center lg:justify-start items-center gap-5 mt-1">
            {[
              { href: "mailto:carcapz123@gmail.com", Icon: FaEnvelope, label: "Email Carmelo" },
              { href: "https://github.com/Ccaparas666", Icon: FaGithub, label: "GitHub" },
              { href: "https://www.linkedin.com/in/carmelo-caparas-jr-4399a9289/", Icon: FaLinkedin, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => ( // eslint-disable-line no-unused-vars
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? "_self" : "_blank"}
                rel="noreferrer"
                aria-label={`${label} profile`}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Right column: image + topology ─────────────────── */}
        <div className="relative flex justify-center items-center order-1 lg:order-2 gap-6">

          {/* Photo card */}
          <div className="relative w-56 h-64 md:w-72 md:h-80 lg:w-80 lg:h-96 flex-shrink-0">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-[60px]" aria-hidden="true" />

            <div className="relative w-full h-full rounded-3xl border border-border bg-card/80 backdrop-blur-sm
                            overflow-hidden shadow-2xl hover:border-primary/40 hover:shadow-primary/20 transition-all duration-500 rotate-1 hover:rotate-0 flex items-center justify-center p-2">
              <img
                src={heroNetworkImg}
                alt="Carmelo A. Caparas Jr. — Network & Infrastructure Workstation"
                className="relative z-10 w-full h-full object-cover rounded-2xl"
              />
              <SignalRings />
            </div>

            {/* Terminal status card */}
            <div
              className="absolute -bottom-10 -left-6 md:-left-10 terminal-block border border-primary/30 shadow-xl min-w-[210px]"
              style={{ animation: "float 4s ease-in-out infinite" }}
            >
              <p className="text-primary font-mono text-xs mb-1">$ whois carmelo</p>
              <p className="text-xs opacity-80">role      <span className="text-primary">IT OFFICER</span></p>
              <p className="text-xs opacity-80">
                location{" "}
                <span className="text-foreground inline-flex items-center gap-1">
                  <MapPin size={10} /> CDO, PH
                </span>
              </p>
              <p className="text-xs opacity-80">exp       <span className="text-success">2+ YEARS</span></p>
            </div>

            {/* Experience chip */}
            <div
              className="absolute -top-5 -right-4 md:-right-8 status-pill border-primary/40 bg-primary/10 text-primary text-xs shadow-lg"
              style={{ animation: "float 4s ease-in-out infinite", animationDelay: "0.6s" }}
            >
              <ShieldCheck size={12} />
              2+ YRS IT OPS
            </div>
          </div>

          {/* Mini topology panel */}
          <div className="hidden md:flex flex-col gap-2 w-36 lg:w-44">
            <div className="card-noc border-primary/20 flex flex-col gap-2">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                infra stack
              </p>
              <div className="h-64 lg:h-72">
                <TopologySVG />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span className="font-mono text-[9px] text-success">LAN · WAN · AD · NAS</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
