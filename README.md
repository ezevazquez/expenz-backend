# 🏢 Backend - Property Management System

This repository contains the **backend** of a property and condominium management system built with **NestJS**. It is designed to handle the full financial and operational cycle of buildings or private neighborhoods: managing units, expenses, settlements, payments, providers, users, and more — with a focus on **transparency**, **innovation**, and **accessibility**.

---

## 🚀 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **Database:** PostgreSQL (or SQLite for local development)
- **ORM:** TypeORM
- **Authentication:** JWT (with guards and role-based access)
- **Emailing:** Nodemailer (with HTML templates and PDF attachments)
- **Testing:** Jest (unit + e2e)
- **Hosting:** Render (API) + Supabase (DB)
- **Dev Tools:** ESLint, Prettier, Nest CLI

---

## 🧱 Project Structure

```
src/
│
├── auth/              → JWT login, signup, and guards
├── buildings/         → Consortium or building definitions
├── units/             → Individual functional units
├── users/             → Owners and tenants
├── expenses/          → Building expenses
├── settlements/       → Monthly settlements (groups expenses)
├── charges/           → Charges generated per unit
├── payments/          → Payment registration
├── providers/         → Vendors and service providers
├── notifications/     → Email sending (HTML + optional PDF)
├── ledger/            → Financial transaction log (WIP)
└── shared/            → DTOs, decorators, enums, utils
```

---

## 📦 Features

- ✅ Multi-building support with separate administrators
- ✅ Automated expense distribution (by % or square meters)
- ✅ Monthly settlements and per-unit charges
- ✅ Payment tracking with balance reconciliation
- ✅ Email notifications with optional PDF summary
- ✅ Financial ledger (for full traceability)
- ✅ Role-based authentication (admin, user, superuser)
- ✅ Excel import for bulk unit creation
- ✅ Fully modular and testable backend

---

## 📈 Upcoming Features

- 🟡 Internal financial dashboard
- 🟡 Ledger analytics and monthly summaries
- 🟡 Penalties and custom coupons
- 🟡 Surveys and claim management
- 🟡 External payment integrations (e.g. MercadoPago)
- 🟡 Shared expenses between units
- 🟡 Full audit logging and admin replacement handling

---

## 🧪 Run Locally

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up `.env`**
   ```
   DATABASE_URL=postgres://user:pass@host:port/dbname
   JWT_SECRET=your_jwt_secret
   ```

3. **Run the app**
   ```bash
   npm run start:dev
   ```

4. **Run tests**
   ```bash
   npm run test
   ```

