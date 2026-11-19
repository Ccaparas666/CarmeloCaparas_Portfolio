import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import {
  FaGithub, FaLinkedin, FaFacebook, FaEnvelope
} from "react-icons/fa";

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
    setTimeout(() => setState("replied"), 2200);
    setTimeout(() => setState("idle"), 5000);
  };

  const labels = {
    idle:    "$ ping carmelo.dev",
    pinging: "$ pinging carmelo.dev …",
    replied: "Reply in ~24h · TTL 64",
  };

  return (
    <button
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
    value: "carmelo@example.com",          // PLACEHOLDER
    href: "mailto:carmelo@example.com",    // PLACEHOLDER
    Icon: FaEnvelope,
    color: "text-highlight",
  },
  {
    label: "LinkedIn",
    value: "/in/carmelo-caparas",          // PLACEHOLDER
    href: "https://linkedin.com/in/",      // PLACEHOLDER
    Icon: FaLinkedin,
    color: "text-primary",
  },
  {
    label: "GitHub",
    value: "github.com/carmelo",           // PLACEHOLDER
    href: "https://github.com/",           // PLACEHOLDER
    Icon: FaGithub,
    color: "text-muted-foreground",
  },
  {
    label: "Facebook",
    value: "fb.com/carmelo",               // PLACEHOLDER
    href: "https://facebook.com/",         // PLACEHOLDER
    Icon: FaFacebook,
    color: "text-muted-foreground",
  },
];

// ── Main component ─────────────────────────────────────────────
export const Contact = () => {
  const [sectionRef, visible] = useFadeIn(0.1);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = "Invalid email address";
    if (!form.message.trim()) e.message = "Message cannot be empty";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    // ── PLACEHOLDER: replace with real email/API submission ──
    // e.g. fetch('/api/contact', { method:'POST', body: JSON.stringify(form) })
    setStatus("success");
  };

  const inputClass = (field) =>
    `w-full bg-terminal border rounded-lg px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/60
     focus:outline-none focus:ring-1 transition-colors duration-200
     ${errors[field]
       ? "border-danger/70 focus:ring-danger/50"
       : "border-border hover:border-primary/40 focus:border-primary focus:ring-primary/40"
     }`;

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
            &gt;_ ping carmelo.dev --connect
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Get In <span className="text-primary">Touch</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left: social + ping ───────────────────────── */}
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
                    target={href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noreferrer"
                    aria-label={`${label}: ${value}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className={`p-2 rounded-lg bg-muted/50 border border-border group-hover:border-primary/40 transition-colors ${color}`}>
                      <SocialIcon size={16} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                        {label}
                      </p>
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors duration-200">
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
                Quick availability check:
              </p>
              <PingButton />
            </div>

            {/* NOC status blurb */}
            <div className="terminal-block border border-primary/20 text-xs leading-relaxed">
              <p><span className="text-primary">$</span> traceroute to carmelo.dev</p>
              <p className="mt-1 opacity-70">1  form-submit  &lt;1ms</p>
              <p className="opacity-70">2  my-inbox     &lt;5min</p>
              <p className="opacity-70">3  your-reply   ~24h</p>
              <p className="mt-2 text-success">Response guaranteed within 24 hours.</p>
            </div>
          </div>

          {/* ── Right: contact form ───────────────────────── */}
          <div className="lg:col-span-3">
            <div className="card-noc border-primary/15">

              {/* Terminal title bar */}
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border">
                <span className="w-3 h-3 rounded-full bg-danger/70" />
                <span className="w-3 h-3 rounded-full bg-highlight/70" />
                <span className="w-3 h-3 rounded-full bg-success/70" />
                <span className="font-mono text-xs text-muted-foreground ml-2">
                  contact@carmelo — bash
                </span>
              </div>

              {status === "success" ? (
                /* Success state */
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <CheckCircle size={48} className="text-success" />
                  <div>
                    <p className="font-bold text-foreground text-lg">
                      Packet received!
                    </p>
                    <p className="font-mono text-sm text-muted-foreground mt-1">
                      Message delivered successfully. Reply expected within 24h.
                    </p>
                  </div>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                    className="font-mono text-xs text-primary hover:underline mt-2"
                  >
                    $ send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="font-mono text-xs text-muted-foreground block mb-1.5">
                      name:
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass("name")}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="font-mono text-xs text-danger mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="font-mono text-xs text-muted-foreground block mb-1.5">
                      email:
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@domain.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass("email")}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="font-mono text-xs text-danger mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="font-mono text-xs text-muted-foreground block mb-1.5">
                      message:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Hello Carmelo, I'd like to discuss…"
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass("message")} resize-none`}
                    />
                    {errors.message && (
                      <p className="font-mono text-xs text-danger mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 px-8 rounded-full
                               hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200 mt-1"
                  >
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
