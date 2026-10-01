"use client";
import { Localize } from "@/components/localize";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import { api, useApp } from "./providers";
import type { Actor } from "@/lib/domain";

export function Chatbot({ actor }: { actor?: Actor }) {
  const { language, t } = useApp();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<
    { role: string; text: string; href?: string }[]
  >([]);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#jago") {
        setOpen(true);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("open-jago", () => setOpen(true));
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("open-jago", () => setOpen(true));
    };
  }, []);
  async function send(question: string) {
    if (!question.trim() || busy) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setText("");
    setBusy(true);
    try {
      const result = await api<{ answer: string; href: string }>("chat", {
        question,
        language,
      });
      setMessages((m) => [
        ...m,
        { role: "assistant", text: result.answer, href: result.href },
      ]);
    } catch (error) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: (error as Error).message },
      ]);
    } finally {
      setBusy(false);
    }
  }

  const isStudent = actor?.role === "student";
  const firstName = actor?.name?.split(" ")[0] || "Student";

  return (
    <Localize>
      <>
        {open && (
          <section className="chat-panel" aria-label={t("JAGO Scholarship Companion")}>
            <div className="chat-head" style={{ background: 'var(--primary)', color: 'white' }}>
              <Sparkles size={20} color="var(--accent-dark)" />
              <div>
                <strong style={{ display: 'block', fontSize: 16 }}>{t("JAGO")}</strong>
                <small style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                  {language === "hi"
                    ? "आपका छात्रवृत्ति साथी"
                    : "Your scholarship companion"}
                </small>
              </div>
              <button
                className="icon-button"
                aria-label="Close JAGO assistant"
                onClick={() => setOpen(false)}
                style={{ color: 'white' }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="chat-body" aria-live="polite">
              {isStudent ? (
                <div className="chat-message assistant">
                  Hi {firstName} 👋<br/><br/>
                  Your Post-Matric application is currently under verification.<br/><br/>
                  <strong>One document needs attention.</strong>
                </div>
              ) : (
                <div className="chat-message assistant">
                  {language === "hi"
                    ? "नमस्ते! मैं आवेदन, दस्तावेज़ और स्थिति समझने में मदद कर सकता हूँ।"
                    : "Hello! I can help with your application, documents, and next steps."}
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`chat-message ${m.role}`}>
                  {m.text}
                  {m.href && (
                    <Link href={m.href} onClick={() => setOpen(false)} style={{ display: 'block', marginTop: 8, color: 'var(--primary)', fontWeight: 600 }}>
                      {t("View details")} →
                    </Link>
                  )}
                </div>
              ))}
              {busy && <div className="muted" style={{ padding: '8px 12px', fontSize: 12 }}>{t("Please wait…")}</div>}
            </div>
            <div className="chat-suggestions" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, padding: '0 16px 16px' }}>
              {[
                "Why is there a mismatch?",
                "When will it be verified?"
              ].map((q) => (
                <button key={q} onClick={() => send(t(q))} style={{ background: 'var(--soft-amber)', color: 'var(--primary-deep)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 11, textAlign: 'left', lineHeight: 1.3 }}>
                  {t(q)}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(text);
              }}
              className="chat-form"
              style={{ padding: 16, borderTop: '1px solid var(--line)', background: 'white' }}
            >
              <input
                aria-label={t("Ask a question")}
                placeholder={t("Ask a question")}
                value={text}
                maxLength={500}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                disabled={busy || !text.trim()}
                aria-label="Send question"
              >
                <Send size={18} />
              </button>
            </form>
            <small className="chat-disclaimer">
              {language === "hi"
                ? "डेमो जानकारी। आधिकारिक सरकारी नीति नहीं।"
                : "Demo guidance. Not official government policy."}
            </small>
          </section>
        )}
        <button
          className="chat-launcher"
          aria-label={t("JAGO Scholar Assistant")}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <MessageCircle size={21} />}
          <span>{t("JAGO")}</span>
        </button>
      </>
    </Localize>
  );
}
