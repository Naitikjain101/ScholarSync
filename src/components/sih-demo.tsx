"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "./providers";
import {
  ChevronLeft,
  ChevronRight,
  X,
  RotateCcw,
  Presentation,
  GraduationCap,
} from "lucide-react";

/* ─── 10 Demo Steps ─────────────────────────────────────── */
const DEMO_STEPS = [
  {
    id: 1,
    title: "Student 360",
    desc: "One reusable profile powers all scholarship journeys. See Kavita Meena's unified dashboard.",
    route: "/workspace",
    role: "student",
  },
  {
    id: 2,
    title: "Scholarship Discovery",
    desc: "Five schemes detected: Pre-Matric, Post-Matric, Top Class, NFST, NOS. Eligibility matched automatically.",
    route: "/schemes",
    role: "student",
  },
  {
    id: 3,
    title: "Post-Matric Application",
    desc: "Application SS-2026-00124 — Post-Matric Scholarship — currently Under Verification.",
    route: "/applications/SS-2026-00124",
    role: "student",
  },
  {
    id: 4,
    title: "Document Wallet",
    desc: "Verified documents reused across schemes. No re-uploading. ST Certificate, marksheets, income certificate.",
    route: "/applications/SS-2026-00124?tab=Documents",
    role: "student",
  },
  {
    id: 5,
    title: "Document Intelligence",
    desc: "Income extracted: ₹3,00,000. Application: ₹2,50,000. MISMATCH detected. Routed for human review — not auto-rejected.",
    route: "/applications/SS-2026-00124?tab=Student+360",
    role: "student",
  },
  {
    id: 6,
    title: "Verification & Exception",
    desc: "Identity ✓ · ST Status ✓ · Academic ✓ · Institution ✓ · Income ⚠ — Confidence 78%. Exception queued for officer.",
    route: "/applications/SS-2026-00124",
    role: "student",
  },
  {
    id: 7,
    title: "JAGO",
    desc: "Contextual AI assistant explains status, next steps, and required action. No helpdesk calls needed.",
    route: "/applications/SS-2026-00124",
    role: "student",
  },
  {
    id: 8,
    title: "Scholarship Conflict",
    desc: "Top Class has a CONFLICT — Post-Matric is active. ScholarSync prevents overlapping benefits automatically.",
    route: "/schemes",
    role: "student",
  },
  {
    id: 9,
    title: "Payments",
    desc: "Payment journey: Application → Verification → Officer Review → Sanction → DBT. Currently Under Verification.",
    route: "/payments",
    role: "student",
  },
  {
    id: 10,
    title: "Coverage Intelligence",
    desc: "Ministry view: enrolled students matched against benefit registry. Potentially unreached ST students surfaced for officer review.",
    route: "/workspace",
    role: "ministry_admin",
  },
];

