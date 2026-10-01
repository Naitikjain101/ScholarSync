import type { FieldConfig, SchemeConfig } from "@/lib/domain";

// ============================================================
// COMMON FIELDS — shared across all five MoTA schemes
// ============================================================
export const commonFields: FieldConfig[] = [
  {
    key: "fullName",
    label: "Full name",
    section: "Personal information",
    type: "text",
    required: true,
    help: "Use the name on your Scheduled Tribe certificate.",
  },
  {
    key: "dob",
    label: "Date of birth",
    section: "Personal information",
    type: "date",
    required: true,
  },
  {
    key: "gender",
    label: "Gender",
    section: "Personal information",
    type: "select",
    required: true,
    options: ["Female", "Male", "Other", "Prefer not to say"],
  },
  {
    key: "category",
    label: "Category",
    section: "Personal information",
    type: "select",
    required: true,
    options: ["Scheduled Tribe", "PVTG (Particularly Vulnerable Tribal Group)", "Other"],
  },
  {
    key: "email",
    label: "Email address",
    section: "Personal information",
    type: "email",
    required: true,
  },
  {
    key: "phone",
    label: "Mobile number",
    section: "Personal information",
    type: "tel",
    required: true,
  },
  {
    key: "state",
    label: "Domicile state",
    section: "Personal information",
    type: "select",
    required: true,
    options: [
      "Jharkhand",
      "Odisha",
      "Chhattisgarh",
      "Madhya Pradesh",
      "Maharashtra",
      "Rajasthan",
      "Assam",
      "Meghalaya",
      "Arunachal Pradesh",
      "Manipur",
      "Mizoram",
      "Nagaland",
      "Sikkim",
      "Tripura",
      "Gujarat",
    ],
  },
  {
    key: "district",
    label: "District",
    section: "Personal information",
    type: "text",
    required: true,
  },
  {
    key: "familyIncome",
    label: "Annual family income (INR)",
    section: "Academic & financial details",
    type: "number",
    required: true,
  },
  {
    key: "academicScore",
    label: "Academic score (%)",
    section: "Academic & financial details",
    type: "number",
    required: true,
    help: "Enter your percentage, not CGPA.",
  },
  {
    key: "institution",
    label: "Institution name",
    section: "Academic & financial details",
    type: "text",
    required: true,
  },
  {
    key: "applicationYear",
    label: "Application year",
    section: "Academic & financial details",
    type: "number",
    required: true,
  },
  {
    key: "bankLast4",
    label: "Bank account last 4 digits",
    section: "Academic & financial details",
    type: "text",
    required: true,
    help: "Prototype: enter only the last four digits. Do not enter a real account number.",
  },
  {
    key: "ifsc",
    label: "Bank IFSC / demo identifier",
    section: "Academic & financial details",
    type: "text",
    required: true,
  },
];

// ============================================================
// BASE CONFIG — shared documents, rules and weights
// ============================================================
export const baseConfig: SchemeConfig = {
  fields: commonFields,
  documents: [
    {
      key: "category",
      label: "ST/PVTG certificate",
      required: true,
      fields: ["fullName", "category", "certificateId"],
    },
    {
      key: "income",
      label: "Income certificate",
      required: true,
      fields: ["fullName", "familyIncome", "certificateId", "validUntil"],
    },
    {
      key: "academic",
      label: "Academic transcript / marksheet",
      required: true,
      fields: ["fullName", "academicScore", "institution"],
    },
    {
      key: "domicile",
      label: "Domicile certificate",
      required: false,
      fields: ["fullName", "state"],
    },
  ],
  rules: [
    {
      id: "category",
      field: "category",
      operator: "IN",
      value: ["Scheduled Tribe", "PVTG (Particularly Vulnerable Tribal Group)"],
      label: "Scheduled Tribe / PVTG category",
    },
    {
      id: "income",
      field: "familyIncome",
      operator: "<=",
      value: 600000,
      label: "Annual income at most ₹6,00,000 (demo criterion)",
    },
    {
      id: "score",
      field: "academicScore",
      operator: ">=",
      value: 55,
      label: "Minimum academic score 55% (demo criterion)",
    },
    {
      id: "age",
      field: "age",
      operator: "BETWEEN",
      value: [18, 35],
      label: "Age between 18 and 35 (demo criterion)",
    },
  ],
  weights: { academic: 70, income: 20, research: 10 },
  quota: 12,
  stateQuotas: {},
  renewalMinScore: 55,
  deficiencyDays: 14,
  confidenceThreshold: 80,
};

