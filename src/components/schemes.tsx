"use client";
import { Localize } from "@/components/localize";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Globe2,
  ArrowRight,
  Plus,
  Settings2,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Award,
  FlaskConical,
  School,
  Star,
  Info,
} from "lucide-react";
import type { Actor, FormData, SchemeConfig } from "@/lib/domain";
import { money, dateLabel } from "@/lib/domain";
import { evaluateEligibility } from "@/lib/rules";
import { api, useApp } from "./providers";
import { Button, PageTitle, Notice } from "./ui";
import { FormField } from "./application-editor";

export type SchemeView = {
  id: string;
  name: string;
  code: string;
  description: string;
  type: string;
  active: boolean;
  award: number;
  deadline: string;
  version: number;
  config: SchemeConfig;
};

// Map scheme codes to icons and accent classes
const schemeIcon = (code: string) => {
  switch (code) {
    case "PRE_MATRIC": return School;
    case "POST_MATRIC": return GraduationCap;
    case "TOP_CLASS": return Star;
    case "NFST": return FlaskConical;
    case "NOS": return Globe2;
    default: return BookOpen;
  }
};

const schemeAccent = (code: string) => {
  switch (code) {
    case "PRE_MATRIC": return "scheme-prematric";
    case "POST_MATRIC": return "scheme-postmatric";
    case "TOP_CLASS": return "scheme-topclass";
    case "NFST": return "";
    case "NOS": return "nos";
    default: return "";
  }
};

// Education level labels for display
const eduLevelLabel: Record<string, string> = {
  PRE_MATRIC: "Classes IX–X",
  POST_MATRIC: "Class XI and above",
  TOP_CLASS: "Premier institutions",
  NFST: "MPhil / PhD research",
  NOS: "Postgraduate / Research overseas",
};

