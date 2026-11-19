"use client";

import { useState } from "react";
import Link from "next/link";
import { CLIENTS, FREELANCER, type MilestoneStatus, type InvoiceStatus } from "../lib/data";

// ---- Icon components (pure SVG, no emoji) ----
function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
const ICONS = {
  grid:     "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  users:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  palette:  "M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4C19.7 15.3 22 12.9 22 10c0-4.4-4.5-8-10-8z",
  link:     "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  flag:     "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
  invoice:  "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  settings: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  external: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",
  check:    "M20 6L9 17l-5-5",
  copy:     "M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
  plus:     "M12 5v14M5 12h14",
  home:     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
};

type Module = "overview" | "clients" | "branding" | "access" | "milestones" | "invoices";

function StatusBadge({ status }: { status: MilestoneStatus }) {
  const cfg: Record<MilestoneStatus, { cls: string; label: string }> = {
    "Upcoming":     { cls: "badge badge-upcoming",  label: "Upcoming"     },
    "In Progress":  { cls: "badge badge-progress",  label: "In Progress"  },
    "Under Review": { cls: "badge badge-review",    label: "Under Review" },
    "Approved":     { cls: "badge badge-approved",  label: "Approved"     },
  };
  const c = cfg[status];
  return <span className={c.cls}>{c.label}</span>;
}

function InvoiceBadge({ status }: { status: InvoiceStatus }) {
  const cfg: Record<InvoiceStatus, { cls: string }> = {
    "Paid":    { cls: "badge badge-paid"    },
    "Pending": { cls: "badge badge-pending" },
    "Overdue": { cls: "badge badge-overdue" },
  };
  return <span className={cfg[status].cls}>{status}</span>;
}

// Deliverable type color map
const DTYPE_COLOR: Record<string, { bg: string; color: string; label: string }> = {
  figma:   { bg: "#7c3aed", color: "#fff", label: "Figma"   },
  github:  { bg: "#1f2937", color: "#fff", label: "GitHub"  },
  staging: { bg: "#0284c7", color: "#fff", label: "Staging" },
  loom:    { bg: "#ef4444", color: "#fff", label: "Loom"    },
  file:    { bg: "#64748b", color: "#fff", label: "File"    },
};

// ---- MODULE PANELS ----