// ============================================================
// DEMO SCHEMES — all five MoTA scholarship/fellowship schemes
// SIH 2026 Demonstration Data — not official policy
// ============================================================
export const demoSchemes = [
  // ── 1. PRE-MATRIC ────────────────────────────────────────
  {
    id: "pre-matric",
    code: "PRE_MATRIC",
    name: "Pre-Matric Scholarship for ST Students",
    shortName: "Pre-Matric",
    description:
      "Support for Scheduled Tribe students studying in Classes IX–X. A configurable demonstration inspired by the MoTA Pre-Matric Scholarship Scheme.",
    type: "Pre-Matric Scholarship",
    educationLevel: "Secondary (IX–X)",
    award: 7000,
    deadline: "2026-11-30",
    config: {
      ...baseConfig,
      fields: [
        ...commonFields.filter(
          (f) =>
            !["course", "applicationYear"].includes(f.key),
        ),
        {
          key: "classStudying",
          label: "Class currently studying",
          section: "Academic & financial details",
          type: "select" as const,
          required: true,
          options: ["IX", "X"],
        },
        {
          key: "institutionType",
          label: "Institution type",
          section: "Academic & financial details",
          type: "select" as const,
          required: true,
          options: [
            "Government school",
            "Government-aided school",
            "Private school",
            "Ashram school",
          ],
        },
      ],
      rules: [
        {
          id: "category",
          field: "category",
          operator: "IN" as const,
          value: ["Scheduled Tribe", "PVTG (Particularly Vulnerable Tribal Group)"],
          label: "Scheduled Tribe / PVTG category",
        },
        {
          id: "income",
          field: "familyIncome",
          operator: "<=" as const,
          value: 250000,
          label: "Annual income at most ₹2,50,000 (demo criterion)",
        },
        {
          id: "score",
          field: "academicScore",
          operator: ">=" as const,
          value: 50,
          label: "Minimum academic score 50% (demo criterion)",
        },
      ],
      quota: 50,
      weights: { academic: 60, income: 30, research: 10 },
    },
  },

  // ── 2. POST-MATRIC ────────────────────────────────────────
  {
    id: "post-matric",
    code: "POST_MATRIC",
    name: "Post-Matric Scholarship for ST Students",
    shortName: "Post-Matric",
    description:
      "Support for Scheduled Tribe students studying at Class XI and above. A configurable demonstration inspired by the MoTA Post-Matric Scholarship Scheme.",
    type: "Post-Matric Scholarship",
    educationLevel: "Post-Secondary (XI and above)",
    award: 15000,
    deadline: "2026-11-30",
    config: {
      ...baseConfig,
      fields: [
        ...commonFields,
        {
          key: "course",
          label: "Course / stream",
          section: "Academic & financial details",
          type: "select" as const,
          required: true,
          options: [
            "Class XI / XII",
            "ITI / Diploma",
            "Undergraduate (BA/BSc/BCom)",
            "Undergraduate (Engineering/Medical)",
            "Postgraduate",
            "Other",
          ],
        },
        {
          key: "institutionType",
          label: "Institution type",
          section: "Academic & financial details",
          type: "select" as const,
          required: true,
          options: [
            "Government college",
            "Government-aided college",
            "Private college",
            "Central university",
            "State university",
          ],
        },
      ],
      rules: [
        {
          id: "category",
          field: "category",
          operator: "IN" as const,
          value: ["Scheduled Tribe", "PVTG (Particularly Vulnerable Tribal Group)"],
          label: "Scheduled Tribe / PVTG category",
        },
        {
          id: "income",
          field: "familyIncome",
          operator: "<=" as const,
          value: 250000,
          label: "Annual income at most ₹2,50,000 (demo criterion)",
        },
        {
          id: "score",
          field: "academicScore",
          operator: ">=" as const,
          value: 50,
          label: "Minimum academic score 50% (demo criterion)",
        },
      ],
      quota: 40,
      weights: { academic: 60, income: 30, research: 10 },
    },
  },

  // ── 3. TOP CLASS ──────────────────────────────────────────
  {
    id: "top-class",
    code: "TOP_CLASS",
    name: "Top Class Scholarship for ST Students",
    shortName: "Top Class",
    description:
      "Support for high-achieving Scheduled Tribe students in premier institutions. A configurable demonstration inspired by the MoTA Top Class Scholarship Scheme.",
    type: "Merit Scholarship",
    educationLevel: "Undergraduate / Postgraduate (Premier Institutions)",
    award: 75000,
    deadline: "2026-10-31",
    config: {
      ...baseConfig,
      fields: [
        ...commonFields,
        {
          key: "course",
          label: "Course",
          section: "Academic & financial details",
          type: "select" as const,
          required: true,
          options: [
            "Engineering",
            "Medicine",
            "Law",
            "Management (MBA)",
            "Sciences",
            "Humanities",
            "Other",
          ],
        },
        {
          key: "institutionType",
          label: "Institution type",
          section: "Academic & financial details",
          type: "select" as const,
          required: true,
          options: [
            "IIT / NIT / IIIT",
            "IIM / XLRI / Other premiere mgmt",
            "AIIMS / other central medical",
            "Central university",
            "NLU / other law",
            "Other notified institution",
          ],
        },
      ],
      rules: [
        {
          id: "category",
          field: "category",
          operator: "IN" as const,
          value: ["Scheduled Tribe", "PVTG (Particularly Vulnerable Tribal Group)"],
          label: "Scheduled Tribe / PVTG category",
        },
        {
          id: "income",
          field: "familyIncome",
          operator: "<=" as const,
          value: 600000,
          label: "Annual income at most ₹6,00,000 (demo criterion)",
        },
        {
          id: "score",
          field: "academicScore",
          operator: ">=" as const,
          value: 60,
          label: "Minimum academic score 60% (demo criterion)",
        },
      ],
      quota: 15,
      weights: { academic: 80, income: 20, research: 0 },
    },
  },

  // ── 4. NFST ───────────────────────────────────────────────
  {
    id: "nfst",
    code: "NFST",
    name: "National Fellowship for ST Students",
    shortName: "NFST",
    description:
      "Support your research journey. A configurable demonstration inspired by the National Fellowship for Scheduled Tribe students.",
    type: "Research Fellowship",
    educationLevel: "MPhil / PhD",
    award: 37200,
    deadline: "2026-12-31",
    config: {
      ...baseConfig,
      fields: [
        ...commonFields,
        {
          key: "course",
          label: "Course",
          section: "Academic & financial details",
          type: "select" as const,
          required: true,
          options: ["PhD", "MPhil", "Masters"],
        },
        {
          key: "researchTitle",
          label: "Research title",
          section: "Research proposal",
          type: "text" as const,
          required: true,
        },
        {
          key: "supervisor",
          label: "Research supervisor",
          section: "Research proposal",
          type: "text" as const,
          required: true,
        },
        {
          key: "researchScore",
          label: "Research assessment score (%)",
          section: "Research proposal",
          type: "number" as const,
          required: true,
          help: "Demonstration assessment score; verified by an officer.",
        },
      ],
      rules: [
        ...baseConfig.rules,
        {
          id: "course",
          field: "course",
          operator: "IN" as const,
          value: ["PhD", "MPhil"],
          label: "Research course (demo criterion)",
        },
      ],
      quota: 12,
      weights: { academic: 70, income: 20, research: 10 },
    },
  },

  // ── 5. NOS ────────────────────────────────────────────────
  {
    id: "nos",
    code: "NOS",
    name: "National Overseas Scholarship",
    shortName: "NOS",
    description:
      "Take your education across borders. A configurable demonstration inspired by the National Overseas Scholarship for ST students.",
    type: "Overseas Scholarship",
    educationLevel: "Postgraduate / Research (Overseas)",
    award: 1500000,
    deadline: "2026-11-30",
    config: {
      ...baseConfig,
      quota: 8,
      weights: { academic: 80, income: 20, research: 0 },
      fields: [
        ...commonFields,
        {
          key: "course",
          label: "Course",
          section: "Academic & financial details",
          type: "select" as const,
          required: true,
          options: ["Masters", "PhD", "Postdoctoral"],
        },
        {
          key: "university",
          label: "Overseas university",
          section: "Overseas study",
          type: "text" as const,
          required: true,
        },
        {
          key: "country",
          label: "Destination country",
          section: "Overseas study",
          type: "text" as const,
          required: true,
        },
        {
          key: "offerStatus",
          label: "Admission offer",
          section: "Overseas study",
          type: "select" as const,
          required: true,
          options: ["Unconditional", "Conditional", "Awaiting offer"],
        },
      ],
      documents: [
        ...baseConfig.documents,
        {
          key: "admission",
          label: "University offer letter",
          required: true,
          fields: ["fullName", "university"],
        },
        {
          key: "passport",
          label: "Passport copy",
          required: true,
          fields: ["fullName"],
        },
      ],
      rules: [
        ...baseConfig.rules,
        {
          id: "offer",
          field: "offerStatus",
          operator: "=" as const,
          value: "Unconditional",
          label: "Unconditional admission offer (demo criterion)",
        },
      ],
    },
  },
];
