# SIH 2026 PS 26238 - Final Demo Script

**Total Time:** ~4:00

**0:00 - Problem Statement & Solution Overview**
Hello Jury. We present ScholarSync for PS 26238. Currently, tribal students face fragmented portals, repetitive document uploads, and opaque rejections. Officers are overwhelmed with manual verification. ScholarSync unifies five schemes into one portal, utilizes document intelligence for automated verification, and actively identifies missing beneficiaries.

**0:20 - Kavita Student 360**
Meet Kavita Meena, a verified ST student. Her Student 360 dashboard unifies her identity, active applications, and verification health in one view.

**0:45 - Five Scholarship Schemes**
Instead of five separate portals, Kavita sees all five Ministry schemes—Pre-Matric, Post-Matric, Top Class, NFST, and NOS—in one grid. The system automatically calculates her eligibility based on her profile and prevents duplicate enrollments.

**1:05 - Post-Matric Application & Conflict Engine**
Kavita attempts to apply for a secondary scheme while holding an active Post-Matric application. The Conflict Engine intervenes, enforcing the 'One Scholarship' rule and gracefully blocking duplicate funds.

**1:25 - Document Wallet & Reuse**
Kavita enters her Document Wallet. Documents like her Domicile and ST certificates are retained across applications, eliminating redundant uploads. We distinguish between 'Verified' and 'Needs Attention' documents.

**1:45 - Document Intelligence**
She uploads her Income Certificate. In milliseconds, our engine extracts the text, runs fuzzy matching against her declared data, and calculates a confidence score.

**2:05 - Income Mismatch + Exception Routing**
The engine detects a discrepancy: The document reads ₹3,00,000, but her application stated ₹2,50,000. Instead of auto-rejecting, the system tags a 'Mismatch' and routes it for manual officer review, protecting her from technical disqualification.

**2:25 - JAGO: The Intelligent Companion**
Confused, Kavita asks JAGO, "Why is my application pending?" JAGO isn't a generic FAQ bot. It uses her exact session context to reply: "Hi Kavita, I checked your Post-Matric application. Your Income Certificate needs attention."

**2:45 - Operations Review**
Switching to the Scrutiny Officer persona. The officer sees Kavita's flagged application. They review the extracted intelligence vs the application data and use the system to request a targeted correction or perform an authorized override.

**3:05 - Sanction & Payment Journey**
Once verified, the application flows to Sanction. Kavita's timeline updates transparently. We simulate the final step where PFMS triggers a DBT payout, completing the lifecycle.

**3:25 - Ministry Coverage Intelligence**
Switching to the Ministry persona. We demonstrate proactive governance. By cross-referencing UDISE+ enrollment data with our ST beneficiary database, ScholarSync identifies 'Potential Beneficiaries'—students enrolled but missing out—and flags them for outreach.

**3:50 - Closing**
ScholarSync transforms scholarships from a reactive hurdle into a proactive, intelligent service. Thank you.
