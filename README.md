# 🎓 ChinaUni — International Student Admissions Platform

A high-converting web platform for international students applying to Chinese universities.

**Live stack:** Next.js 14 (App Router) · Tailwind CSS · Shadcn/UI · Supabase · React Hook Form · Zod

---

## Features

### 🎯 Eligibility Checker (no login required)
- 4-step multi-step form: Education → GPA → Language → Personal
- Instant matching against 20 top Chinese universities
- Match probability: High / Medium / Low with score breakdown
- Filter results by match tier
- CTA to start a full application

### 📋 Admission Management (authenticated)
- Supabase Auth (email + password)
- Document upload manager: passport, diploma, transcripts, medical, personal statement, recommendation letters
- Upload to Supabase Storage (`documents` bucket)
- Per-document status: Pending → Under Review → Approved / Rejected
- Application status timeline tracker (6 stages)

### 🛠 Admin Panel (`/admin`)
- Applicant table with search + status filter
- Inline status management (Pending / Reviewing / Approved / Rejected)
- Document ZIP download per applicant
- Stats dashboard

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/ddzgigguj/china-uni-admissions.git
cd china-uni-admissions
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Enable **Email Auth** under Authentication → Providers
3. Create a **Storage bucket** named `documents` (set to private)
4. Copy your project URL and anon key

### 3. Configure environment

```bash
cp .env.local.example .env.local
# Fill in your Supabase URL and anon key
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home + Eligibility Checker
│   ├── login/page.tsx              # Sign in
│   ├── register/page.tsx           # Sign up
│   ├── dashboard/
│   │   ├── layout.tsx              # Sidebar + auth guard
│   │   ├── page.tsx                # Overview
│   │   ├── documents/page.tsx      # Document upload manager
│   │   └── status/page.tsx         # Application status tracker
│   └── admin/page.tsx              # Admin panel
├── components/
│   └── calculator/
│       ├── EligibilityCalculator.tsx
│       ├── ProgressBar.tsx
│       ├── ResultsPanel.tsx
│       ├── UniversityCard.tsx
│       ├── StepEducation.tsx
│       ├── StepGPA.tsx
│       ├── StepLanguage.tsx
│       └── StepPersonal.tsx
├── lib/
│   ├── calculator.ts               # Matching algorithm
│   ├── supabase.ts                 # Supabase client
│   └── utils.ts                    # cn() helper
├── data/
│   └── universities.json           # 20 universities dataset
└── types/
└── index.ts                    # TypeScript types
```

---

## Brand

| Token | Value |
|-------|-------|
| Primary Blue | `#1a3a6b` |
| Accent Red | `#c0392b` |
| High Match | Green |
| Medium Match | Yellow |
| Low Match | Red |

---

## Supabase Setup Notes

**Storage bucket:** Create a bucket named `documents`. Set RLS policies so users can only read/write their own files (`auth.uid() = (storage.foldername(name))[1]`).

**Admin role:** For production, add a `role` column to `auth.users` metadata and check `user.user_metadata.role === 'admin'` in the admin page guard.
