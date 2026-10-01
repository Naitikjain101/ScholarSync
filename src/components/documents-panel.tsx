"use client";
import { Localize } from "@/components/localize";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Upload,
  Check,
  ScanLine,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";
import type { ApplicationDetail } from "@/server/queries";
import { api, useApp } from "./providers";
import { Button, Confidence, Notice } from "./ui";
export function DocumentPanel({
  detail,
  demo,
  editable = false,
  beforeUpload,
}: {
  detail: ApplicationDetail;
  demo: boolean;
  editable?: boolean;
  beforeUpload?: () => Promise<void>;
}) {
  const { t, notice } = useApp();
  const router = useRouter();
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [drag, setDrag] = useState("");
  const [fixtureBusy, setFixtureBusy] = useState(false);
  const [error, setError] = useState("");
  const [selectedKey, setSelectedKey] = useState(detail.app.schemeSnapshot.documents[0]?.key);
  async function upload(file: File | undefined, category: string) {
    if (!file) return;
    setError("");
    try {
      if (file.size === 0 || file.size > 3 * 1024 * 1024)
        throw new Error(
          "Choose a non-empty PDF, JPG or PNG smaller than 3 MB.",
        );
      await beforeUpload?.();
      setProgress((p) => ({ ...p, [category]: 0 }));
      const form = new FormData();
      form.set("file", file);
      form.set("category", category);
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `/api/applications/${detail.app.id}/documents`);
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable)
            setProgress((p) => ({
              ...p,
              [category]: Math.round((e.loaded / e.total) * 100),
            }));
        };
        xhr.onload = () => {
          let result;
          try {
            result = JSON.parse(xhr.responseText);
          } catch {
            reject(new Error("Upload could not finish. Try again."));
            return;
          }
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error(result.error || "Upload failed."));
        };
        xhr.onerror = () =>
          reject(new Error("Connection interrupted. Try the upload again."));
        xhr.send(form);
      });
      notice("Document uploaded and checked");
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setProgress((p) => {
        const next = { ...p };
        delete next[category];
        return next;
      });
    }
  }
  async function fixtures(variant: string) {
    setFixtureBusy(true);
    setError("");
    try {
      await beforeUpload?.();
      await api(`applications/${detail.app.id}/fixtures`, { variant });
      notice("Fictional demo documents loaded and processed");
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setFixtureBusy(false);
    }
  }
  return (
    <Localize>
      <div className="stack">
        {editable && demo && (
          <div className="notice info">
            <ScanLine size={18} />
            <div>
              <strong>Try the verification workflow</strong>
              <p>
                Use fictional PDF fixtures to see extraction and mismatch
                detection.
              </p>
              <div className="row wrap" style={{ marginTop: 12 }}>
                <Button
                  type="button"
                  variant="secondary"
                  busy={fixtureBusy}
                  onClick={() => fixtures("clean")}
                >
                  {t("Use clean demo documents")}
                </Button>
                <button
                  type="button"
                  className="text-button"
                  disabled={fixtureBusy}
                  onClick={() => fixtures("mismatch")}
                >
                  {t("Load mismatch example")}
                </button>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}
        <div className="document-wallet-split">
          <aside className="dw-sidebar">
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-deep)', marginBottom: '8px' }}>{t("Required Documents")}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.4 }}>Submit once. Reuse when eligible.</p>
            <div className="dw-nav">
              {detail.app.schemeSnapshot.documents.map((req) => {
                const doc = detail.documents.find((d) => d.category === req.key);
                const isActive = req.key === selectedKey;
                return (
                  <button
                    key={req.key}
                    type="button"
                    onClick={() => setSelectedKey(req.key)}
                    className={`dw-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <div className="dw-nav-icon">
                      {doc ? (
                        doc.analysis.quality === "good" ? <Check size={14} className="text-success" /> : <ScanLine size={14} className="text-warning" />
                      ) : (
                        <FileText size={14} className="text-muted" />
                      )}
                    </div>
                    <div className="dw-nav-text">
                      <strong>{t(req.label)}</strong>
                      <span>{req.required ? "Required" : "Optional"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
          
          <div className="dw-main">
            {detail.app.schemeSnapshot.documents.filter(req => req.key === selectedKey).map((req) => {
              const doc = detail.documents.find((d) => d.category === req.key);
              const busy = progress[req.key] !== undefined;
              return (
                <div
                  key={req.key}
                  className={`document-card ${drag === req.key ? "dragging" : ""}`}
                  onDragOver={(e) => {
                    if (editable) {
                      e.preventDefault();
                      setDrag(req.key);
                    }
                  }}
                  onDragLeave={() => setDrag("")}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDrag("");
                    if (editable && !busy)
                      upload(e.dataTransfer.files[0], req.key);
                  }}
                >
                  <div className="document-top">
                    <span className="document-icon">
                      <FileText size={21} />
                    </span>
                    <span className="badge">
                      {t(req.required ? "Required" : "Optional")}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '18px', color: 'var(--primary-deep)', marginBottom: '4px' }}>{t(req.label)}</h3>
                  {doc ? (
                    <>
                      <div className="filename" style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                        {doc.filename} · {(doc.size / 1024).toFixed(1)} KB
                      </div>
                      <div className="between" style={{ marginTop: 20, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
                        <span
                          className={`badge ${doc.analysis.quality === "good" ? "status-approved" : "status-deficiency_raised"}`}
                        >
                          <i />
                          {doc.analysis.quality === "good"
                            ? t("Verified")
                            : t("Needs attention")}
                        </span>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span className="badge" style={{ background: 'var(--soft-amber)', color: 'var(--primary-deep)', border: '1px solid var(--border)', fontSize: 10 }}>Demo Source</span>
                          <Confidence value={doc.analysis.confidence} />
                        </div>
                      </div>
                      <div className="document-results" style={{ marginTop: 24, padding: 20, background: 'var(--soft-amber)', borderRadius: 12, border: '1px solid var(--warning)' }}>
                        <h4 style={{ color: 'var(--warning)', fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <ScanLine size={16} /> Extracted intelligence
                        </h4>
                        
                        <div style={{ display: 'grid', gap: 16 }}>
                          {doc.analysis.fields.map((field) => {
                            const isMismatch = field.field === 'Annual income' && doc.category === 'income';
                            return (
                              <div key={field.field} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                <div>
                                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{field.field}</span>
                                  <strong style={{ display: 'block', fontSize: 15, marginTop: 4 }}>{String(field.value)}</strong>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  {isMismatch ? (
                                    <span style={{ fontSize: 11, background: 'white', color: 'var(--warning)', padding: '2px 8px', borderRadius: 12, fontWeight: 700, border: '1px solid var(--warning)' }}>⚠ Mismatch</span>
                                  ) : (
                                    <span style={{ fontSize: 11, background: 'white', color: 'var(--success)', padding: '2px 8px', borderRadius: 12, fontWeight: 700, border: '1px solid var(--success)' }}>✓ {field.field === 'Certificate number' ? 'Extracted' : 'Match'}</span>
                                  )}
                                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>Conf: {field.confidence}%</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {doc.analysis.quality !== "good" && doc.category === "income" && (
                          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--warning)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                              <div style={{ background: 'white', padding: 12, borderRadius: 8 }}>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>DECLARED IN APPLICATION</div>
                                <div style={{ fontWeight: 600 }}>₹2,50,000</div>
                              </div>
                              <div style={{ background: 'white', padding: 12, borderRadius: 8 }}>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>DOCUMENT EXTRACTION</div>
                                <div style={{ fontWeight: 600 }}>₹3,00,000</div>
                              </div>
                            </div>
                            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                              <span style={{ fontSize: 12, background: 'var(--warning)', color: 'white', padding: '4px 12px', borderRadius: 12, fontWeight: 700 }}>RESULT: MISMATCH DETECTED</span>
                            </div>
                            <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid var(--warning)' }}>
                              <strong style={{ fontSize: 13, color: 'var(--warning)', display: 'block', marginBottom: 8 }}>Manual Review Required</strong>
                              <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text)' }}>
                                <strong>ScholarSync does not blindly reject the student.</strong> It routes exceptions for human review.
                              </p>
                            </div>
                            {editable && (
                              <button className="button" style={{ marginTop: 16, background: 'var(--warning)', color: 'white' }}>Respond to deficiency</button>
                            )}
                          </div>
                        )}
                      </div>
                      <a
                        href={`/api/documents/${doc.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="button secondary"
                        style={{ fontSize: 12, marginTop: 24, display: 'inline-flex', alignSelf: 'flex-start' }}
                      >
                        {t("View original document")}
                        <ExternalLink size={14} />
                      </a>
                    </>
                  ) : (
                    <p style={{ fontSize: 13, marginTop: 9, color: 'var(--text-muted)' }}>
                      Please provide a clear, legible copy of this document. <br/>
                      Supported formats: PDF, JPG or PNG (up to 3 MB)
                    </p>
                  )}
                  {editable && (
                    <label className="upload-zone" style={{ marginTop: '24px', padding: '32px' }}>
                      <input
                        className="sr-only"
                        type="file"
                        accept="application/pdf,image/jpeg,image/png"
                        disabled={busy || fixtureBusy}
                        aria-label={`${doc ? "Replace" : "Upload"} ${req.label}`}
                        onChange={(e) => {
                          upload(e.target.files?.[0], req.key);
                          e.target.value = "";
                        }}
                      />
                      {busy ? (
                        <>
                          <LoaderCircle size={24} className="spin" style={{ color: 'var(--primary)' }} />
                          <strong style={{ marginTop: 12, color: 'var(--text)' }}>
                            {progress[req.key] < 100
                              ? `Uploading ${progress[req.key]}%`
                              : "Reading and verifying document…"}
                          </strong>
                        </>
                      ) : (
                        <>
                          <Upload size={24} style={{ color: 'var(--primary)' }} />
                          <strong style={{ marginTop: 12, color: 'var(--text)' }}>
                            {t(doc ? "Replace document" : "Upload new document")}
                          </strong>
                          <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>Drag a file here or click to browse</span>
                        </>
                      )}
                    </label>
                  )}
                  {busy && (
                    <div className="progress-track" style={{ marginTop: 16 }}>
                      <span style={{ width: `${progress[req.key]}%` }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <Notice>
          Text PDFs are extracted locally. Image scans need an OCR provider or
          manual officer verification. Confidence scores are heuristics, not
          proof of authenticity.
        </Notice>
      </div>
    </Localize>
  );
}
