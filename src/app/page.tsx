import Link from "next/link";
import {
  ShieldCheck,
  UserRoundCheck,
  ScanLine,
  Wallet,
  School,
  GraduationCap,
  Star,
  FlaskConical,
  Globe2,
  FileCheck2,
  MessageCircle,
  ChartNoAxesCombined,
  ArrowRight,
} from "lucide-react";
import { PublicHeader } from "@/components/public-header";
import { LaunchDemoButton } from "@/components/sih-demo";

const schemes = [
  { code: "Pre-Matric", name: "Pre-Matric Scholarship", icon: School, color: "#312E81", bg: "#EEF2FF" },
  { code: "Post-Matric", name: "Post-Matric Scholarship", icon: GraduationCap, color: "#15803D", bg: "#ECFDF3" },
  { code: "Top Class", name: "Top Class Scholarship", icon: Star, color: "#B45309", bg: "#FFF7ED" },
  { code: "NFST", name: "National Fellowship", icon: FlaskConical, color: "#7C3AED", bg: "#F5F3FF" },
  { code: "NOS", name: "National Overseas", icon: Globe2, color: "#0369A1", bg: "#F0F9FF" },
];

const features = [
  { icon: UserRoundCheck, label: "ONE PROFILE", title: "Unified Student 360", desc: "Verified documents, ST status, academic records, and existing benefits — all reusable across every scheme." },
  { icon: ScanLine, label: "ONE VERIFICATION LAYER", title: "Document Intelligence", desc: "Automated extraction and fuzzy matching. Mismatches route to human officers — students are never auto-rejected." },
  { icon: Wallet, label: "ONE PAYMENT JOURNEY", title: "End-to-End DBT", desc: "Full tracking from sanction to Direct Benefit Transfer with complete audit trail and real-time status." },
];

