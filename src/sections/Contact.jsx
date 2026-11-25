import { useState, useRef, useEffect } from "react";
import { Mail, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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

// ── Ping micro-interaction ────────────────────────────────────
function PingButton() {
  const [state, setState] = useState("idle"); // idle | pinging | replied

  const handlePing = () => {
    if (state !== "idle") return;
    setState("pinging");
    setTimeout(() => setState("replied"), 1600);
    setTimeout(() => setState("idle"), 4500);
  };

  const labels = {
    idle:    "$ ping carcapz123@gmail.com",
    pinging: "$ resolving mailto interface …",
    replied: "Ready — click email or compose below",
  };

  return (
    <button
      type="button"
      onClick={handlePing}
      disabled={state === "pinging"}
      className={`w-full font-mono text-sm text-left px-4 py-3 rounded-lg border transition-all duration-300
        ${state === "replied"
          ? "border-success/50 bg-success/10 text-success"
          : state === "pinging"
          ? "border-primary/50 bg-primary/5 text-primary"
          : "border-border bg-terminal text-muted-foreground hover:border-primary/50 hover:text-primary"
        }`}
      aria-label="Ping interaction button"
    >
      <span className="flex items-center gap-2">
        {state === "pinging" && (
          <span
            className="w-2 h-2 rounded-full bg-primary"
            style={{ animationName: "ping-pulse", animationDuration: "1s", animationIterationCount: "infinite" }}
          />
        )}
        {state === "replied" && <CheckCircle size={14} />}
        {labels[state]}
      </span>
    </button>
  );
}

// ── Contact links data ────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    label: "Email",
    value: "carcapz123@gmail.com",
    href: "mailto:carcapz123@gmail.com",
    Icon: FaEnvelope,
    color: "text-highlight",
  },
  {
    label: "LinkedIn",
    value: "carmelo-caparas-jr-4399a9289",
    href: "https://www.linkedin.com/in/carmelo-caparas-jr-4399a9289/",
    Icon: FaLinkedin,
    color: "text-primary",
  },
  {
    label: "GitHub",
    value: "github.com/Ccaparas666",
    href: "https://github.com/Ccaparas666",
    Icon: FaGithub,
    color: "text-muted-foreground",
  },
];

// ── Main component ─────────────────────────────────────────────
export const Contact = () => {
  const [sectionRef, visible] = useFadeIn(0.1);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleComposeMailto = (e) => {
    e.preventDefault();
    if (!subject.trim() && !message.trim()) {
      setError("Please enter a subject or message before opening your email client.");
      return;
    }
    setError("");
    const mailtoUrl = `mailto:carcapz123@gmail.com?subject=${encodeURIComponent(
      subject.trim() || "Portfolio Inquiry"
    )}&body=${encodeURIComponent(message.trim())}`;
    window.location.href = mailtoUrl;
  };

  const inputClass =
    "w-full bg-terminal border border-border hover:border-primary/40 focus:border-primary focus:ring-1 focus:ring-primary/40 rounded-lg px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-colors duration-200";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen scroll-mt-24 section-padding"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div className="container mx-auto max-w-6xl">

        {/* Section header */}
        <div className="mb-12">
          <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-2">
            &gt;_ mailto carcapz123@gmail.com
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Get In <span className="text-primary">Touch</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left: direct channels + ping ──────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            <div className="card-noc border-primary/15">
              <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">
                Connection interfaces
              </p>
              <div className="flex flex-col gap-4">
                {SOCIAL_LINKS.map(({ label, value, href, Icon: SocialIcon, color }) => ( // eslint-disable-line no-unused-vars
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? "_self" : "_blank"}
                    rel="noreferrer"
                    aria-label={`${label}: ${value}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className={`p-2 rounded-lg bg-muted/50 border border-border group-hover:border-primary/40 transition-colors ${color}`}>
                      <SocialIcon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                        {label}
                      </p>
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Ping interaction */}
            <div className="card-noc border-primary/15">
              <p className="font-mono text-xs text-muted-foreground mb-3">
                Quick interface check:
              </p>
              <PingButton />
            </div>

            {/* Terminal blurb */}
            <div className="terminal-block border border-primary/20 text-xs leading-relaxed">
              <p><span className="text-primary">$</span> whois contact</p>
              <p className="mt-1 opacity-80">location: Cagayan de Oro City, Philippines</p>
              <p className="opacity-80">email: carcapz123@gmail.com</p>
              <p className="mt-2 text-success">Direct mailto link — no third-party form storage.</p>
            </div>
          </div>

          {/* ── Right: functional mailto composer ─────────── */}
          <div className="lg:col-span-3">
            <div className="card-noc border-primary/15">

              {/* Terminal title bar */}
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border">
                <span className="w-3 h-3 rounded-full bg-danger/70" />
                <span className="w-3 h-3 rounded-full bg-highlight/70" />
                <span className="w-3 h-3 rounded-full bg-success/70" />
                <span className="font-mono text-xs text-muted-foreground ml-2">
                  compose-mail — carcapz123@gmail.com
                </span>
              </div>

              <form onSubmit={handleComposeMailto} noValidate className="flex flex-col gap-5">
                <div>
                  <label htmlFor="subject" className="font-mono text-xs text-muted-foreground block mb-1.5">
                    subject:
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="IT Officer / Network & Infrastructure inquiry"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (error) setError("");
                    }}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-mono text-xs text-muted-foreground block mb-1.5">
                    message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Hello Carmelo, I'd like to discuss…"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (error) setError("");
                    }}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="font-mono text-xs text-danger flex items-center gap-1.5">
                    <AlertCircle size={13} /> {error}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-1">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 px-8 rounded-full
                               hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Mail size={16} /> Open in Email Client
                  </button>
                  <a
                    href="mailto:carcapz123@gmail.com"
                    className="flex items-center justify-center gap-2 border border-primary/50 text-primary font-mono text-sm py-3.5 px-6 rounded-full
                               hover:bg-primary/10 transition-all duration-200"
                  >
                    Direct mailto <ExternalLink size={14} />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