export function Schemes({
  schemes,
  actor,
}: {
  schemes: SchemeView[];
  actor: Actor;
}) {
  const { t, notice } = useApp();
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const [preview, setPreview] = useState<SchemeView | null>(null);
  const [input, setInput] = useState<FormData>({
    category: "Scheduled Tribe",
    familyIncome: 210000,
    academicScore: 88,
    age: 25,
    course: "PhD",
    offerStatus: "Unconditional",
  });
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (preview) dialog.current?.showModal();
    else dialog.current?.close();
  }, [preview]);
  const admin = ["scheme_admin", "ministry_admin"].includes(actor.role);
  const result = preview
    ? evaluateEligibility(preview.config.rules, input)
    : null;
  return (
    <Localize>
      <>
        <PageTitle
          eyebrow={admin ? "Scheme administration" : "Student portal"}
          title="Five scholarship schemes, one platform."
          description="All MoTA scholarship and fellowship schemes in one place. Check eligibility, apply, and track everything together."
          actions={
            admin ? (
              <Link href="/schemes/new" className="button">
                <Plus size={15} />
                Create scheme
              </Link>
            ) : undefined
          }
        />
        <Notice>
          <strong>SIH 2026 Demonstration Data.</strong> These schemes are
          inspired by MoTA scholarship programmes (Pre-Matric, Post-Matric, Top
          Class, NFST, NOS). All eligibility criteria, award amounts, quotas
          and deadlines shown are demonstration data — not current official
          government rules. <a href="/about/responsible-ai" className="text-button" style={{display:"inline"}}>Learn more</a>
        </Notice>

        {/* Student scholarship journey CTA */}
        {actor.role === "student" && (
          <FindMyScholarshipWizard />
        )}

        <div className="scheme-grid" style={{ marginTop: 25 }}>
          {schemes.map((s) => {
            const Icon = schemeIcon(s.code);
            const accent = schemeAccent(s.code);
            return (
              <article
                key={s.id}
                className={`scheme-card ${accent}`}
              >
                <div className="scheme-card-top">
                  <span className="scheme-icon">
                    <Icon size={24} />
                  </span>
                  <span
                    className={`badge ${s.active ? "status-good" : "status-draft"}`}
                  >
                    <i />
                    {s.active ? t("Open for applications") : "Inactive"}
                  </span>
                  <div className="scheme-code">
                    {s.code.replace("_", "-")} · {s.type}
                  </div>
                  <h2>{s.name}</h2>
                  {eduLevelLabel[s.code] && (
                    <div className="scheme-edu-level">
                      <GraduationCap size={12} />
                      {eduLevelLabel[s.code]}
                    </div>
                  )}
                </div>
                <div className="scheme-card-body">
                  <p>{s.description}</p>
                  <div className="scheme-meta">
                    <div>
                      <small>Illustrative award</small>
                      <strong>
                        {money(s.award)}
                        {s.code === "NFST" ? (
                          <small
                            style={{
                              display: "inline",
                              marginLeft: 4,
                              fontWeight: 450,
                            }}
                          >
                            /month
                          </small>
                        ) : null}
                      </strong>
                    </div>
                    <div>
                      <small>{t("Deadline")}</small>
                      <strong>{dateLabel(s.deadline)}</strong>
                    </div>
                  </div>
                  <div className="small-text muted">
                    {s.config.documents.filter((d) => d.required).length} required
                    documents · {s.config.rules.length} eligibility rules ·
                    Version {s.version}
                  </div>
                  <div className="between">
                    <button className="text-button" onClick={() => setPreview(s)}>
                      {t("Check eligibility")}
                    </button>
                    {admin ? (
                      <Link
                        href={`/schemes/${s.id}`}
                        className="button secondary"
                      >
                        <Settings2 size={14} />
                        Configure
                      </Link>
                    ) : actor.role === "student" ? (
                      <Button
                        busy={busy === s.id}
                        disabled={!s.active || !!busy}
                        onClick={async () => {
                          setBusy(s.id);
                          try {
                            const result = await api<{ id: string }>(
                              "applications",
                              { schemeId: s.id },
                            );
                            router.push(`/applications/${result.id}`);
                            router.refresh();
                          } catch (e) {
                            notice((e as Error).message, true);
                          } finally {
                            setBusy("");
                          }
                        }}
                      >
                        {t("Apply now")}
                        <ArrowRight size={14} />
                      </Button>
                    ) : (
                      <Link
                        href={`/applications?scheme=${s.id}`}
                        className="button secondary"
                      >
                        View applications
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Eligibility preview dialog */}
        <dialog
          ref={dialog}
          onCancel={() => setPreview(null)}
          className="modal"
          style={{
            margin: "auto",
            border: "1px solid #d9e5e4",
            color: "var(--ink)",
          }}
        >
          {preview && (
            <>
              <div className="between" style={{ marginBottom: 20 }}>
                <h2 style={{ margin: 0 }}>
                  {preview.name} — eligibility preview
                </h2>
                <button
                  className="icon-button"
                  onClick={() => setPreview(null)}
                  aria-label="Close eligibility preview"
                >
                  ×
                </button>
              </div>
              <div className="notice" style={{ marginBottom: 16 }}>
                <Info size={16} />
                <span style={{ fontSize: 12 }}>
                  Demo eligibility configuration — not official policy. Adjust
                  inputs below to see how configured rules respond.
                </span>
              </div>
              <div className="form-grid">
                {[
                  {
                    key: "age",
                    label: "Age",
                    section: "",
                    type: "number" as const,
                    required: true,
                  },
                  ...preview.config.fields.filter((f) =>
                    [
                      "category",
                      "familyIncome",
                      "academicScore",
                      "course",
                      "offerStatus",
                      "state",
                      "institution",
                      "applicationYear",
                      "classStudying",
                      "institutionType",
                    ].includes(f.key),
                  ),
                ].map((field) => (
                  <FormField
                    key={field.key}
                    field={field}
                    value={input[field.key]}
                    onChange={(value) =>
                      setInput((prev) => ({ ...prev, [field.key]: value }))
                    }
                  />
                ))}
              </div>
              <div className="rule-list" style={{ marginTop: 24 }}>
                {result?.results.map((r) => (
                  <div
                    className={`rule-result ${r.passed ? "" : "failed"}`}
                    key={r.id}
                  >
                    {r.passed ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    <div>
                      <strong>{r.label}</strong>
                      <small>{r.explanation}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div className={`badge ${result?.eligible ? "status-good" : "status-draft"}`}>
                  <i />
                  {result?.eligible ? "Likely eligible (demo)" : "May not qualify (demo)"}
                </div>
                {actor.role === "student" && (
                  <Button
                    onClick={async () => {
                      setBusy(preview.id);
                      setPreview(null);
                      try {
                        const res = await api<{ id: string }>(
                          "applications",
                          { schemeId: preview.id },
                        );
                        router.push(`/applications/${res.id}`);
                        router.refresh();
                      } catch (e) {
                        notice((e as Error).message, true);
                      } finally {
                        setBusy("");
                      }
                    }}
                    busy={busy === preview.id}
                    disabled={!preview.active || !!busy}
                  >
                    Apply now <ArrowRight size={14} />
                  </Button>
                )}
              </div>
              <p className="small-text muted" style={{ marginTop: 16 }}>
                This preview checks configured <strong>demo criteria only</strong>. Your
                submitted documents and officer review determine the final
                outcome.
              </p>
            </>
          )}
        </dialog>
      </>
    </Localize>
  );
}

function FindMyScholarshipWizard() {
  const [wizardStep, setWizardStep] = useState(0);

  return (
    <div className="feature-panel forest-panel" style={{ marginTop: 24, padding: '40px 32px' }}>
      {wizardStep === 0 && (
        <>
          <span className="ep-eyebrow">FIND MY SCHOLARSHIP</span>
          <h2 style={{ fontSize: 28, marginBottom: 8 }}>What are you currently studying?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>Select your current education level to find applicable schemes.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {['School (Class IX-XII)', 'Undergraduate', 'Postgraduate / Research'].map(level => (
              <button key={level} className="button" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: 16, height: 'auto', display: 'flex', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => setWizardStep(1)}>
                {level}
              </button>
            ))}
          </div>
        </>
      )}
      {wizardStep === 1 && (
        <>
          <span className="ep-eyebrow">STEP 02</span>
          <h2 style={{ fontSize: 28, marginBottom: 8 }}>What is your annual family income?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>This helps us determine your eligibility for financial support schemes.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <button className="button" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: 16, height: 'auto', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => setWizardStep(2)}>Below ₹2.5 Lakh</button>
            <button className="button" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: 16, height: 'auto', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => setWizardStep(2)}>₹2.5L - ₹6.0L</button>
            <button className="button" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: 16, height: 'auto', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => setWizardStep(2)}>Above ₹6.0L</button>
          </div>
        </>
      )}
      {wizardStep === 2 && (
        <>
          <span className="ep-eyebrow" style={{ color: 'var(--success)' }}>MATCH FOUND</span>
          <h2 style={{ fontSize: 28, marginBottom: 8 }}>We found 2 schemes for you</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>Based on your profile, you are highly likely to be eligible for these schemes. Scroll down to apply.</p>
          <button className="button accent-button" onClick={() => setWizardStep(0)}>Start Over</button>
        </>
      )}
    </div>
  );
}