export default function Home() {
  return (
    <div className="public-page" style={{ background: "#F7F8FC" }}>
      <PublicHeader />
      <main>

        {/* ── HERO ── */}
        <section style={{ background: "#F7F8FC", borderBottom: "1px solid #E5E7EB", padding: "100px 24px 80px", textAlign: "center" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EEF2FF", color: "#4F46E5", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 28, letterSpacing: "0.04em", border: "1px solid #C7D2FE" }}>
              <ShieldCheck size={14} />
              SIH 2026 — Problem Statement 26238
            </div>
            <h1 style={{ fontSize: "clamp(40px,8vw,64px)", lineHeight: 1.1, color: "#1E1B4B", letterSpacing: "-0.03em", fontWeight: 800, marginBottom: 24 }}>
              One scholarship journey.<br />
              <span style={{ color: "#4F46E5" }}>One sync.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#555566", lineHeight: 1.7, marginBottom: 48, maxWidth: 560, margin: "0 auto 48px" }}>
              One mobile-first experience for discovering, applying, verifying and tracking tribal student scholarships across all five MoTA schemes.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
              <LaunchDemoButton />
              <Link
                href="/demo"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "white", color: "#312E81", border: "1px solid #E5E7EB",
                  fontSize: 14, fontWeight: 600, padding: "0 28px", height: 48,
                  borderRadius: 28, textDecoration: "none", transition: "all 0.15s",
                }}
              >
                Explore student experience <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── KAVITA CARD — hero snippet ── */}
        <section style={{ background: "white", borderBottom: "1px solid #E5E7EB", padding: "40px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#F7F8FC", border: "1px solid #E5E7EB", borderRadius: 14, padding: "20px 28px", display: "flex", gap: 16, alignItems: "center", minWidth: 280 }}>
              <div style={{ width: 44, height: 44, background: "#4F46E5", borderRadius: "50%", display: "grid", placeItems: "center", color: "white", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>KM</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1E1B4B" }}>Kavita Meena</div>
                <div style={{ fontSize: 12, color: "#6B6B7A", marginTop: 2 }}>B.A. · 2nd Year · Govt. College, Rajasthan</div>
                <div style={{ fontSize: 11, marginTop: 6, display: "flex", gap: 6 }}>
                  <span style={{ background: "#ECFDF3", color: "#15803D", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>ST Verified</span>
                  <span style={{ background: "#EEF2FF", color: "#4F46E5", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>Demo Student</span>
                </div>
              </div>
            </div>

            <div style={{ background: "#F7F8FC", border: "1px solid #E5E7EB", borderRadius: 14, padding: "20px 28px", minWidth: 240 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#6B6B7A", marginBottom: 4, letterSpacing: "0.04em" }}>ACTIVE APPLICATION</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#1E1B4B" }}>Post-Matric Scholarship</div>
              <div style={{ fontSize: 12, color: "#6B6B7A", fontFamily: "monospace", marginTop: 2 }}>SS-2026-00124</div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ height: 5, flex: 1, background: "#EEF2FF", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: "78%", height: "100%", background: "#4F46E5", borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#4F46E5" }}>78%</span>
              </div>
              <div style={{ fontSize: 11, color: "#B45309", marginTop: 6 }}>⚠ Income certificate mismatch</div>
            </div>

            <div style={{ background: "#F7F8FC", border: "1px solid #E5E7EB", borderRadius: 14, padding: "20px 28px", minWidth: 200 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#6B6B7A", letterSpacing: "0.04em", marginBottom: 8 }}>VERIFICATION</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["Identity", "ST Status", "Academic", "Institution"].map(check => (
                  <div key={check} style={{ fontSize: 12, color: "#15803D", display: "flex", gap: 6 }}>
                    <span>✓</span> {check}
                  </div>
                ))}
                <div style={{ fontSize: 12, color: "#B45309", display: "flex", gap: 6 }}>
                  <span>⚠</span> Income
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THREE CONCEPTS ── */}
        <section style={{ padding: "80px 24px", background: "#F7F8FC", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{ padding: 32, background: "white", borderRadius: 16, border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(49,46,129,0.04)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#4F46E5", marginBottom: 16, letterSpacing: "0.08em" }}>0{i + 1} — {f.label}</div>
                <f.icon size={28} color="#312E81" style={{ marginBottom: 20 }} />
                <h3 style={{ fontSize: 22, color: "#1E1B4B", marginBottom: 14 }}>{f.title}</h3>
                <p style={{ color: "#555566", lineHeight: 1.7, fontSize: 14 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FIVE SCHEMES ── */}
        <section style={{ padding: "80px 24px", background: "white", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: 36, color: "#1E1B4B", marginBottom: 12 }}>Five scholarship schemes. One portal.</h2>
            <p style={{ fontSize: 15, color: "#555566", marginBottom: 48 }}>Kavita can discover and apply to all MoTA schemes from a single, unified workspace.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 16 }}>
              {schemes.map(s => (
                <div key={s.code} style={{ background: s.bg, padding: "28px 20px", borderRadius: 16, border: `1px solid ${s.color}22`, textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <s.icon size={24} color={s.color} />
                  </div>
                  <strong style={{ display: "block", color: s.color, fontSize: 15, marginBottom: 6 }}>{s.code}</strong>
                  <span style={{ fontSize: 12, color: "#6B6B7A" }}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOCUMENT INTELLIGENCE ── */}
        <section style={{ padding: "80px 24px", background: "#F7F8FC" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <FileCheck2 size={32} color="#4F46E5" style={{ marginBottom: 24 }} />
              <h2 style={{ fontSize: 34, color: "#1E1B4B", marginBottom: 20 }}>Document Intelligence</h2>
              <p style={{ fontSize: 16, color: "#555566", lineHeight: 1.7 }}>ScholarSync extracts evidence, detects mismatches, and routes exceptions to officers — never blindly rejecting students.</p>
            </div>
            <div style={{ padding: 36, background: "white", borderRadius: 20, border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(49,46,129,0.06)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#6B6B7A", letterSpacing: "0.06em", marginBottom: 20 }}>INCOME CERTIFICATE — EXTRACTION</div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #E5E7EB" }}>
                <span style={{ color: "#171725", fontWeight: 500, fontSize: 14 }}>Name: Kavita Meena</span>
                <span style={{ color: "#15803D", fontWeight: 700 }}>✓ Match</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #E5E7EB" }}>
                <span style={{ color: "#171725", fontWeight: 500, fontSize: 14 }}>Income: ₹3,00,000</span>
                <span style={{ color: "#B45309", fontWeight: 700 }}>⚠ Mismatch</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                <span style={{ color: "#6B6B7A", fontSize: 13 }}>Application declared: ₹2,50,000</span>
              </div>
              <div style={{ marginTop: 16, background: "#FFF7ED", padding: "12px 14px", borderRadius: 10, fontSize: 13, color: "#B45309", border: "1px solid #FED7AA", fontWeight: 600 }}>
                ⚠ Routed to manual review. Not auto-rejected.
              </div>
            </div>
          </div>
        </section>

        {/* ── JAGO ── */}
        <section style={{ padding: "80px 24px", background: "white", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
            <div style={{ padding: 36, background: "#1E1B4B", borderRadius: 20, color: "white" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#F59E0B", marginBottom: 20, letterSpacing: "0.08em" }}>JAGO — CONTEXTUAL AI COMPANION</div>
              <div style={{ background: "rgba(255,255,255,0.08)", padding: 20, borderRadius: 14, borderLeft: "3px solid #F59E0B" }}>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.9)", margin: 0 }}>
                  Hi Kavita 👋<br /><br />
                  Your <strong>Post-Matric application</strong> is currently under verification.<br /><br />
                  <strong>One document needs your attention.</strong>
                </p>
              </div>
              <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Why is my application pending?", "What document needs attention?"].map(q => (
                  <span key={q} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", padding: "6px 12px", borderRadius: 20, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{q}</span>
                ))}
              </div>
            </div>
            <div>
              <MessageCircle size={32} color="#4F46E5" style={{ marginBottom: 24 }} />
              <h2 style={{ fontSize: 34, color: "#1E1B4B", marginBottom: 20 }}>JAGO Companion</h2>
              <p style={{ fontSize: 16, color: "#555566", lineHeight: 1.7 }}>A context-aware AI that guides students through their exact deficiency or application state — in their language, at their moment of need.</p>
            </div>
          </div>
        </section>

        {/* ── COVERAGE INTELLIGENCE ── */}
        <section style={{ padding: "80px 24px", background: "#F7F8FC" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <ChartNoAxesCombined size={32} color="#4F46E5" style={{ marginBottom: 24 }} />
              <h2 style={{ fontSize: 34, color: "#1E1B4B", marginBottom: 20 }}>Coverage Intelligence</h2>
              <p style={{ fontSize: 16, color: "#555566", lineHeight: 1.7 }}>Cross-referencing enrollment data with ST records helps Ministry officials proactively identify and assist unreached eligible students.</p>
            </div>
            <div style={{ padding: 36, background: "white", borderRadius: 20, border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(49,46,129,0.06)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#6B6B7A", letterSpacing: "0.06em", marginBottom: 12 }}>POTENTIALLY UNREACHED STUDENTS</div>
              <div style={{ fontSize: 52, fontWeight: 800, color: "#B45309", marginBottom: 20 }}>3,538</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["✓ Enrollment matched", "✓ ST Status verified", "✓ No active benefit"].map(t => (
                  <span key={t} style={{ padding: "5px 12px", background: "#ECFDF3", border: "1px solid #A7F3D0", color: "#15803D", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: "#6B6B7A" }}>Pending Officer Review — no automatic entitlement</div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: "#1E1B4B", padding: "72px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontSize: 36, color: "white", marginBottom: 16 }}>Ready to see it in action?</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 36 }}>Launch the demo — no login required. You will be automatically authenticated as Kavita Meena.</p>
            <LaunchDemoButton />
          </div>
        </section>

      </main>
    </div>
  );
}
