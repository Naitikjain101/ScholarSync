"use client";
import { Localize } from "@/components/localize";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Circle,
  FileText,
  AlertCircle,
  Check,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  WalletCards,
  ChartNoAxesCombined,
  ShieldCheck,
  Users,
  TriangleAlert
} from "lucide-react";
import type { DashboardData } from "@/server/queries";
import type { Actor } from "@/lib/domain";
import { money, dateLabel } from "@/lib/domain";
import { PageTitle, Metric, Panel } from "./ui";
import { ApplicationTable } from "./application-table";
import { useApp } from "./providers";

export function Dashboard({
  data,
  actor,
}: {
  data: DashboardData;
  actor: Actor;
}) {
  const { t } = useApp();
  const student = actor.role === "student";

  if (student) {
    return <StudentDashboard data={data} actor={actor} t={t} />;
  }
  
  if (actor.role === "ministry_admin" || actor.role === "scheme_admin") {
     return <MinistryDashboard data={data} actor={actor} t={t} />;
  }

  return <OfficerDashboard data={data} actor={actor} t={t} />;
}

function StudentDashboard({ data, actor, t }: { data: DashboardData, actor: Actor, t: any }) {
  const app = data.recent.rows[0];
  
  return (
    <Localize>
      <div className="editorial-dashboard">
        <header className="student-dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h1>Good morning, {actor.name.split(" ")[0]}.</h1>
            <p style={{ fontSize: 18, color: 'var(--primary)', marginTop: 8, fontWeight: 600 }}>Your scholarship journey, all in one place.</p>
            <small className="header-subtitle" style={{ display: 'block', maxWidth: 600, marginTop: 12, lineHeight: 1.5, fontSize: 14 }}>
              Track eligibility, documents, verification, sanctions and payments across every MoTA scholarship scheme from one unified workspace.
            </small>
          </div>
          <div className="profile-card" style={{ background: 'white', padding: '16px 20px', borderRadius: 16, border: '1px solid var(--border)', display: 'flex', gap: 16, alignItems: 'center', boxShadow: '0 2px 8px rgba(49,46,129,0.04)' }}>
            <div className="avatar" style={{ width: 48, height: 48, fontSize: 16, background: 'var(--primary-soft)', color: 'var(--accent)' }}>
              {actor.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: 16, color: 'var(--foreground)' }}>{actor.name}</strong>
              <small style={{ color: 'var(--foreground-muted)', fontSize: 12 }}>B.A. • 2nd Year<br/>Government College, Rajasthan</small>
              <div style={{ marginTop: 8, fontSize: 11, background: 'var(--success-soft)', color: 'var(--success)', padding: '4px 8px', borderRadius: 4, display: 'inline-block', fontWeight: 700, letterSpacing: '0.2px' }}>
                ST Status: Verified — Demo Data
              </div>
            </div>
          </div>
        </header>

        {/* QUICK OVERVIEW */}
        <div className="editorial-row layout-quarters" style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          <div className="feature-panel" style={{ padding: 24, borderLeft: '3px solid var(--accent)' }}>
            <span style={{ color: 'var(--foreground-muted)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>ACTIVE APPLICATION</span>
            <h3 style={{ margin: '12px 0 8px', color: 'var(--foreground)', fontSize: 16 }}>Post-Matric Scholarship</h3>
            <div style={{ fontSize: 12, color: 'var(--info)', fontWeight: 600, background: 'var(--info-soft)', padding: '4px 8px', borderRadius: 6, display: 'inline-block' }}>Under Verification</div>
          </div>
          <div className="feature-panel" style={{ padding: 24, borderLeft: '3px solid var(--accent)' }}>
            <span style={{ color: 'var(--foreground-muted)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>VERIFICATION</span>
            <h3 style={{ margin: '12px 0 4px', color: 'var(--foreground)', fontSize: 28, fontWeight: 800 }}>78%</h3>
            <div style={{ fontSize: 12, color: 'var(--warning)', fontWeight: 600, background: 'var(--warning-soft)', padding: '4px 8px', borderRadius: 6, display: 'inline-block' }}>⚠ Needs attention</div>
          </div>
          <div className="feature-panel" style={{ padding: 24, borderLeft: '3px solid var(--success)' }}>
            <span style={{ color: 'var(--foreground-muted)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>DOCUMENTS</span>
            <h3 style={{ margin: '12px 0 4px', color: 'var(--foreground)', fontSize: 28, fontWeight: 800 }}>5</h3>
            <div style={{ fontSize: 12 }}><span style={{ color: 'var(--success)', fontWeight: 600 }}>4 verified</span><span style={{ color: 'var(--foreground-muted)' }}> • 1 needs review</span></div>
          </div>
          <div className="feature-panel" style={{ padding: 24, borderLeft: '3px solid var(--saffron)' }}>
            <span style={{ color: 'var(--foreground-muted)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>PAYMENT</span>
            <h3 style={{ margin: '12px 0 4px', color: 'var(--foreground)', fontSize: 20 }}>Pending</h3>
            <div style={{ fontSize: 12, color: 'var(--foreground-muted)' }}>Awaiting sanction</div>
          </div>
        </div>

        {/* ACTIVE APPLICATION */}
        {app && (
          <div style={{ marginTop: 32 }}>
            <div style={{ background: 'var(--primary-strong)', color: 'white', borderRadius: 20, padding: 32 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--saffron)', letterSpacing: '0.08em' }}>ACTIVE APPLICATION</span>
              <h2 style={{ color: 'white', marginTop: 10, fontSize: 26 }}>Post-Matric Scholarship</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36, marginTop: 24 }}>
                <div>
                  <small style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 4, fontSize: 11, letterSpacing: '0.04em' }}>APPLICATION ID</small>
                  <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'monospace' }}>SS-2026-00124</div>
                </div>
                <div>
                  <small style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 4, fontSize: 11, letterSpacing: '0.04em' }}>STATUS</small>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>UNDER VERIFICATION</div>
                </div>
                <div>
                  <small style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 4, fontSize: 11, letterSpacing: '0.04em' }}>SUBMITTED</small>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>12 Sep 2026</div>
                </div>
                <div>
                  <small style={{ color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 4, fontSize: 11, letterSpacing: '0.04em' }}>VERIFICATION</small>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>78%</div>
                </div>
              </div>

              <div style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', padding: '16px 20px', borderRadius: 12, marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <AlertCircle size={20} color="#F59E0B" />
                  <div>
                    <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: 11, letterSpacing: '0.05em' }}>ACTION REQUIRED</span>
                    <div style={{ fontWeight: 600, marginTop: 3, fontSize: 14 }}>Income Certificate mismatch</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link href={`/applications/${app.id}`} className="button" style={{ background: 'white', color: 'var(--primary-strong)', fontWeight: 700, padding: '9px 18px', borderRadius: 8, fontSize: 13 }}>Continue application</Link>
                  <button className="button" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '9px 18px', borderRadius: 8, fontSize: 13 }} onClick={() => document.querySelector('.chat-launcher')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>Ask JAGO</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROW 2: Timeline + Verification Health */}
        <div className="editorial-row" style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }}>
          <div className="feature-panel timeline-panel" style={{ padding: 32 }}>
            <h3 style={{ marginBottom: 24 }}>Application Timeline</h3>
            <div className="vertical-timeline" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <TimelineNode num="01" title="APPLICATION SUBMITTED" state="done" date="12 Sep" desc="Application submitted successfully" />
              <TimelineNode num="02" title="DOCUMENTS RECEIVED" state="done" date="13 Sep" desc="All 5 documents uploaded and stored" />
              <TimelineNode num="03" title="AUTOMATED VERIFICATION" state="done" date="14 Sep" desc="Cross-referenced with state databases" />
              <TimelineNode num="04" title="ACTION REQUIRED" state="alert" desc="Income certificate mismatch detected" />
              <TimelineNode num="05" title="OFFICER REVIEW" state="pending" desc="Upcoming manual review" />
              <TimelineNode num="06" title="SANCTION & PAYMENT" state="pending" desc="Upcoming DBT disbursement" />
            </div>
          </div>

          <div className="feature-panel verification-panel" style={{ padding: 32 }}>
            <h3>Verification Health</h3>
            <div style={{ margin: '24px 0', paddingBottom: 24, borderBottom: '1px solid var(--line)' }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>78%</div>
              <div style={{ color: 'var(--muted)', fontWeight: 500, marginTop: 8 }}>4 of 5 checks cleared</div>
            </div>
            
            <div className="vh-list" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="vh-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 500 }}><CheckCircle2 size={18} color="var(--success)" /> Identity</div>
                <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>Verified</span>
              </div>
              <div className="vh-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 500 }}><CheckCircle2 size={18} color="var(--success)" /> ST Status</div>
                <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>Verified</span>
              </div>
              <div className="vh-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 500 }}><CheckCircle2 size={18} color="var(--success)" /> Academic</div>
                <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>Verified</span>
              </div>
              <div className="vh-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 500 }}><CheckCircle2 size={18} color="var(--success)" /> Institution</div>
                <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>Verified</span>
              </div>
              <div className="vh-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--soft-amber)', padding: '12px 16px', borderRadius: 8, margin: '0 -16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600, color: 'var(--warning)' }}><TriangleAlert size={18} /> Income</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, color: 'var(--warning)', fontWeight: 700 }}>Needs Review</span>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: 24 }}>
              <Link href={`/applications/${app?.id || ''}`} className="button" style={{ width: '100%', justifyContent: 'center', background: 'white', border: '1px solid var(--line)' }}>Review issue</Link>
            </div>
          </div>
        </div>

        {/* FIVE SCHEMES UNIFIED VIEW */}
        <div style={{ marginTop: 48, marginBottom: 48 }}>
          <h2 style={{ marginBottom: 24, color: 'var(--foreground)', fontSize: 20, fontWeight: 700 }}>Your Scholarship Options</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <SchemeOptionCard name="Post-Matric Scholarship" active action="View application" status="Under Verification" desc="Financial assistance for ST students studying at post-matriculation or post-secondary stage." />
            <SchemeOptionCard name="Top Class Education" conflict desc="Scholarship for ST students pursuing degree and post degree courses in identified top institutes." />
            <SchemeOptionCard name="Pre-Matric Scholarship" unavailable="Not eligible (currently enrolled in UG)" desc="Financial assistance for ST students studying in classes IX and X." />
            <SchemeOptionCard name="National Fellowship (NFST)" unavailable="Not eligible (pursuing UG, not PG)" desc="Fellowship for ST students pursuing M.Phil and Ph.D." />
            <SchemeOptionCard name="National Overseas (NOS)" unavailable="Not eligible (pursuing UG, not PG)" desc="Financial assistance for ST students to pursue master degree or Ph.D courses abroad." />
          </div>
        </div>

      </div>
    </Localize>
  );
}

