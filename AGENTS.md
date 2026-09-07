# India Islamic Cultural Centre (IICC) Scholarship Platform — Developer & Agent Guidelines

## 1. Project Overview
**Scholarship IIC** is the official scholarship application, verification, and governance platform for the **India Islamic Cultural Centre (IICC)**, 87-88, Lodhi Road, New Delhi-110003 (Education Committee, Convener: Dr. Khwaja M. Shahid).

### Monorepo Structure
```
scholarship-iic/
├── WEB/                       # Next.js 16 (React 19, TypeScript, Tailwind CSS)
│   ├── app/                   # App Router routes (Public, Student, Admin)
│   ├── components/            # Reusable UI & layout components
│   │   ├── layout/            # Navbars, Footers, Sidebars, DemoBanner
│   │   ├── ui/                # StatusBadges, Modal, Pagination, StatCard, EmptyState
│   │   ├── student/           # Timeline, DocumentUploader, VideoKycSimulator
│   │   └── admin/             # DocumentCompareModal, AdminCharts
│   ├── context/               # AppContext (state management + localStorage sync)
│   ├── data/                  # Typed mock datasets (100+ applications, scholarships, audit, etc.)
│   ├── types/                 # TypeScript entity definitions (scholarship.ts)
│   └── package.json
├── backend/                   # Python 3.12 Flask API Service
│   ├── app.py                 # Flask server with CORS & endpoints (/api/health, /api/scholarships)
│   ├── requirements.txt       # Flask, flask-cors, python-dotenv
│   └── venv/                  # Python virtual environment
└── AGENTS.md                  # System instructions for agents
```

---

## 2. Institutional Specification & Quotas (200 Awards)

### Award Quota Distribution
- **Total Awards**: 200 Awards per academic session (175 General + 25 Staff Children).
  1. **Undergraduate Professional Course**: 50 Awards (B.Tech, MBBS, BDS, BCA, B.Sc, etc.)
  2. **Senior Secondary (Class XI–XII)**: 50 Awards
  3. **Postgraduate Professional Course**: 40 Awards (M.Tech, MBA, MCA, M.Sc, etc.)
  4. **School Level (Class IX–X)**: 20 Awards
  5. **Diploma Courses**: 15 Awards (Polytechnic / Post-Class 10/12/Graduation)
  6. **IICC Staff / Management Children Quota**: 25 Reserved Awards

### 3 Mandatory Baseline Conditions
1. **Condition 1**: Must be a citizen of India residing in India.
2. **Condition 2**: Must be a regular full-time student in a recognized institution (distance/correspondence/part-time are strictly ineligible).
3. **Condition 3**: Minimum 60% aggregate marks in the last qualifying examination. Below 60% is strictly ineligible.

### Official 100-Mark Merit Scoring Formula
- **Academic Performance (Max 60 Marks)**:
  - &gt;=95%: 60 marks
  - 90% – 94.99%: 55 marks
  - 85% – 89.99%: 50 marks
  - 80% – 84.99%: 45 marks
  - 75% – 79.99%: 40 marks
  - 70% – 74.99%: 35 marks
  - 65% – 69.99%: 30 marks
  - 60% – 64.99%: 25 marks
  - CGPA Formula: `Percentage = CGPA × 9.5`
- **Annual Family Income (Max 35 Marks)**:
  - Up to ₹1,50,000: 35 marks
  - ₹1,50,001 to ₹2,50,000: 30 marks
  - ₹2,50,001 to ₹3,50,000: 25 marks
  - ₹3,50,001 to ₹4,50,000: 20 marks
  - ₹4,50,001 to ₹5,50,000: 15 marks
  - ₹5,50,001 to ₹6,50,000: 10 marks
  - ₹6,50,001 to ₹8,00,000: 5 marks
  - Above ₹8,00,000: 3 marks
- **Special Category (Max 5 Marks Capped)**:
  - Orphan Student: 5 marks
  - Single Parent / Widow Mother: 4 marks
  - Student with Disability (PwD &gt;= 40%): 3 marks
  - Girl Student: 2 marks
- **Sequential Tie-Breaking**:
  1. Lower family income ➔ 2. Higher academic % ➔ 3. Special category seniority ➔ 4. Younger candidate.

---

## 3. Technology Stack & Commands

### Frontend (`WEB/`)
- **Framework**: Next.js 16.3.4 (App Router, Turbopack)
- **UI Library**: React 19.2.8
- **Styling**: Tailwind CSS v4, custom institutional color palette (Navy Blue `#0f294a`, Emerald `#059669`, Amber `#d97706`, Slate neutrals)
- **Icons**: `lucide-react`
- **Build & Dev Commands**:
  ```bash
  cd WEB
  npm run dev       # Starts dev server on http://localhost:3000
  npm run build     # Production compilation & strict TypeScript check
  npm run lint      # ESLint check
  ```

### Backend Service (`backend/`)
- **Framework**: Python 3.12 + Flask 3.1
- **Middleware**: `flask-cors`, `python-dotenv`
- **Commands**:
  ```bash
  cd backend
  source venv/bin/activate
  python app.py     # Runs Flask API on http://127.0.0.1:5000
  ```

---

## 4. State Management & Demo Personas

State is centrally managed via [`WEB/context/AppContext.tsx`](file:///Users/mohd/Desktop/MOHD/pp/scholarship-iic/WEB/context/AppContext.tsx) and synchronized to `localStorage`.

### Preset Demo Personas:
1. **Mohd Zama (`draft`)**: In-progress applicant; tests multi-step form, draft saving, doc upload, and submission.
2. **Priya Sharma (`shortlisted`)**: Shortlisted candidate (#18); tests simulated Video KYC flow.
3. **Rahul Verma (`waitlisted`)**: Waitlisted candidate (#12); tests waitlist status view and admin succession promotion.
4. **Ananya Patel (`approved`)**: Confirmed awardee; tests printable award letter and DBT verification.
5. **Vikram Singh (`correction`)**: Deficient applicant; tests document correction notice and re-upload.
6. **Dr. Rajeshwar Rao (`admin`)**: Super administrator; full triage, OCR inspection, and decision overrides.

---

## 5. Coding Standards for Future Agents

1. **Strict TypeScript**: Do not use `any` unless absolutely required for catch blocks. Maintain strict interfaces in [`WEB/types/scholarship.ts`](file:///Users/mohd/Desktop/MOHD/pp/scholarship-iic/WEB/types/scholarship.ts).
2. **Next.js 16 Dynamic Route Rules**: Dynamic route params (`params: Promise<{ id: string }>`) must be unwrapped using `use(params)` or `await params`.
3. **Preserve Next.js Agent Rules**: Do not remove or alter the `<!-- BEGIN:nextjs-agent-rules -->` block in `WEB/AGENTS.md`.
4. **Clean Restrained Aesthetics**: Preserve the institutional design system. Avoid neon gradients or excessive SaaS animations. Ensure high contrast and mobile responsiveness.
5. **Build Verification**: Always run `npm run build` in `WEB/` before completing tasks to guarantee zero type errors or broken routes.