function OverviewPanel() {
  const allProjects  = CLIENTS.flatMap((c) => c.projects);
  const allMilestones = allProjects.flatMap((p) => p.milestones);
  const allInvoices   = allProjects.flatMap((p) => p.invoices);
  const paid          = allInvoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const pending       = allInvoices.filter((i) => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);
  const approved      = allMilestones.filter((m) => m.status === "Approved").length;

  const stats = [
    { label: "Active Clients",     value: CLIENTS.length,            sub: "in workspace",       color: "#6366f1", bg: "#ede9fe" },
    { label: "Total Milestones",   value: allMilestones.length,      sub: `${approved} approved`, color: "#10b981", bg: "#dcfce7" },
    { label: "Revenue Collected",  value: `$${paid.toLocaleString()}`, sub: "invoices paid",      color: "#0284c7", bg: "#dbeafe" },
    { label: "Outstanding",        value: `$${pending.toLocaleString()}`, sub: "pending payment", color: "#f59e0b", bg: "#fef3c7" },
  ];

  const activity = [
    { event: "Acme Corp — Milestone 2 submitted for review",          time: "2 hours ago",  dot: "#6366f1" },
    { event: "BrightTech — Invoice INV-2026-006 is overdue",          time: "1 day ago",    dot: "#ef4444" },
    { event: "NordBrand — Design mockup deliverable added",           time: "2 days ago",   dot: "#10b981" },
    { event: "Acme Corp — Milestone 1 approved by Sarah Jenkins",     time: "5 days ago",   dot: "#10b981" },
    { event: "BrightTech — Project HR Dashboard initialized",         time: "16 days ago",  dot: "#0284c7" },
  ];

  return (
    <div>
      <div className="section-header">
        <div>
          <span className="badge badge-module">Module 01</span>
          <div className="section-title" style={{ marginTop: 8 }}>Workspace Overview</div>
          <div className="section-desc">Real-time snapshot of your freelance studio — clients, milestones, and financial health.</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: s.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 14,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: s.color }} />
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 900, color: s.color, letterSpacing: "-0.03em" }}>{s.value}</div>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--text-primary)", marginTop: 4 }}>{s.label}</div>
            <div style={{ fontSize: "0.73rem", color: "var(--text-muted)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Activity feed */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 20, color: "var(--text-primary)" }}>Recent Activity</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.dot, marginTop: 6, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-primary)", lineHeight: 1.4 }}>{a.event}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client summary */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 20 }}>Client Project Status</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {CLIENTS.map((c) => {
              const p = c.projects[0];
              const ms = p.milestones;
              const done = ms.filter((m) => m.status === "Approved").length;
              const pct  = Math.round((done / ms.length) * 100);
              return (
                <div key={c.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>{c.company}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{done}/{ms.length} milestones</div>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{
                      width: `${pct}%`,
                      background: pct === 100 ? "var(--success)" : "var(--accent)",
                    }} />
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 4 }}>{pct}% complete</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientsPanel() {
  return (
    <div>
      <div className="section-header">
        <div>
          <span className="badge badge-module">Module 03</span>
          <div className="section-title" style={{ marginTop: 8 }}>Client & Project Management</div>
          <div className="section-desc">Create and manage client records, associated projects, budgets, and timelines. (REQ-FR-007 to REQ-FR-009)</div>
        </div>
        <button className="btn btn-primary">
          <Icon d={ICONS.plus} size={16} /> New Client
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {CLIENTS.map((c) => {
          const p = c.projects[0];
          const paid = p.invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
          const outstanding = p.totalBudget - paid;
          const done = p.milestones.filter((m) => m.status === "Approved").length;
          return (
            <div key={c.id} className="card card-hover" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: c.brandPrimary,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "1rem", color: "#fff",
                }}>
                  {c.company.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{c.company}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{c.name} — {c.email}</div>
                </div>
              </div>

              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: 16 }}>Delivery: {p.deliveryDate}</div>

              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, textAlign: "center", padding: "10px 8px", background: "var(--bg)", borderRadius: 8 }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--accent)" }}>{done}/{p.milestones.length}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 600 }}>Milestones</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: "10px 8px", background: "var(--bg)", borderRadius: 8 }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--success)" }}>${paid.toLocaleString()}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 600 }}>Paid</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: "10px 8px", background: "var(--bg)", borderRadius: 8 }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: outstanding > 0 ? "var(--warning)" : "var(--success)" }}>${outstanding.toLocaleString()}</div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 600 }}>Owed</div>
                </div>
              </div>

              <Link href={`/portal/${p.clientSlug}`} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "0.82rem", padding: "9px 16px" }}>
                View Client Portal
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BrandingPanel() {
  const [primary, setPrimary]   = useState("#0F4C81");
  const [accent,  setAccent]    = useState("#F59E0B");
  const [studio,  setStudio]    = useState("Tariq Studio");
  const [slug,    setSlug]      = useState("tariq-studio");

  return (
    <div>
      <div className="section-header">
        <div>
          <span className="badge badge-module">Module 02</span>
          <div className="section-title" style={{ marginTop: 8 }}>White-Label Branding Engine</div>
          <div className="section-desc">Configure your studio brand. Every client portal reflects your identity, not a third-party app. (REQ-FR-004 to REQ-FR-006)</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Config form */}
        <div className="card" style={{ padding: 28 }}>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 24, color: "var(--text-primary)" }}>Brand Configuration</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label className="form-label">Studio Name</label>
              <input className="form-input" value={studio} onChange={(e) => setStudio(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Portal URL Slug</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{
                  padding: "10px 12px", background: "var(--bg)", border: "1.5px solid var(--border)",
                  borderRight: "none", borderRadius: "8px 0 0 8px", fontSize: "0.82rem", color: "var(--text-muted)", whiteSpace: "nowrap",
                }}>clientportal.app/p/</span>
                <input className="form-input" value={slug} onChange={(e) => setSlug(e.target.value)}
                  style={{ borderRadius: "0 8px 8px 0" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label className="form-label">Primary Brand Color</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)}
                    style={{ width: 44, height: 40, borderRadius: 8, border: "1.5px solid var(--border)", cursor: "pointer", padding: 3 }} />
                  <input className="form-input" value={primary} onChange={(e) => setPrimary(e.target.value)} style={{ flex: 1 }} />
                </div>
              </div>
              <div>
                <label className="form-label">Accent Color</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)}
                    style={{ width: 44, height: 40, borderRadius: 8, border: "1.5px solid var(--border)", cursor: "pointer", padding: 3 }} />
                  <input className="form-input" value={accent} onChange={(e) => setAccent(e.target.value)} style={{ flex: 1 }} />
                </div>
              </div>
            </div>
            <div>
              <label className="form-label">Studio Logo</label>
              <div style={{
                border: "2px dashed var(--border)", borderRadius: 10, padding: "24px 16px",
                textAlign: "center", cursor: "pointer", transition: "border-color 0.15s",
              }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 6, color: "var(--text-muted)" }}>+</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>PNG or SVG, max 2 MB</div>
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 4 }}>Save Brand Configuration</button>
          </div>
        </div>

        {/* Live preview */}
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 16, color: "var(--text-primary)" }}>Live Preview</div>
          <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
            {/* Preview header */}
            <div style={{ background: primary, padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 7, background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 14 }}>
                {studio.charAt(0)}
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}>{studio}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.68rem" }}>Client Project Hub</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>Secure</span>
              </div>
            </div>
            {/* Preview body */}
            <div style={{ padding: 20, background: "#f9fafb" }}>
              <div style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 4 }}>E-commerce Redesign</div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: 16 }}>Acme Corp — delivery Dec 15, 2026</div>
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                {["2/4 Milestones", "$4,800 Budget", "$1,200 Paid"].map((t) => (
                  <div key={t} style={{ padding: "6px 12px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 7, fontSize: "0.72rem", fontWeight: 600, color: "#374151" }}>{t}</div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e5e7eb", padding: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.82rem" }}>Homepage Development</div>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, background: "#ede9fe", color: "#5b21b6", padding: "2px 8px", borderRadius: 999 }}>Under Review</span>
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, background: primary, color: "#fff", textAlign: "center", padding: "7px", borderRadius: 7, fontSize: "0.72rem", fontWeight: 700 }}>
                    Approve Milestone
                  </div>
                  <div style={{ flex: 1, border: `1px solid ${primary}`, color: primary, textAlign: "center", padding: "7px", borderRadius: 7, fontSize: "0.72rem", fontWeight: 700 }}>
                    Request Revision
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", fontSize: "0.68rem", color: "#9ca3af", marginTop: 8 }}>
                Powered by {studio} via ClientPortal
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(99,102,241,0.06)", border: "1px solid #c7d2fe", borderRadius: 8 }}>
            <div style={{ fontSize: "0.75rem", color: "#4f46e5", fontWeight: 600 }}>
              CSS variables are dynamically generated and applied to all client-facing pages in real time. (REQ-FR-005)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccessPanel() {
  const [copied, setCopied] = useState(false);
  const demoLink = "http://localhost:3000/portal/acme-corp?token=hmac_8f3a2b9c1d4e5f6a7b8c9d0e1f2a3b4c";

  function handleCopy() {
    navigator.clipboard.writeText(demoLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <div className="section-header">
        <div>
          <span className="badge badge-module">Module 04</span>
          <div className="section-title" style={{ marginTop: 8 }}>Passwordless Client Access Hub</div>
          <div className="section-desc">Generate cryptographic magic links for each client project. Zero login required. (REQ-FR-010 to REQ-FR-013)</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* How it works */}
        <div className="card" style={{ padding: 28 }}>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 20 }}>How Cryptographic Access Works</div>
          {[
            { step: "01", title: "Token Generation",    desc: "System generates a 128-bit HMAC-SHA256 token using crypto.randomBytes(16). Stored as a salted hash in PostgreSQL." },
            { step: "02", title: "Link Construction",   desc: "Token is embedded into a unique portal URL: /portal/[client-slug]?token=[high-entropy-value]" },
            { step: "03", title: "Client Validation",   desc: "On access, server validates the hash, checks token binding to the specific project, and verifies expiration." },
            { step: "04", title: "Zero-Login Portal",   desc: "Valid token renders the full branded project hub instantly. No password prompt, no account creation, no friction." },
          ].map((s) => (
            <div key={s.step} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: "var(--accent-soft)",
                color: "var(--accent)", fontWeight: 900, fontSize: "0.72rem",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>{s.step}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: 3 }}>{s.title}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Generator */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {CLIENTS.map((c) => (
            <div key={c.id} className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: c.brandPrimary, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "0.85rem" }}>
                  {c.company.slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>{c.company}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{c.projects[0].title}</div>
                </div>
              </div>
              <div style={{
                padding: "10px 12px", background: "var(--bg)", borderRadius: 8,
                border: "1px solid var(--border)", marginBottom: 12,
                fontSize: "0.72rem", fontFamily: "monospace", color: "var(--text-secondary)",
                wordBreak: "break-all", lineHeight: 1.6,
              }}>
                {c.magicLink}?token=hmac_{Math.random().toString(36).slice(2, 14)}...
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-primary" style={{ flex: 1, fontSize: "0.78rem", padding: "8px 12px" }}
                  onClick={handleCopy}>
                  {copied ? <><Icon d={ICONS.check} size={14} /> Copied</> : <><Icon d={ICONS.copy} size={14} /> Generate &amp; Copy Link</>}
                </button>
                <Link href={`/portal/${c.projects[0].clientSlug}`} className="btn btn-ghost" style={{ padding: "8px 12px", fontSize: "0.78rem" }}>
                  <Icon d={ICONS.external} size={14} /> Open Portal
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MilestonesPanel() {
  const columns: { status: MilestoneStatus; label: string; color: string; bg: string }[] = [
    { status: "Upcoming",     label: "Upcoming",     color: "#64748b", bg: "#f1f5f9" },
    { status: "In Progress",  label: "In Progress",  color: "#92400e", bg: "#fef3c7" },
    { status: "Under Review", label: "Under Review", color: "#5b21b6", bg: "#ede9fe" },
    { status: "Approved",     label: "Approved",     color: "#166534", bg: "#dcfce7" },
  ];

  const allMilestones = CLIENTS.flatMap((c) =>
    c.projects.flatMap((p) =>
      p.milestones.map((m) => ({ ...m, client: c.company, project: p.title }))
    )
  );

  return (
    <div>
      <div className="section-header">
        <div>
          <span className="badge badge-module">Module 05</span>
          <div className="section-title" style={{ marginTop: 8 }}>Milestone &amp; Deliverable Pipeline</div>
          <div className="section-desc">Track all milestones across all clients in a Kanban-style view. (REQ-FR-014 to REQ-FR-018)</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {columns.map((col) => {
          const items = allMilestones.filter((m) => m.status === col.status);
          return (
            <div key={col.status}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: "10px 10px 0 0",
                background: col.bg, marginBottom: 10,
              }}>
                <span style={{ fontWeight: 700, fontSize: "0.78rem", color: col.color }}>{col.label}</span>
                <span style={{
                  background: col.color + "22", color: col.color,
                  fontWeight: 800, fontSize: "0.72rem", padding: "1px 7px", borderRadius: 999,
                }}>{items.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((ms) => (
                  <div key={ms.id} className="ms-card">
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{ms.client}</div>
                    <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.3 }}>{ms.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 10 }}>Due: {ms.dueDate}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.78rem", color: "var(--accent)" }}>${ms.budget.toLocaleString()}</span>
                      {ms.deliverables.length > 0 && (
                        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", background: "var(--bg)", padding: "2px 7px", borderRadius: 5 }}>
                          {ms.deliverables.length} files
                        </span>
                      )}
                    </div>
                    {ms.status === "Under Review" && (
                      <div style={{ marginTop: 10, padding: "7px 10px", background: "var(--accent-soft)", borderRadius: 7, fontSize: "0.72rem", color: "var(--accent)", fontWeight: 700, textAlign: "center" }}>
                        Awaiting client approval
                      </div>
                    )}
                  </div>
                ))}
                {items.length === 0 && (
                  <div style={{ textAlign: "center", padding: "24px 12px", color: "var(--text-muted)", fontSize: "0.78rem", border: "1.5px dashed var(--border)", borderRadius: 10 }}>
                    No milestones
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InvoicesPanel() {
  const rows = CLIENTS.flatMap((c) =>
    c.projects.flatMap((p) =>
      p.invoices.map((inv) => ({ ...inv, company: c.company, project: p.title }))
    )
  );
  const totalPaid    = rows.filter((r) => r.status === "Paid").reduce((s, r) => s + r.amount, 0);
  const totalPending = rows.filter((r) => r.status === "Pending").reduce((s, r) => s + r.amount, 0);
  const totalOverdue = rows.filter((r) => r.status === "Overdue").reduce((s, r) => s + r.amount, 0);

  return (
    <div>
      <div className="section-header">
        <div>
          <span className="badge badge-module">Module 06</span>
          <div className="section-title" style={{ marginTop: 8 }}>Financial Tracking &amp; Invoicing</div>
          <div className="section-desc">Log invoices against milestones, track payment status, and display financial summaries to clients. (REQ-FR-019 to REQ-FR-022)</div>
        </div>
        <button className="btn btn-primary"><Icon d={ICONS.plus} size={16} /> New Invoice</button>
      </div>

      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Collected", value: `$${totalPaid.toLocaleString()}`,    color: "var(--success)", bg: "#dcfce7" },
          { label: "Pending Payment", value: `$${totalPending.toLocaleString()}`, color: "var(--warning)", bg: "#fef9c3" },
          { label: "Overdue",         value: `$${totalOverdue.toLocaleString()}`, color: "var(--danger)",  bg: "#fee2e2" },
        ].map((s) => (
          <div key={s.label} className="card" style={{ padding: "18px 22px", borderLeft: `4px solid ${s.color}` }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: "hidden", padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice No.</th>
              <th>Client</th>
              <th>Project</th>
              <th>Issued</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 700, color: "var(--accent)", fontFamily: "monospace", fontSize: "0.8rem" }}>{r.number}</td>
                <td style={{ fontWeight: 600 }}>{r.company}</td>
                <td style={{ color: "var(--text-secondary)", fontSize: "0.82rem", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.project}</td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{r.issuedDate}</td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{r.dueDate}</td>
                <td style={{ fontWeight: 800, fontSize: "0.9rem" }}>${r.amount.toLocaleString()}</td>
                <td><InvoiceBadge status={r.status as InvoiceStatus} /></td>
                <td>
                  {r.status === "Paid" ? (
                    <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>Completed</span>
                  ) : (
                    <button style={{ background: "none", border: "none", color: r.status === "Overdue" ? "var(--danger)" : "var(--accent)", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", padding: 0 }}>
                      {r.status === "Overdue" ? "Send Reminder" : "Mark Paid"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---- MAIN DASHBOARD ----
export default function DashboardPage() {
  const [active, setActive] = useState<Module>("overview");

  const navItems: { id: Module; label: string; icon: keyof typeof ICONS; module: string }[] = [
    { id: "overview",    label: "Overview",        icon: "grid",    module: "M-01" },
    { id: "clients",     label: "Clients",          icon: "users",   module: "M-03" },
    { id: "branding",    label: "Branding Engine",  icon: "palette", module: "M-02" },
    { id: "access",      label: "Client Access",    icon: "link",    module: "M-04" },
    { id: "milestones",  label: "Milestones",        icon: "flag",    module: "M-05" },
    { id: "invoices",    label: "Invoices",          icon: "invoice", module: "M-06" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>

      {/* Sidebar */}
      <aside style={{
        width: 252, background: "var(--sidebar-bg)", display: "flex",
        flexDirection: "column", flexShrink: 0, overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{ padding: "22px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 16, color: "#fff", flexShrink: 0,
            }}>C</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.02em" }}>ClientPortal</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.04em" }}>FREELANCER WORKSPACE</div>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div style={{ padding: "14px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #6366f1, #0284c7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, color: "#fff", fontSize: "0.85rem",
            }}>{FREELANCER.avatar}</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.82rem" }}>{FREELANCER.name}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>{FREELANCER.studio}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          <div style={{ fontSize: "0.62rem", fontWeight: 800, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px 10px" }}>Modules</div>
          {navItems.map((item) => (
            <div key={item.id} className={`nav-item${active === item.id ? " active" : ""}`}
              onClick={() => setActive(item.id)}>
              <Icon d={ICONS[item.icon]} size={16} />
              <span style={{ flex: 1 }}>{item.label}</span>
              <span style={{
                fontSize: "0.58rem", fontWeight: 800,
                color: active === item.id ? "#a5b4fc" : "rgba(255,255,255,0.25)",
                fontFamily: "monospace", letterSpacing: "0.04em",
              }}>{item.module}</span>
            </div>
          ))}
        </nav>

        {/* Footer links */}
        <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <Link href="/" className="nav-item" style={{ fontSize: "0.82rem" }}>
            <Icon d={ICONS.home} size={15} /> Back to Landing
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: "auto", padding: "36px 40px" }}>
        {active === "overview"   && <OverviewPanel   />}
        {active === "clients"    && <ClientsPanel    />}
        {active === "branding"   && <BrandingPanel   />}
        {active === "access"     && <AccessPanel     />}
        {active === "milestones" && <MilestonesPanel />}
        {active === "invoices"   && <InvoicesPanel   />}
      </main>
    </div>
  );
}