/* ─── Progress dots ─────────────────────────────────────── */
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: "8px 0 2px",
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          style={{
            width: i === current ? 20 : 6,
            height: 6,
            borderRadius: 3,
            background:
              i < current
                ? "#4F46E5"
                : i === current
                  ? "#F59E0B"
                  : "rgba(49,46,129,0.15)",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main controller ───────────────────────────────────── */
export function SIHDemoController() {
  const [stepIndex, setStepIndex] = useState(-1);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const sync = useCallback(() => {
    const active = sessionStorage.getItem("sih_demo_active");
    if (active === "true") {
      const step = parseInt(sessionStorage.getItem("sih_demo_step") || "0", 10);
      setStepIndex(Math.min(step, DEMO_STEPS.length - 1));
    } else {
      setStepIndex(-1);
    }
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [pathname, sync]);

  if (stepIndex === -1) return null;

  const currentStep = DEMO_STEPS[stepIndex];

  async function navigate(targetIndex: number) {
    if (busy) return;
    setBusy(true);
    try {
      const target = DEMO_STEPS[targetIndex];
      const current = DEMO_STEPS[stepIndex];
      if (target.role !== current.role) {
        await api("auth/demo", { role: target.role });
        await new Promise((r) => setTimeout(r, 250));
      }
      sessionStorage.setItem("sih_demo_step", String(targetIndex));
      setStepIndex(targetIndex);
      router.refresh();
      router.push(target.route);
    } finally {
      setBusy(false);
    }
  }

  async function handleExit() {
    if (busy) return;
    setBusy(true);
    try {
      sessionStorage.removeItem("sih_demo_active");
      sessionStorage.removeItem("sih_demo_step");
      setStepIndex(-1);
      await api("auth/demo", { role: "student" }).catch(() => {});
      router.push("/");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function handleRestart() {
    if (busy) return;
    setBusy(true);
    try {
      await api("auth/demo", { role: "student" });
      sessionStorage.setItem("sih_demo_step", "0");
      setStepIndex(0);
      router.push(DEMO_STEPS[0].route);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* ── Demo controller panel ── */}
      <div
        className="sih-demo-overlay"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: "min(340px, calc(100vw - 48px))",
          background: "var(--surface, #fff)",
          borderRadius: 16,
          boxShadow:
            "0 4px 6px rgba(0,0,0,0.04), 0 16px 48px rgba(30,27,75,0.16)",
          border: "1px solid var(--border, #E5E7EB)",
          zIndex: 9999,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        role="complementary"
        aria-label="SIH Demo navigation"
      >
        {/* Header */}
        <div
          style={{
            background: "var(--primary-strong, #1E1B4B)",
            color: "white",
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <GraduationCap size={16} style={{ color: "#F59E0B" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>
              SIH DEMO&nbsp;
            </span>
            <span
              style={{
                fontSize: 11,
                background: "rgba(245,158,11,0.2)",
                color: "#F59E0B",
                padding: "2px 7px",
                borderRadius: 4,
                fontWeight: 700,
              }}
            >
              {stepIndex + 1} / {DEMO_STEPS.length}
            </span>
          </div>
          <button
            onClick={handleExit}
            disabled={busy}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
              padding: "4px",
              borderRadius: 6,
              display: "flex",
            }}
            aria-label="Exit demo"
          >
            <X size={15} />
          </button>
        </div>

        {/* Progress dots */}
        <div style={{ padding: "10px 16px 0" }}>
          <StepDots current={stepIndex} total={DEMO_STEPS.length} />
        </div>

        {/* Content */}
        <div style={{ padding: "14px 18px 18px" }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--primary-strong, #1E1B4B)",
              margin: "0 0 8px",
              letterSpacing: "-0.3px",
            }}
          >
            {currentStep.title}
          </h3>
          <p
            style={{
              fontSize: 12.5,
              color: "var(--foreground-secondary, #555566)",
              lineHeight: 1.6,
              margin: "0 0 16px",
            }}
          >
            {currentStep.desc}
          </p>

          {/* Navigation */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => navigate(stepIndex - 1)}
              disabled={stepIndex === 0 || busy}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "var(--surface-subtle, #FAFAFC)",
                color: stepIndex === 0 ? "#bbb" : "var(--foreground, #171725)",
                border: "1px solid var(--border, #E5E7EB)",
                padding: "8px 12px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                cursor: stepIndex === 0 ? "not-allowed" : "pointer",
                transition: "all 0.15s",
              }}
              aria-label="Previous step"
            >
              <ChevronLeft size={15} /> Prev
            </button>

            <button
              onClick={handleRestart}
              disabled={busy}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "transparent",
                color: "var(--foreground-muted, #6B6B7A)",
                border: "1px solid var(--border, #E5E7EB)",
                padding: "8px 10px",
                borderRadius: 8,
                fontSize: 12,
                cursor: "pointer",
              }}
              aria-label="Restart demo"
              title="Restart from Step 1"
            >
              <RotateCcw size={13} />
            </button>

            {stepIndex < DEMO_STEPS.length - 1 ? (
              <button
                onClick={() => navigate(stepIndex + 1)}
                disabled={busy}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  background: "var(--accent, #4F46E5)",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(79,70,229,0.3)",
                  transition: "all 0.15s",
                }}
                aria-label="Next step"
              >
                {busy ? "..." : <>Next <ChevronRight size={15} /></>}
              </button>
            ) : (
              <button
                onClick={handleRestart}
                disabled={busy}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  background: "#F59E0B",
                  color: "#1E1B4B",
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                aria-label="Restart demo from beginning"
              >
                <RotateCcw size={14} /> Restart
              </button>
            )}
          </div>

          {/* Kavita label */}
          <div
            style={{
              marginTop: 14,
              padding: "8px 10px",
              background: "var(--primary-soft, #EEF2FF)",
              borderRadius: 8,
              fontSize: 11,
              color: "var(--accent, #4F46E5)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "var(--accent, #4F46E5)",
                color: "white",
                display: "grid",
                placeItems: "center",
                fontSize: 10,
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              KM
            </span>
            Kavita Meena · Scheduled Tribe · Verified Demo
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Landing page button ───────────────────────────────── */
export function LaunchDemoButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      id="launch-sih-demo"
      className="button large"
      disabled={busy}
      style={{
        background: "linear-gradient(135deg, #312E81 0%, #4F46E5 100%)",
        color: "white",
        fontSize: 15,
        fontWeight: 700,
        padding: "0 36px",
        height: 54,
        borderRadius: 28,
        boxShadow: "0 4px 20px rgba(79,70,229,0.35)",
        border: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        transition: "all 0.2s",
        letterSpacing: "0.01em",
      }}
      onClick={async () => {
        setBusy(true);
        try {
          sessionStorage.setItem("sih_demo_active", "true");
          sessionStorage.setItem("sih_demo_step", "0");
          await api("auth/demo", { role: "student" });
          router.push(DEMO_STEPS[0].route);
          router.refresh();
        } catch {
          alert("Unable to start the demonstration session. Please try again.");
          sessionStorage.removeItem("sih_demo_active");
          setBusy(false);
        }
      }}
    >
      <Presentation size={18} />
      {busy ? "Starting demo…" : "Launch SIH Demo"}
    </button>
  );
}
