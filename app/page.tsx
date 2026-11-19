import Link from "next/link";

const modules = [
  { num: "01", title: "Authentication & Workspace",  desc: "Freelancer login via Email/Password or OAuth 2.0 (Google, GitHub). Secure session management." },
  { num: "02", title: "White-Label Branding Engine", desc: "Custom logo, brand name, primary color, and accent color applied to every client-facing page." },
  { num: "03", title: "Client & Project Management", desc: "Create and manage client records, projects, deadlines, and total contract budgets." },
  { num: "04", title: "Passwordless Client Access",  desc: "Cryptographic magic links (HMAC-SHA256) grant clients instant zero-login portal access." },
  { num: "05", title: "Milestone & Deliverable Hub", desc: "Figma embeds, staging URLs, file downloads, one-click approvals, and revision requests." },
  { num: "06", title: "Financial Tracking",          desc: "Invoice records, payment status (Paid / Pending / Overdue), and direct payment links." },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#fff" }}>

      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 64, borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(15,17,23,0.85)", backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 16, color: "#fff",
          }}>C</div>
          <span style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em" }}>ClientPortal</span>
          <span style={{
            marginLeft: 8, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em",
            background: "rgba(99,102,241,0.2)", color: "#a5b4fc",
            padding: "2px 8px", borderRadius: 4, textTransform: "uppercase",
          }}>PTUT-PRJ-100 Demo</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/dashboard" style={{
            padding: "8px 18px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)",
            fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.8)",
            transition: "all 0.15s",
          }}>Freelancer Dashboard</Link>
          <Link href="/portal/acme-corp" style={{
            padding: "8px 18px", borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            fontSize: "0.875rem", fontWeight: 700, color: "#fff",
          }}>Client Portal Demo</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", padding: "100px 24px 80px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
          borderRadius: 999, padding: "6px 16px", marginBottom: 32,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
          <span style={{ color: "#a5b4fc", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em" }}>
            PROTOTYPE RUNNING — Muhammad Abdul Monim — PTUT FYP 2026
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(2.4rem, 6vw, 3.8rem)", fontWeight: 900, lineHeight: 1.08,
          letterSpacing: "-0.04em", marginBottom: 24,
          background: "linear-gradient(135deg, #fff 30%, #a5b4fc 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Your clients deserve<br />a professional hub.
        </h1>

        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 580, margin: "0 auto 48px" }}>
          ClientPortal gives freelancers a white-label client hub — branded deliverables, passwordless access, milestone approvals, and invoice tracking. No more scattered email threads.
        </p>

        {/* Two-role cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 760, margin: "0 auto 64px", textAlign: "left" }}>
          <Link href="/dashboard" style={{
            display: "block", padding: 28, borderRadius: 16,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            transition: "all 0.2s",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, marginBottom: 16,
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.4rem",
            }}>&#9881;</div>
            <div style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 8 }}>Freelancer Dashboard</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.65 }}>
              Manage clients, publish deliverables, generate magic links, and track invoices from one workspace.
            </div>
            <div style={{ marginTop: 16, color: "#818cf8", fontSize: "0.82rem", fontWeight: 700 }}>Open Dashboard &rarr;</div>
          </Link>
          <Link href="/portal/acme-corp" style={{
            display: "block", padding: 28, borderRadius: 16,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            transition: "all 0.2s",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, marginBottom: 16,
              background: "linear-gradient(135deg, #10b981, #34d399)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.4rem",
            }}>&#9670;</div>
            <div style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 8 }}>Client Portal (Acme Corp)</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.65 }}>
              Zero-login branded experience. See what a client sees after clicking their secure magic link.
            </div>
            <div style={{ marginTop: 16, color: "#34d399", fontSize: "0.82rem", fontWeight: 700 }}>Open Client View &rarr;</div>
          </Link>
        </div>
      </section>

      {/* Module breakdown */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        padding: "80px 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ color: "#6366f1", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>System Architecture</div>
            <h2 style={{ fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Six core modules</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", marginTop: 10, fontSize: "0.95rem" }}>
              Each module maps directly to a Functional Requirement set in the IEEE 830 SRS.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {modules.map((m) => (
              <div key={m.num} style={{
                padding: "24px 24px 24px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14, background: "rgba(255,255,255,0.03)",
                transition: "all 0.2s",
              }}>
                <div style={{
                  fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 800,
                  color: "#6366f1", marginBottom: 12, letterSpacing: "0.1em",
                }}>MODULE {m.num}</div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 10, lineHeight: 1.3 }}>{m.title}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", lineHeight: 1.65 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech strip */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "24px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Stack</span>
          {["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma ORM", "Auth.js", "HMAC-SHA256", "Playwright"].map((t) => (
            <span key={t} style={{
              fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.45)",
              background: "rgba(255,255,255,0.05)", padding: "4px 12px",
              borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)",
            }}>{t}</span>
          ))}
          <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>
            Muhammad Abdul Monim — 24-st-055 — PTUT 2026
          </span>
        </div>
      </div>
    </div>
  );
}
