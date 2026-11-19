import { CLIENTS, type MilestoneStatus, type InvoiceStatus } from "../../lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

function statusBadge(status: MilestoneStatus) {
  const map: Record<MilestoneStatus, { cls: string; label: string }> = {
    "Upcoming":     { cls: "badge badge-upcoming", label: "Upcoming"      },
    "In Progress":  { cls: "badge badge-progress", label: "In Progress"   },
    "Under Review": { cls: "badge badge-review",   label: "Under Review"  },
    "Approved":     { cls: "badge badge-approved", label: "Approved"      },
  };
  const c = map[status];
  return <span className={c.cls}>{c.label}</span>;
}

function invoiceBadge(status: InvoiceStatus) {
  const map: Record<InvoiceStatus, string> = {
    "Paid":    "badge badge-paid",
    "Pending": "badge badge-pending",
    "Overdue": "badge badge-overdue",
  };
  return <span className={map[status]}>{status}</span>;
}

const DTYPE: Record<string, { label: string; bg: string }> = {
  figma:   { label: "Figma",   bg: "#7c3aed" },
  github:  { label: "GitHub",  bg: "#1f2937" },
  staging: { label: "Staging", bg: "#0284c7" },
  loom:    { label: "Loom",    bg: "#ef4444" },
  file:    { label: "File",    bg: "#64748b" },
};

export function generateStaticParams() {
  return CLIENTS.flatMap((c) => c.projects.map((p) => ({ slug: p.clientSlug })));
}

