import { and, desc, eq } from "drizzle-orm";
import { applications, deficiencies, schemes } from "@/db/schema";
import { getDb } from "./db";
import { statusLabels, type Actor } from "@/lib/domain";

// JAGO — ScholarSync scholarship assistant
// Demonstration knowledge base. Not official government policy.

export async function answerQuestion(
  actor: Actor,
  question: string,
  language: string,
) {
  const db = await getDb();
  const [app] = await db
    .select()
    .from(applications)
    .where(eq(applications.userId, actor.id))
    .orderBy(desc(applications.updatedAt))
    .limit(1);
  const list = await db.select().from(schemes);
  const q = question.toLowerCase();

  let answer =
    "Use Find a Scheme to explore all five MoTA scholarship schemes — Pre-Matric, Post-Matric, Top Class, NFST and NOS. Preview the configured criteria, check your eligibility, then create an application. Your form saves automatically. Upload all required documents, accept the declaration, and submit for verification.";
  let href = "/schemes";

  if (/check.*appli|appli.*status|track|where.*appli|स्थिति/.test(q)) {
    answer = app
      ? `Your most recent application is ${app.id}, currently ${statusLabels[app.status]}. ${app.recommendation || "Check the application detail for the next action."}`
      : "You have no applications yet. Visit Find a Scheme to begin your scholarship journey.";
    href = app ? `/applications/${app.id}` : "/schemes";
  } else if (/pending|why.*pending|क्यों/.test(q)) {
    const issues = app
      ? await db
          .select()
          .from(deficiencies)
          .where(
            and(
              eq(deficiencies.applicationId, app.id),
              eq(deficiencies.resolved, false),
            ),
          )
      : [];
    if (issues.length) {
      answer = `Your application is pending because ${issues.length} item${issues.length > 1 ? "s need attention" : " needs attention"}:\n\n${issues.map((d) => `• ${d.issue}: ${d.action}`).join("\n")}\n\nResolve the deficiency in your application to continue.`;
    } else if (app) {
      answer = `Your application (${app.id}) is currently ${statusLabels[app.status]}. No open deficiencies. It may be awaiting officer review or verification processing.`;
    } else {
      answer = "You have no applications yet. Start with Find a Scheme.";
    }
    href = app ? `/applications/${app.id}` : "/applications";
  } else if (/deficien|wrong|missing|correction|कमी/.test(q)) {
    const issues = app
      ? await db
          .select()
          .from(deficiencies)
          .where(
            and(
              eq(deficiencies.applicationId, app.id),
              eq(deficiencies.resolved, false),
            ),
          )
      : [];
    answer = issues.length
      ? `Open deficiencies on ${app?.id}:\n${issues.map((d) => `• ${d.issue}: ${d.action}`).join("\n")}`
      : "No open deficiencies on your most recent application. You can check the application timeline for updates.";
    href = app ? `/applications/${app.id}` : "/applications";
  } else if (/document|upload|wallet|दस्तावेज/.test(q)) {
    answer =
      "Each scheme requires different documents. Pre-Matric / Post-Matric: ST certificate, income certificate, marksheet. Top Class: same plus institution admission letter. NFST: adds a research proposal. NOS: adds university offer letter and passport copy. Upload PDF, JPG or PNG files up to 3 MB through your application or Document Wallet. Unclear scans are sent for manual officer review.";
    href = "/applications";
  } else if (/deadline|date|अंतिम/.test(q)) {
    answer = list
      .map((s) => `${s.code}: ${s.deadline} (demo deadline).`)
      .join(" ");
  } else if (/eligib|income|policy|पात्र|am i/.test(q)) {
    answer =
      "These are configurable demonstration rules, not official government policy. The seeded criteria check: ST / PVTG category, age range, academic score, and income limit — each varying by scheme. Use the eligibility preview in Find a Scheme to see which rules apply. Officers make the final decision on exceptions.";
    href = "/schemes";
  } else if (/payment|money|sanction|disburse|भुगतान/.test(q)) {
    answer =
      "Open Payments & renewals to see scheduled and recorded demo installments. This prototype tracks a demonstration payment ledger — it does not transfer real funds. Demo payments are clearly labelled as demonstration records.";
    href = "/payments";
  } else if (/find.*scholar|which.*scheme|scholar.*match|कौन|कौनसी/.test(q)) {
    answer =
      "I can help you find the right scheme. ScholarSync covers five MoTA schemes: Pre-Matric (IX–X), Post-Matric (XI+), Top Class (premier institutions), NFST (research fellowship) and NOS (overseas scholarship). Use Find a Scheme to check your eligibility against each.";
    href = "/schemes";
  } else if (/renew|renewal|नवीन/.test(q)) {
    answer =
      "Fellowship and scholarship renewals are tracked in Payments & renewals. You will need to submit a progress report and meet the renewal score threshold for your scheme. Your officer will review the renewal application.";
    href = "/payments";
  } else if (/verif|check.*doc|document.*status|सत्यापन/.test(q)) {
    answer =
      "Document verification is automated where possible. The system extracts text from your uploaded PDFs and images, then compares key fields (name, income, institution) against your application using fuzzy matching and confidence scoring. Mismatches or low confidence scores are flagged for officer review. This is a demonstration pipeline.";
    href = app ? `/applications/${app.id}` : "/applications";
  }

  if (language === "hi") {
    if (/status|appli|स्थिति/.test(q))
      answer = app
        ? `${app.id}: ${statusLabels[app.status]}। आवेदन विवरण में सत्यापन और समयरेखा देखें।`
        : "अभी कोई आवेदन नहीं है। योजना खोजें और अपनी छात्रवृत्ति यात्रा शुरू करें।";
    else if (/deadline|date|अंतिम/.test(q))
      answer = list
        .map((s) => `${s.code}: ${s.deadline} (डेमो अंतिम तिथि)`)
        .join("। ");
    else if (/document|upload|दस्तावेज/.test(q))
      answer =
        "प्रत्येक योजना के लिए अलग दस्तावेज़ चाहिए। जनजाति प्रमाणपत्र, आय प्रमाणपत्र और अंकपत्र सभी योजनाओं के लिए आवश्यक हैं। NOS के लिए प्रवेश पत्र और पासपोर्ट भी आवश्यक है। PDF, JPG या PNG, अधिकतम 3 MB।";
    else if (/deficien|कमी/.test(q))
      answer =
        "आवेदन विवरण में हर कमी और उसे सुधारने का तरीका दिया गया है। सही दस्तावेज़ अपलोड करके आवेदन दोबारा भेजें।";
    else if (/eligib|पात्र/.test(q))
      answer =
        "ये डेमो नियम हैं, आधिकारिक नीति नहीं। श्रेणी, आय, आयु और अंक की जाँच होती है। प्रत्येक योजना के लिए अलग मानदंड हैं। अधिकारी अंतिम निर्णय लेते हैं।";
    else if (/payment|भुगतान/.test(q))
      answer =
        "भुगतान और नवीनीकरण खोलें। यह प्रोटोटाइप डेमो भुगतान रिकॉर्ड रखता है — वास्तविक राशि का हस्तांतरण नहीं होता।";
    else
      answer =
        "पाँच MoTA योजनाएँ: प्री-मैट्रिक, पोस्ट-मैट्रिक, टॉप क्लास, NFST और NOS। योजना खोजें, पात्रता जाँचें और आवेदन करें। आवेदन अपने आप सहेजा जाता है। ये डेमो नियम हैं, आधिकारिक नीति नहीं।";
  }

  return {
    answer,
    href,
    provider: "ScholarSync JAGO — local knowledge base",
    disclaimer:
      language === "hi"
        ? "डेमो जानकारी • आधिकारिक सरकारी नीति नहीं • SIH 2026 प्रोटोटाइप"
        : "Demo guidance • Not official government policy • SIH 2026 prototype",
  };
}
