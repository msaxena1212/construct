# Zyno Construction Management Platform (Backend & AI Engine)

Enterprise full-stack construction ERP backend powered by **Node.js, Express, Sequelize (MySQL)** and **Ollama (`gemma4:31b-cloud`)**.

---

## 🌟 Modules & Features

### 1. 🏗️ Construction Operations
- **Daily Progress Reports (DPR)**: Daily field diaries, weather summaries, headcount logging, and AI auto-summarization (`/api/v1/dpr`).
- **Bill of Quantities (BOQ)**: Hierarchical cost line items, unit rates, total estimations, and AI PDF extraction (`/api/v1/boq`).
- **Snagging & Punch Lists**: Field defects, severity classification, trade assignment, and voice-to-snag parsing (`/api/v1/snags`).
- **Labour & Workforce**: Gang tracking, skilled/unskilled headcounts, overtime hours, and daily wage cost analytics (`/api/v1/labour`).
- **Drawing Register**: Revision history (e.g. IFC), discipline tags (Structural/Architectural/MEP), and blueprint vault (`/api/v1/drawings`).

### 2. 🤖 AI Copilot (`Ollama • gemma4:31b-cloud`)
- Natural language query interface synthesizing real-time data across milestones, daily reports, open defects, and budget metrics (`/api/v1/copilot/query`).

### 3. 🛡️ Multi-Tenant Security & RBAC
- Mandatory `company_id` tenancy checks on all project models.
- JWT verification and role-based action permission gates.

---

## 🚀 Environment Setup

Copy `.env.example` to `.env` and configure:

```ini
SERVER_PORT=3000
# SQLite is the only permitted database. DB_STORAGE must be an absolute path inside E:\Port\Construction\_sqlite_work
DB_TARGET_CLASS=<CHANGE_ME>
DB_DIALECT=sqlite
DB_STORAGE=<CHANGE_ME>
JWT_SECRET=<CHANGE_ME>
JWT_EXPIRES_IN=1h
NODE_ENV=development

# AI Engine (Ollama)
AI_PROVIDER=ollama
OLLAMA_HOST=http://127.0.0.1:11434
OLLAMA_MODEL=gemma4:31b-cloud
```

---

## 🛠️ Run & Development

```bash
# Install dependencies
npm install

# Start backend server
npm run dev
```
