"use client";
import { Localize } from "@/components/localize";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { evaluateEligibility } from "@/lib/rules";
import type { SchemeView } from "./schemes";
import { Button, PageTitle } from "./ui";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { api } from "./providers";

import type { FormData } from "@/lib/domain";

export function FindScholarship({ schemes }: { schemes: SchemeView[] }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    category: "Scheduled Tribe",
    familyIncome: 250000,
    academicScore: 60,
  });
  const [busy, setBusy] = useState("");

  const update = (key: string, value: string | number | boolean) => setData((prev) => ({ ...prev, [key]: value }));

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  if (step === 4) {
    // Results
    const matches = schemes.map(s => {
      const result = evaluateEligibility(s.config.rules, data);
      return { scheme: s, result };
    });

    return (
      <Localize>
        <div className="stack" style={{maxWidth: 600, margin: '0 auto'}}>
          <Link href="/schemes" className="text-button" style={{alignSelf: 'flex-start'}}><ArrowLeft size={16} /> Back to schemes</Link>
          <PageTitle title="Your scholarship matches" description="Based on the details you provided, here are the schemes you are eligible for." />
          
          <div className="stack">
            {matches.map(({scheme, result}) => (
              <div key={scheme.id} className="snapshot-card" style={{borderColor: result.eligible ? 'var(--success)' : 'var(--border)'}}>
                <div className="between" style={{marginBottom: 16}}>
                  <div>
                    <h3 style={{margin: 0, fontSize: 16, color: 'var(--primary-deep)'}}>{scheme.name}</h3>
                    <p style={{fontSize: 12, marginTop: 4}}>{result.eligible ? "Potential match" : "Does not match all criteria"}</p>
                  </div>
                  {result.eligible ? <CheckCircle2 className="emerald-text" /> : <AlertCircle className="amber-text" />}
                </div>
                
                <div className="rule-list" style={{marginBottom: 20}}>
                  {result.results.slice(0, 3).map((r: { id: string; passed: boolean; label: string }) => (
                    <div className={`rule-result ${r.passed ? "" : "failed"}`} key={r.id}>
                      {r.passed ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      <span style={{fontSize: 11}}>{r.label}</span>
                    </div>
                  ))}
                  {result.results.length > 3 && <div className="small-text muted">...and {result.results.length - 3} more criteria</div>}
                </div>

                <div className="between">
                  <span className="small-text muted">Requires {scheme.config.documents.length} documents</span>
                  <Button 
                    disabled={!scheme.active || !!busy}
                    busy={busy === scheme.id}
                    onClick={async () => {
                      setBusy(scheme.id);
                      try {
                        const res = await api<{ id: string }>("applications", { schemeId: scheme.id });
                        router.push(`/applications/${res.id}`);
                        router.refresh();
                      } finally {
                        setBusy("");
                      }
                    }}
                  >
                    Start application <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Localize>
    );
  }

  return (
    <Localize>
      <div className="stack" style={{maxWidth: 500, margin: '40px auto'}}>
        <Link href="/schemes" className="text-button" style={{alignSelf: 'flex-start'}}><ArrowLeft size={16} /> Cancel</Link>
        <PageTitle title="Find My Scholarship" description={`Step ${step} of 3`} />
        
        <div className="snapshot-card stack">
          {step === 1 && (
            <>
              <h3>Education Level</h3>
              <label>
                Current or planned education level
                <select value={String(data.course || "")} onChange={e => update('course', e.target.value)}>
                  <option value="">Select level...</option>
                  <option value="School (Classes IX-X)">School (Classes IX-X)</option>
                  <option value="Higher Secondary (Classes XI-XII)">Higher Secondary (Classes XI-XII)</option>
                  <option value="Undergraduate">Undergraduate (Bachelors)</option>
                  <option value="Postgraduate">Postgraduate (Masters)</option>
                  <option value="MPhil/PhD">MPhil / PhD</option>
                  <option value="Postdoctoral Research">Postdoctoral Research</option>
                </select>
              </label>
              <label>
                Are you studying or planning to study abroad?
                <select value={data.overseas ? "yes" : "no"} onChange={e => update('overseas', e.target.value === "yes")}>
                  <option value="no">No, studying in India</option>
                  <option value="yes">Yes, studying overseas</option>
                </select>
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Category & Income</h3>
              <label>
                Applicant Category
                <select value={String(data.category || "")} onChange={e => update('category', e.target.value)}>
                  <option value="Scheduled Tribe">Scheduled Tribe (ST)</option>
                  <option value="PVTG">Particularly Vulnerable Tribal Group (PVTG)</option>
                  <option value="General">General / Other</option>
                </select>
              </label>
              <label>
                Annual Family Income (₹)
                <input type="number" value={String(data.familyIncome ?? "")} onChange={e => update('familyIncome', Number(e.target.value))} />
              </label>
              <p className="small-text muted">This helps match you with schemes that have income thresholds (e.g. ₹2.5L or ₹8.0L).</p>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Academic Performance</h3>
              <label>
                Previous Academic Score (%)
                <input type="number" value={String(data.academicScore ?? "")} onChange={e => update('academicScore', Number(e.target.value))} />
              </label>
              <label>
                Institution / Admission Status
                <select value={String(data.offerStatus || "")} onChange={e => update('offerStatus', e.target.value)}>
                  <option value="Not admitted yet">Not admitted yet</option>
                  <option value="Admitted to general institution">Admitted to general institution</option>
                  <option value="Admitted to Premier Institution">Admitted to Premier Institution</option>
                  <option value="Unconditional">Unconditional Offer (Overseas)</option>
                </select>
              </label>
            </>
          )}

          <div className="row" style={{marginTop: 20, justifyContent: 'flex-end'}}>
            {step > 1 && <Button variant="secondary" onClick={back} type="button">Back</Button>}
            <Button onClick={next} type="button">{step === 3 ? "Find Matches" : "Next"}</Button>
          </div>
        </div>
      </div>
    </Localize>
  );
}
