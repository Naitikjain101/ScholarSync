"use client";
import { Localize } from "@/components/localize";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Files,
  GraduationCap,
  Wallet,
  Bell,
  ChartNoAxesCombined,
  ShieldCheck,
  ListOrdered,
  ArrowUpRight,
  Search,
  Menu,
  X,
  LogOut,
  Languages,
  ChevronDown,
  BookOpen,
  HelpCircle,
  Play,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import type { Actor, Role } from "@/lib/domain";
import { roleLabels } from "@/lib/domain";
import { useApp, api } from "./providers";
import { Logo } from "./ui";
import { Chatbot } from "./chatbot";
const navigation = [
  {
    href: "/workspace",
    label: "Overview",
    icon: LayoutDashboard,
    roles: ["student", "officer", "scheme_admin", "ministry_admin"],
  },
  {
    href: "/applications",
    label: "My Scholarships",
    icon: GraduationCap,
    roles: ["student"],
  },
  {
    href: "/schemes",
    label: "Find Scholarship",
    icon: Search,
    roles: ["student"],
  },
  {
    href: "/applications",
    label: "Applications",
    icon: Files,
    roles: ["officer", "scheme_admin", "ministry_admin"],
  },
  {
    href: "/applications?q=verify",
    label: "Verification",
    icon: ShieldCheck,
    roles: ["officer", "scheme_admin"],
  },
  {
    href: "/workspace#documents",
    label: "Documents",
    icon: Files,
    roles: ["student"],
  },
  {
    href: "/payments",
    label: "Payments",
    icon: Wallet,
    roles: ["student", "officer", "ministry_admin"],
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: Bell,
    roles: ["student", "officer", "scheme_admin", "ministry_admin"],
  },
  {
    href: "#jago",
    label: "JAGO",
    icon: MessageCircle,
    roles: ["student", "officer"],
  },
  {
    href: "/merit",
    label: "Merit lists",
    icon: ListOrdered,
    roles: ["scheme_admin", "ministry_admin"],
  },
  {
    href: "/analytics",
    label: "Ministry analytics",
    icon: ChartNoAxesCombined,
    roles: ["ministry_admin", "scheme_admin"],
  },
  {
    href: "/audit",
    label: "Audit trail",
    icon: ShieldCheck,
    roles: ["scheme_admin", "ministry_admin"],
  },
];
export function Shell({
  actor,
  demo,
  children,
}: {
  actor: Actor;
  demo: boolean;
  children: React.ReactNode;
}) {
  const { t, toggleLanguage, language, notice } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [query, setQuery] = useState("");
  async function switchRole(role: Role) {
    setSwitching(true);
    try {
      await api("auth/demo", { role });
      router.push("/workspace");
      router.refresh();
    } catch (e) {
      notice((e as Error).message, true);
    } finally {
      setSwitching(false);
    }
  }
  return (
    <Localize>
      <div className={`app-shell role-${actor.role}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <aside className={`sidebar ${menu ? "open" : ""}`}>
          <div className="sidebar-brand">
            <Logo />
            <button
              className="mobile-only icon-button"
              aria-label="Close menu"
              onClick={() => setMenu(false)}
            >
              <X />
            </button>
          </div>
          <div className="workspace-pill">
            <span className="live-dot" />
            <span style={{ opacity: 0.8, fontSize: 11, fontWeight: 600 }}>{t(roleLabels[actor.role])} workspace</span>
          </div>
          <div className="nav-label">Workspace</div>
          <nav aria-label="Main navigation">
            {navigation
              .filter((n) => n.roles.includes(actor.role))
              .map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={(e) => {
                    setMenu(false);
                    if (n.href === "#jago") {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent("open-jago"));
                    }
                  }}
                  className={
                    pathname === n.href ||
                    (n.href !== "/workspace" &&
                      pathname.startsWith(n.href.split('?')[0] + "/"))
                      ? "active"
                      : ""
                  }
                >
                  <n.icon size={18} />
                  <span>
                    {t(
                      actor.role === "student" && n.href === "/applications"
                        ? "My Applications"
                        : actor.role === "student" && n.href === "/schemes"
                          ? "Find a Scheme"
                          : actor.role === "student" && n.href === "/workspace#documents"
                            ? "Documents"
                            : n.label,
                    )}
                  </span>
                  {n.href === "/notifications" && <span className="nav-dot" />}
                </Link>
              ))}
          </nav>
          <div className="sidebar-bottom">
            <Link href="/about/responsible-ai" className="sidebar-principle">
              <ShieldCheck size={20} />
              <span>
                Built for trust<small>Human decisions. Clear evidence.</small>
              </span>
              <ArrowUpRight size={14} />
            </Link>
            <Link href="/about/help" className="sidebar-help">
              <HelpCircle size={18} />
              {t("Help & guidance")}
            </Link>
            <Link href="/profile" className="user-block">
              <span className="avatar">
                {actor.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span>
                <strong>{actor.name}</strong>
                <small>{t(roleLabels[actor.role])}</small>
              </span>
              <ChevronDown size={16} />
            </Link>
            <button
              className="signout"
              onClick={async () => {
                await api("auth/logout");
                router.push("/");
                router.refresh();
              }}
            >
              <LogOut size={15} />
              {t("Sign out")}
            </button>
          </div>
        </aside>
        {menu && (
          <button
            className="sidebar-overlay"
            aria-label="Close menu"
            onClick={() => setMenu(false)}
          />
        )}
        
        {/* Mobile bottom nav — students only */}
        {actor.role === "student" && (
          <nav className="student-bottom-nav" aria-label="Mobile navigation">
            {navigation
              .filter((n) => n.roles.includes("student"))
              .map((n) => {
                const isActive = pathname === n.href || (n.href !== "/workspace" && pathname.startsWith(n.href.split('?')[0] + "/"));
                return (
                  <Link key={n.href} href={n.href} className={isActive ? "active" : ""}>
                    <n.icon size={20} />
                    <span>
                      {n.href === "/applications" ? "Scholarships"
                        : n.href === "/schemes" ? "Discover"
                        : n.href === "/workspace#documents" ? "Docs"
                        : n.label}
                    </span>
                  </Link>
                );
              })}
          </nav>
        )}
        <div className="app-body">
          <header className="topbar">
            <div className="topbar-left">
              <button
                className="mobile-only icon-button"
                aria-label="Open menu"
                aria-expanded={menu}
                onClick={() => setMenu(true)}
              >
                <Menu />
              </button>
              <div className="page-context">
                <span className="breadcrumb">ScholarSync <span className="divider">/</span> {pathname.split('/')[1] || 'workspace'}</span>
                <span className="topbar-title">{pathname === '/workspace' || pathname === '/' ? 'Dashboard' : pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1)}</span>
              </div>
            </div>
            <div className="topbar-actions">
              <form
                className="top-search"
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push(`/applications?q=${encodeURIComponent(query)}`);
                }}
              >
                <Search size={17} />
                <input
                  placeholder={t("Search applications")}
                  aria-label={t("Search applications")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <kbd>↵</kbd>
              </form>
              <button className="language-button" onClick={toggleLanguage}>
                <Languages size={16} />
                {language === "en" ? "हिन्दी" : "English"}
              </button>
              <Link
                className="icon-button bell"
                href="/notifications"
                aria-label={t("Notifications")}
              >
                <Bell size={20} />
              </Link>
              <Link
                href="/profile"
                className="top-avatar"
                aria-label="Open profile"
              >
                {actor.name[0]}
              </Link>
            </div>
          </header>
          {demo && (
            <div className="demo-bar">
              <span>
                <span className="demo-tag">SIH demo</span>
                <span>
                  {t(
                    "Fictional demo data. Not an official government service.",
                  )}
                </span>
              </span>
              <label>
                Explore as{" "}
                <select
                  aria-label="Switch demo role"
                  disabled={switching}
                  value={actor.role}
                  onChange={(e) => switchRole(e.target.value as Role)}
                >
                  {Object.entries(roleLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <main id="main" className="workspace-main">
            {children}
          </main>
          <footer className="workspace-footer">
            <span>© 2026 ScholarSync · SIH 26238 prototype</span>
            <span>
              <Link href="/about/privacy">{t("Privacy notice")}</Link>
              <Link href="/about/responsible-ai">{t("Responsible AI")}</Link>
              <Link href="/about/architecture">Architecture</Link>
            </span>
          </footer>
        </div>
        {demo && <DemoGuide />}
        <Chatbot actor={actor} />
      </div>
    </Localize>
  );
}
const steps = [
  {
    label: "Start with Kavita’s application",
    detail:
      "See an income mismatch, compare extracted evidence, and upload clean demo documents.",
    href: "/applications/SS-2026-0001",
    role: "student",
  },
  {
    label: "Review with an officer",
    detail:
      "Switch to Scrutiny officer. Open the application, inspect evidence and approve or make a reasoned override.",
    href: "/applications",
    role: "officer",
  },
  {
    label: "Create a merit list",
    detail:
      "Switch to Scheme administrator. Generate a ranking, inspect scores, then confirm selection.",
    href: "/merit",
    role: "scheme_admin",
  },
  {
    label: "See the ministry picture",
    detail:
      "Switch to Ministry administrator. Filter analytics, track payments and inspect the audit chain.",
    href: "/analytics",
    role: "ministry_admin",
  },
];
function DemoGuide() {
  const { t, notice } = useApp();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const router = useRouter();
  return (
    <Localize>
      <div className={`demo-guide ${open ? "expanded" : ""}`}>
        <button
          className="guide-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <Play size={14} />
          {t("Demo guide")}
          <span>{step + 1}/4</span>
        </button>
        {open && (
          <div className="guide-content">
            <div className="guide-steps">
              {steps.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Demo step ${i + 1}`}
                  className={i === step ? "current" : ""}
                  onClick={() => setStep(i)}
                >
                  {i < step ? <CheckCircle2 size={14} /> : i + 1}
                </button>
              ))}
            </div>
            <strong>{steps[step].label}</strong>
            <p>{steps[step].detail}</p>
            <button
              className="button small"
              onClick={async () => {
                try {
                  await api("auth/demo", { role: steps[step].role });
                  router.push(steps[step].href);
                  router.refresh();
                } catch (e) {
                  notice((e as Error).message, true);
                }
              }}
            >
              Open this step <ArrowUpRight size={14} />
            </button>
            {step < 3 && (
              <button className="text-button" onClick={() => setStep(step + 1)}>
                Next step
              </button>
            )}
          </div>
        )}
      </div>
    </Localize>
  );
}
