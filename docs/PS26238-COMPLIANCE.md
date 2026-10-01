# SIH 2026 Problem Statement 26238 - Compliance Matrix

| Requirement | Implementation | API/Service | UI | Demo Ready | Status |
|-------------|----------------|-------------|-----|------------|--------|
| **1. Five scholarship schemes** | server/seed.ts & queries.ts | /api/schemes | dashboard.tsx Grid | Yes | COMPLETE |
| **2. Student 360** | Single Actor model & central app | /api/profile | Dashboard & Sidebar | Yes | COMPLETE |
| **3. Eligibility** | Rule-based evaluation | Server Actions | schemes.tsx Match | Yes | COMPLETE |
| **4. Unified application** | Single form submission | /api/applications | applications/[id] | Yes | COMPLETE |
| **5. Document wallet** | documents schema relation | /api/documents | documents-panel.tsx | Yes | COMPLETE |
| **6. Document reuse** | One document per category per student | POST /documents | Cross-app linkage | Yes | COMPLETE |
| **7. DigiLocker readiness** | Schema supports source & provider_id | Document Entity | Demo Source badge | Yes | DEMO ONLY |
| **8. PDF extraction** | Next.js server-side PDF-parse | lib/documents.ts | Field Extraction UI | Yes | COMPLETE |
| **9. OCR fallback** | Local stub for images | lib/documents.ts | Mismatch explanation | Yes | DEMO ONLY |
| **10. Document classification** | Rule-based heuristic | lib/documents.ts | Classification Badge | Yes | COMPLETE |
| **11. Field extraction** | Regex & structure parsing | lib/documents.ts | Extraction table | Yes | COMPLETE |
| **12. Fuzzy matching** | Levenshtein distance on strings | lib/documents.ts | Match/Mismatch tags | Yes | COMPLETE |
| **13. Confidence scoring** | Weighted aggregation based on fields | lib/documents.ts | Circular indicator | Yes | COMPLETE |
| **14. Exception routing** | status transition to under_verification | app/workflows | Deficiency state | Yes | COMPLETE |
| **15. Manual review** | Officer override mutation | app/actions.ts | Officer Dashboard | Yes | COMPLETE |
| **16. One-scholarship conflict** | Active scheme check in submission | server/actions.ts | 409 Conflict Modal | Yes | COMPLETE |
| **17. Unified status tracking** | Centralized application timeline | queries.ts | Timeline component | Yes | COMPLETE |
| **18. Sanction tracking** | Sanction step in timeline | queries.ts | Status indicator | Yes | DEMO ONLY |
| **19. Payment/DBT tracking** | Payments model | api/payments | payments.tsx | Yes | DEMO ONLY |
| **20. JAGO** | Server action returning context-aware response | api/chat | chatbot.tsx | Yes | COMPLETE |
| **21. Multilingual support** | i18n JSON mapping | i18n/messages.*.json | Localize wrapper | Yes | PARTIALLY COMPLETE |
| **22. Coverage-gap detection** | External enrollment dataset cross-reference | api/coverage | Ministry Dashboard | Yes | COMPLETE |
| **23. APAAR connector** | Stub architecture | server/connectors | Conceptual only | No | REQUIRES API |
| **24. Ministry analytics** | Aggregated queries | queries.ts | analytics.tsx | Yes | COMPLETE |
| **25. Audit trail** | Audit log relation | db/schema.ts | Timeline history | Yes | COMPLETE |
| **26. Consent** | Disclaimer & Terms on submission | UI Form | Checkbox validation | Yes | COMPLETE |
| **27. Mobile-first experience** | CSS Grid & Flexbox breakpoints | globals.css | Native responsiveness| Yes | COMPLETE |
| **28. Notifications** | Notice system / Toast | providers.tsx | Popup alerts | Yes | COMPLETE |