export default async function ClientPortalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client  = CLIENTS.find((c) => c.projects.some((p) => p.clientSlug === slug));
  const project = client?.projects.find((p) => p.clientSlug === slug);
  if (!client || !project) return notFound();

  const paid        = project.invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = project.totalBudget - paid;
  const approved    = project.milestones.filter((m) => m.status === "Approved").length;
  const total       = project.milestones.length;
  const pct         = Math.round((approved / total) * 100);

  // Which milestone is active for client action
  const reviewMilestone = project.milestones.find((m) => m.status === "Under Review");

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6fa" }}>

      {/* ---- Branded Header ---- */}
      <header style={{
        background: client.brandPrimary,
        position: "sticky", top: 0, zIndex: 50,
        boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
      }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Studio brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 9, background: client.brandAccent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "1rem", color: "#fff", flexShrink: 0,
            }}>T</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>Tariq Studio</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.68rem", fontWeight: 600 }}>Project Hub for {client.company}</div>
            </div>
          </div>

          {/* Security indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.1)", padding: "6px 14px", borderRadius: 999 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.72rem", fontWeight: 700 }}>Secure magic link access</span>
            </div>
            <Link href="/dashboard" style={{
              fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.6)",
              padding: "6px 12px", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 7, textDecoration: "none",
            }}>Freelancer Login</Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "36px 32px 64px" }}>

        {/* ---- Project Title Row ---- */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#111827", letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1.1 }}>
              {project.title}
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", maxWidth: 520, lineHeight: 1.65 }}>{project.description}</p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 32 }}>
            <div style={{ fontSize: "0.68rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 700 }}>Target Delivery</div>
            <div style={{ fontWeight: 800, fontSize: "1rem", color: "#111827", marginTop: 2 }}>{project.deliveryDate}</div>
            <div style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: 2 }}>Started {project.startDate}</div>
          </div>
        </div>

        {/* ---- Stats Row ---- */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 36 }}>
          {/* Progress */}
          <div className="card" style={{ padding: 22, borderTop: `4px solid ${client.brandPrimary}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Progress</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 900, color: client.brandPrimary, marginTop: 4, letterSpacing: "-0.03em" }}>{pct}%</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#111827" }}>{approved}/{total}</div>
                <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>milestones done</div>
              </div>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%`, background: client.brandPrimary }} />
            </div>
          </div>

          {/* Paid */}
          <div className="card" style={{ padding: 22, borderTop: "4px solid #10b981" }}>
            <div style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Total Paid</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#10b981", letterSpacing: "-0.03em" }}>${paid.toLocaleString()}</div>
            <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: 6 }}>of ${project.totalBudget.toLocaleString()} project budget</div>
            <div className="progress-track" style={{ marginTop: 10 }}>
              <div className="progress-fill" style={{ width: `${Math.round((paid / project.totalBudget) * 100)}%`, background: "#10b981" }} />
            </div>
          </div>

          {/* Outstanding */}
          <div className="card" style={{ padding: 22, borderTop: `4px solid ${outstanding > 0 ? "#f59e0b" : "#10b981"}` }}>
            <div style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Outstanding Balance</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 900, color: outstanding > 0 ? "#b45309" : "#10b981", letterSpacing: "-0.03em" }}>${outstanding.toLocaleString()}</div>
            <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: 6 }}>
              {project.invoices.filter((i) => i.status !== "Paid").length} unpaid invoice(s) remaining
            </div>
          </div>
        </div>

        {/* ---- Active Action Banner ---- */}
        {reviewMilestone && (
          <div style={{
            background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
            border: "1px solid #c4b5fd", borderRadius: 14, padding: "20px 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 32, gap: 16,
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#4c1d95", marginBottom: 4 }}>
                Action Required — Milestone Ready for Review
              </div>
              <div style={{ fontSize: "0.82rem", color: "#6d28d9" }}>
                <strong>{reviewMilestone.title}</strong> has been submitted by Tariq Studio. Please review and approve or request revisions.
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
              <button className="btn-success" style={{ width: "auto", padding: "10px 20px" }}>
                Approve Milestone
              </button>
              <button className="btn-outline-danger" style={{ width: "auto", padding: "10px 20px" }}>
                Request Revision
              </button>
            </div>
          </div>
        )}

        {/* ---- Milestone Pipeline ---- */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <h2 style={{ fontWeight: 800, fontSize: "1.05rem", color: "#111827", letterSpacing: "-0.02em" }}>Milestone Pipeline</h2>
              <div style={{ fontSize: "0.78rem", color: "#9ca3af", marginTop: 2 }}>All project phases and their current status</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {project.milestones.map((ms, idx) => {
              const isApproved = ms.status === "Approved";
              const isReview   = ms.status === "Under Review";
              const borderColor = isApproved ? "#10b981" : isReview ? "#7c3aed" : ms.status === "In Progress" ? "#f59e0b" : "#e5e7eb";

              return (
                <div key={ms.id} className="card" style={{
                  padding: "20px 24px",
                  borderLeft: `4px solid ${borderColor}`,
                  opacity: ms.status === "Upcoming" ? 0.7 : 1,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      {/* Step indicator */}
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                        background: isApproved ? "#dcfce7" : isReview ? "#ede9fe" : ms.status === "In Progress" ? "#fef3c7" : "#f1f5f9",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 900, fontSize: "0.85rem",
                        color: isApproved ? "#166534" : isReview ? "#5b21b6" : ms.status === "In Progress" ? "#92400e" : "#9ca3af",
                        border: `2px solid ${borderColor}`,
                      }}>
                        {isApproved ? "✓" : idx + 1}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827", marginBottom: 3 }}>{ms.title}</div>
                        <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                          Due {ms.dueDate} &nbsp;·&nbsp; Budget: <strong style={{ color: "#6366f1" }}>${ms.budget.toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>
                    {statusBadge(ms.status)}
                  </div>

                  {/* Deliverables */}
                  {ms.deliverables.length > 0 && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #f3f4f6" }}>
                      <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Deliverables</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {ms.deliverables.map((d, di) => {
                          const dt = DTYPE[d.type] ?? { label: d.type, bg: "#64748b" };
                          return (
                            <a key={di} href={d.url} target="_blank" rel="noreferrer"
                              style={{
                                display: "inline-flex", alignItems: "center", gap: 8,
                                padding: "8px 14px", borderRadius: 9,
                                background: "#ffffff", border: "1px solid #e5e7eb",
                                fontSize: "0.82rem", fontWeight: 600, color: "#374151",
                                textDecoration: "none", transition: "all 0.15s",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                              }}>
                              <span style={{
                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                width: 20, height: 20, borderRadius: 4,
                                background: dt.bg, color: "#fff",
                                fontWeight: 900, fontSize: "0.6rem", letterSpacing: "0.02em",
                              }}>{dt.label.charAt(0)}</span>
                              {d.label}
                              <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>&rarr;</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Approve / Revise actions */}
                  {isReview && (
                    <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                      <button className="btn-success" style={{ flex: 1, padding: "11px 20px" }}>
                        Approve This Milestone
                      </button>
                      <button className="btn-outline-danger" style={{ flex: 1, padding: "11px 20px" }}>
                        Request Revision
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Invoice Table ---- */}
        <div>
          <h2 style={{ fontWeight: 800, fontSize: "1.05rem", color: "#111827", letterSpacing: "-0.02em", marginBottom: 6 }}>Financial Summary</h2>
          <div style={{ fontSize: "0.78rem", color: "#9ca3af", marginBottom: 18 }}>All invoices for this project. Click Pay Now to settle outstanding balances.</div>

          <div className="card" style={{ overflow: "hidden", padding: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Issued</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {project.invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td style={{ fontWeight: 700, color: "#6366f1", fontFamily: "monospace", fontSize: "0.8rem" }}>{inv.number}</td>
                    <td style={{ color: "#6b7280", fontSize: "0.82rem" }}>{inv.issuedDate}</td>
                    <td style={{ color: "#6b7280", fontSize: "0.82rem" }}>{inv.dueDate}</td>
                    <td style={{ fontWeight: 800, fontSize: "0.95rem" }}>${inv.amount.toLocaleString()}</td>
                    <td>{invoiceBadge(inv.status as InvoiceStatus)}</td>
                    <td>
                      {inv.status === "Paid" ? (
                        <span style={{ color: "#9ca3af", fontSize: "0.78rem" }}>Completed</span>
                      ) : (
                        <a href={inv.paymentLink} style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          background: "#10b981", color: "#fff", padding: "5px 14px",
                          borderRadius: 7, fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
                        }}>Pay Now</a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- Footer ---- */}
        <div style={{ marginTop: 48, textAlign: "center", paddingTop: 24, borderTop: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "0.78rem", color: "#9ca3af", lineHeight: 1.8 }}>
            This project hub is exclusively prepared for <strong style={{ color: "#374151" }}>{client.name}</strong> at {client.company}.
            <br />
            Your access link is private, secure, and unique to this engagement.
          </div>
          <div style={{ marginTop: 10, fontSize: "0.68rem", color: "#d1d5db" }}>
            Powered by <strong>Tariq Studio</strong> via ClientPortal — PTUT-PRJ-100
          </div>
        </div>
      </div>
    </div>
  );
}