function SchemeOptionCard({ name, desc, active, conflict, unavailable, action }: any) {
  return (
    <div style={{ background: 'white', border: `1px solid ${conflict ? 'var(--warning)' : active ? 'var(--accent)' : 'var(--border)'}`, borderLeft: active ? '3px solid var(--accent)' : conflict ? '3px solid var(--warning)' : '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center', opacity: unavailable ? 0.65 : 1 }}>
      <div style={{ flex: '1 1 280px' }}>
        <h3 style={{ fontSize: 16, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--foreground)' }}>
          {name}
          {conflict && <span style={{ fontSize: 11, background: 'var(--warning-soft)', color: 'var(--warning)', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>Conflict Detected</span>}
          {active && <span style={{ fontSize: 11, background: 'var(--info-soft)', color: 'var(--info)', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>Active</span>}
        </h3>
        <p style={{ fontSize: 13, color: 'var(--foreground-muted)', lineHeight: 1.5 }}>{desc}</p>
        {conflict && (
          <div style={{ marginTop: 10, fontSize: 12, color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle size={13} />
            ScholarSync prevents overlapping scholarship benefits for this student.
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
        {unavailable && <span style={{ fontSize: 12, color: 'var(--foreground-muted)' }}>{unavailable}</span>}
        {active && <Link href="/applications" className="button" style={{ background: 'var(--accent)', color: 'white', fontSize: 12 }}>{action}</Link>}
        {conflict && <Link href="/applications" className="button secondary" style={{ fontSize: 12 }}>View active scholarship</Link>}
      </div>
    </div>
  );
}

function TimelineNode({ num, title, state, date, desc }: { num: string, title: string, state: 'done' | 'current' | 'pending' | 'alert', date?: string, desc?: string }) {
  const isDone = state === 'done';
  const isAlert = state === 'alert';
  return (
    <div style={{ display: 'flex', gap: 16, position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: isDone ? 'var(--soft-green)' : isAlert ? 'var(--soft-amber)' : 'white', border: `1px solid ${isDone ? 'var(--success)' : isAlert ? 'var(--warning)' : 'var(--line)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          {isDone ? <Check size={14} color="var(--success)" /> : isAlert ? <AlertCircle size={14} color="var(--warning)" /> : <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600 }}>{num}</span>}
        </div>
        {state !== 'pending' && <div style={{ width: 2, flex: 1, background: 'var(--line)', margin: '4px 0' }} />}
      </div>
      <div style={{ paddingBottom: 24, paddingTop: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: isAlert ? 'var(--warning)' : isDone ? 'var(--text)' : 'var(--muted)', letterSpacing: '0.5px' }}>{title}</span>
          {date && <span style={{ fontSize: 12, color: 'var(--muted)' }}>{date}</span>}
        </div>
        {desc && <div style={{ fontSize: 13, color: isAlert ? 'var(--text)' : 'var(--muted)', marginTop: 4, lineHeight: 1.4 }}>{desc}</div>}
      </div>
    </div>
  );
}

function TimelineStep({ label, active, done }: { label: string, active: boolean, done: boolean }) {
  return (
    <div className={`tl-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
      <div className="tl-icon">
        {done ? <Check size={14} /> : active ? <Circle size={10} fill="currentColor" /> : <Circle size={14} />}
      </div>
      <span className="tl-label">{label}</span>
      <div className="tl-line" />
    </div>
  );
}

function OfficerDashboard({ data, actor, t }: { data: DashboardData, actor: Actor, t: any }) {
  const review = data.byStatus.filter(s => ['ready_for_review', 'under_scrutiny'].includes(s.status)).reduce((n, s) => n + s.count, 0);
  return (
    <Localize>
      <div className="editorial-dashboard">
        <header className="student-dash-header">
          <h1>Welcome back, {actor.name.split(" ")[0]}.</h1>
          <p>Officer Verification Workspace</p>
        </header>

        <div className="editorial-row layout-thirds">
          <div className="feature-panel">
            <ShieldAlert size={24} className="text-warning" style={{marginBottom: 16}} />
            <h3>Pending scrutiny</h3>
            <span style={{fontSize: 32, fontWeight: 800, color: 'var(--text)'}}>{review}</span>
          </div>
          <div className="feature-panel forest-panel">
            <CheckCircle2 size={24} style={{color: 'var(--success)', marginBottom: 16}} />
            <h3 style={{color: 'white'}}>Verified today</h3>
            <span style={{fontSize: 32, fontWeight: 800, color: 'white'}}>24</span>
          </div>
          <div className="feature-panel action-panel">
            <AlertCircle size={24} className="text-warning" style={{marginBottom: 16}} />
            <h3 style={{color: 'var(--accent-dark)'}}>Deficiencies raised</h3>
            <span style={{fontSize: 32, fontWeight: 800, color: 'var(--accent-dark)'}}>7</span>
          </div>
        </div>

        <div className="feature-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ marginBottom: 0 }}>Verification Queue</h3>
            <Link href="/applications" className="button secondary small">View all cases</Link>
          </div>
          <ApplicationTable list={data.recent} actor={actor} compact />
        </div>
      </div>
    </Localize>
  );
}

function MinistryDashboard({ data, actor, t }: { data: DashboardData, actor: Actor, t: any }) {
  return (
    <Localize>
      <div className="editorial-dashboard">
        <header className="student-dash-header">
          <h1>National Scholarship Overview</h1>
          <p>Ministry of Tribal Affairs Intelligence</p>
        </header>

        <div className="editorial-row layout-status">
          <div className="feature-panel forest-panel" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: '40px 24px' }}>
            <div style={{ textAlign: 'center' }}>
              <span className="ep-eyebrow" style={{ color: 'var(--surface)' }}>APPLICATIONS</span>
              <div style={{ fontSize: 48, fontWeight: 800, marginTop: 8 }}>124k</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span className="ep-eyebrow" style={{ color: 'var(--success)' }}>VERIFIED</span>
              <div style={{ fontSize: 48, fontWeight: 800, marginTop: 8 }}>89.2k</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span className="ep-eyebrow" style={{ color: 'var(--warning)' }}>DEFICIENCIES</span>
              <div style={{ fontSize: 48, fontWeight: 800, marginTop: 8 }}>14.3k</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span className="ep-eyebrow" style={{ color: 'var(--accent)' }}>DISBURSED</span>
              <div style={{ fontSize: 48, fontWeight: 800, marginTop: 8 }}>₹42.5Cr</div>
            </div>
          </div>
        </div>

        <div className="editorial-row">
          <div className="feature-panel" style={{ flex: 1 }}>
            <h3>Scheme performance</h3>
             <div className="scheme-perf-list" style={{ marginTop: 24 }}>
                <div className="sp-item">
                  <span>Pre-Matric</span>
                  <div className="sp-bar"><div className="sp-fill" style={{width: '80%'}}></div></div>
                  <span>45k</span>
                </div>
                <div className="sp-item">
                  <span>Post-Matric</span>
                  <div className="sp-bar"><div className="sp-fill" style={{width: '90%'}}></div></div>
                  <span>62k</span>
                </div>
                <div className="sp-item">
                  <span>Top Class</span>
                  <div className="sp-bar"><div className="sp-fill" style={{width: '40%'}}></div></div>
                  <span>12k</span>
                </div>
                <div className="sp-item">
                  <span>NFST</span>
                  <div className="sp-bar"><div className="sp-fill" style={{width: '30%'}}></div></div>
                  <span>4k</span>
                </div>
                <div className="sp-item">
                  <span>NOS</span>
                  <div className="sp-bar"><div className="sp-fill" style={{width: '15%'}}></div></div>
                  <span>1.5k</span>
                </div>
             </div>
          </div>
          
          <div className="feature-panel action-panel" style={{ flex: 1, padding: 32, background: 'white', border: '1px solid var(--line)' }}>
            <h3 style={{ color: 'var(--primary-deep)', marginBottom: 24 }}>Coverage Intelligence</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--line)' }}>
              <div>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, display: 'block' }}>STUDENTS IDENTIFIED</span>
                <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', display: 'block', marginTop: 4 }}>12,480</span>
                <span style={{ fontSize: 10, color: 'var(--muted)', background: 'var(--soft-amber)', padding: '2px 6px', borderRadius: 4 }}>Demo Data</span>
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, display: 'block' }}>RECEIVING BENEFITS</span>
                <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--success)', display: 'block', marginTop: 4 }}>8,942</span>
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, display: 'block' }}>POTENTIALLY UNREACHED</span>
                <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--warning)', display: 'block', marginTop: 4 }}>3,538</span>
              </div>
            </div>

            <div className="gap-alerts">
              <div className="gap-alert" style={{ background: 'var(--soft-amber)', borderColor: 'var(--warning)', padding: 20, borderRadius: 12, display: 'flex', gap: 16 }}>
                <div style={{ background: 'white', width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--warning)' }}>
                  <Users size={20} color="var(--warning)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--warning)', display: 'block', marginBottom: 4 }}>POTENTIAL BENEFICIARY</span>
                      <strong style={{ color: 'var(--text)', fontSize: 16 }}>Demo Student</strong>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary-deep)', display: 'block', marginBottom: 4 }}>CONFIDENCE</span>
                      <strong style={{ color: 'var(--primary-deep)', fontSize: 16 }}>94%</strong>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--success)', fontWeight: 500 }}><CheckCircle2 size={14} /> Enrollment matched</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--success)', fontWeight: 500 }}><CheckCircle2 size={14} /> ST status verified</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--success)', fontWeight: 500 }}><CheckCircle2 size={14} /> Academic record matched</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--success)', fontWeight: 500 }}><CheckCircle2 size={14} /> No active scholarship</div>
                  </div>

                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'var(--warning)', fontWeight: 600 }}>Pending officer review</span>
                    <button className="button" style={{ background: 'white', color: 'var(--primary-deep)', border: '1px solid var(--line)' }}>Review case</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Localize>
  );
}
