<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/graduation-cap.svg" width="80" alt="ScholarSync Logo" />
  <h1>🎓 ScholarSync</h1>
  <p><b>Unified Scholarship Intelligence and Verification Platform</b></p>
  <p><i>By Team HackDynasty | Smart India Hackathon 2026 | Problem Statement 26238</i></p>

  [![Live Prototype](https://img.shields.io/badge/Live_Prototype-scholarsync--hd.vercel.app-1E3A8A?style=for-the-badge&logo=vercel)](https://scholarsync-hd.vercel.app)
  [![YouTube Pitch](https://img.shields.io/badge/YouTube-Pitch_Video-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/mE_hLnSCaDc?si=diKoorJc9UpBifvV)
</div>

---

## 🚀 The Vision: One Student. One Profile. One Scholarship Journey.

> **The real problem is not the lack of schemes. It is fragmented application, verification, and visibility.**

Today, the **Ministry of Tribal Affairs (MoTA)** provides five major scholarship schemes for Scheduled Tribe students. However, the student journey is fragmented across different portals (NSP), document stores (DigiLocker), and identity systems (APAAR, UDISE+). 

Students repeatedly submit information, track applications separately, and often don't know where their application is stuck, what action is required, or when the scholarship will be disbursed.

✨ **ScholarSync** is our solution. It acts as an integration layer connecting existing government systems, offering a single, seamless workspace for students, scrutiny officers, and ministry administrators.

---

## 🏗️ Technical Flow & Core Features

### 👤 1. Student 360 & Eligibility Engine
The journey starts with **Student 360**, maintaining the student's required identity, academic, ST, income, and institution information in one unified profile. Our **Eligibility Engine** checks the five MoTA schemes and proactively identifies possible scholarship conflicts.

### 📄 2. Seamless Document Integration
Students reuse authorized information through sources such as **DigiLocker, APAAR, UDISE+, and e-District**, eliminating the need to repeatedly submit the same paperwork.

### 🛡️ 3. Intelligent Verification Engine
Our verification engine validates information using:
- 🧠 **Document Intelligence & OCR**
- 🔄 **Fuzzy Data Matching**
- 📊 **Confidence Scoring**
- ⚖️ **Predefined Eligibility Rules**

*(If identity and ST status match but income has a discrepancy, the system routes that specific exception to an **Officer Review Queue** rather than automatically rejecting the student.)*

### 🤖 4. AI-Powered Assistance (JAGO)
Through the **JAGO AI assistant**, a student can simply ask: *"Why is my scholarship pending?"* and receive a clear, actionable answer based on their authorized application status.

### 🎯 5. Beneficiary Gap Engine
ScholarSync helps MoTA identify enrolled or potentially eligible ST students who are **not** currently receiving scholarship benefits. Shift the perspective from *"Who has applied?"* to *"Who is eligible, who is receiving the benefit, and who may still be left out?"*

---

## 🛠️ Technical Approach & Stack

Our technical approach is **API-first and adapter-based**. We don't replace NSP, SFMP, or NOS. We connect them through a common integration layer.

<div align="center">
  
**Frontend**  
<br/>
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Backend & Database**  
<br/>
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Zod](https://img.shields.io/badge/Zod-3068b7?style=for-the-badge&logo=zod&logoColor=white)

</div>

**Document Intelligence:**
- `pdf-lib`, `unpdf`, and `Sharp`
- OCR-ready pipeline with PDF text extraction and image processing

---

## 💼 Feasibility, Viability & Deployment

- 📈 **High Feasibility:** We reuse existing infrastructure instead of rebuilding the scholarship ecosystem. Our adapter-based architecture is scalable.
- 🏢 **Business Model:** B2G (GovTech). Zero cost to students. Sustainability is achieved through government procurement (integration, infrastructure, AMC).
- 🛣️ **Deployment Path:** Pilot ➔ Integrate ➔ Validate ➔ Scale.

---

## 🏃‍♂️ Run Locally (Demo Mode)

The ScholarSync prototype includes a fully self-contained local development environment using an embedded **PGlite** database.

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Setup Environment:**
   ```bash
   cp .env.example .env.local
   ```
   *(Ensure `DEMO_MODE="true"` is set in `.env.local` to enable role switching and mock data)*
3. **Start the Application:**
   ```bash
   npm run dev
   ```
4. **Access the App:** 
   Open [http://localhost:3000](http://localhost:3000) in your browser. Navigate to `/demo` to switch between Student, Officer, Scheme Admin, and Ministry Admin personas instantly!

---

<div align="center">
  <b>AI-enabled scholarship and fellowship management.</b><br>
  <i>Developed with ❤️ for the Smart India Hackathon 2026.</i>
</div>
