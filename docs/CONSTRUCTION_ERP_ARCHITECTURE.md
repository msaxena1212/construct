# Construction ERP — Architecture

Status: Phase 0 baseline, 2026-11-01. This document describes the system as it exists in the repositories.
Items marked **Planned** or **Not implemented** are not part of the current application.

## 1. Repositories and version control

| Repository | Location | Branch | Status |
| --- | --- | --- | --- |
| Backend (Express + Sequelize) | `E:\Port\Construction\zyno_construction_backend\zyno_construction_backend` | `main` | Git repository. Uncommitted work present. |
| Frontend (Angular) | `E:\Port\Construction\zyno_construction_frontend\zyno_construction_frontend` | `main` | Git repository. Uncommitted work present; `dist/` is tracked in Git and has modifications. |

HEAD at Phase 0 baseline: backend `f82dab79c9d0eb4af5772d1e6a7434900de4a906`, frontend `548d363ee0dd9d250c8bbe1bd6743f44ddcc2458`.
No commit has been made in this phase. Recovery snapshot: `E:\Port\Construction\baselines\2026-10-31-pre-enterprise-audit`.

## 2. Technology stack (from `package.json`)

### Backend
- Runtime: Node.js. Tests and tools were run on Node v22.23.2 (nvm). The default shell Node is v26.13.0.
- Web framework: Express 5.2.1, body-parser 2.2.2, cors 2.8.6, express-rate-limit 8.7.0.
- ORM: Sequelize 6.37.8. Drivers: `mysql2` 3.22.0 (MySQL/MariaDB, production target); SQLite via Sequelize's sqlite dialect (verification and demo only).
- Authentication: JSON Web Tokens (`jsonwebtoken` 9.0.3), HS256 secret from `JWT_SECRET`, 24-hour expiry (`src/modules/auth/auth.controller.js`). Passwords hashed with `bcryptjs` 3.0.3.
- File uploads: `multer` 2.1.1, disk storage under `src/static/uploads` (see Security).
- Email: `nodemailer` 8.0.5 (`src/core/services/mail.service.js`). Delivery not verified in this phase.
- AI: `axios` 1.20.0 calling an Ollama HTTP endpoint (`src/core/services/ai.service.js`). Default host `http://127.0.0.1:11434`, default model `gemma4:31b-cloud`, both from environment variables. Not verified in this phase.
- Configuration: `dotenv` 17.4.2. `.env` is git-ignored.
- Tests: Jest (`jest` via `package.json` `test` script), Supertest for HTTP tests.

### Frontend
- Angular 21 (`@angular/*` 21.x), Angular Material 21.2.x, CDK 21.2.x, RxJS 7.8, zone.js 0.16.
- Styling: Tailwind CSS 4.2.x, PostCSS 8.5.x.
- Gantt: `@worktile/gantt` 21.0.0 and `frappe-gantt` 1.2.2.
- Other: `ngx-toastr` 20, `sweetalert2` 11, `marked` 18, `katex` 0.19.
- Build: `ng build --configuration production` (Angular CLI). Verified exit code 0 at baseline on Node v22.23.2.

### Infrastructure files present
- Backend: `Dockerfile`, `.gitlab-ci.yml` (in the parent `Construction` folder), `docker-compose.yml` and `DOCKER.md` (parent folder), `.env.example`, `run_tests.bat`.
- Frontend: `Dockerfile`, `nginx.conf`, `start_dev.bat`, `build_prod.bat`.
- No cloud hosting, queue, cache, search engine or WebSocket service is configured in the repositories. The `/api/v1/copilot` and `/stream` endpoints exist; their production use is not verified.

## 3. Runtime architecture

```
Browser (Angular SPA)
   │  HTTPS (Bearer JWT in Authorization header)
   ▼
Express 5 (src/app.js)
   ├─ CORS allowlist (allowedOrigins)
   ├─ Rate limiters: /api/auth (10 per 15 min), /api/v1 (300 per min), /api/v1/copilot
   ├─ JSON body limit 50 MB
   ├─ verifyAuthToken (src/core/middleware/auth.middleware.js)  → req.user
   ├─ Routes (src/routes/routes.js) → module route files
   │     └─ checkPermission(module, action)  (src/core/middleware/permission.middleware.js)
   │     └─ requireProjectAccess (src/core/middleware/project_access.middleware.js)
   ├─ Controllers → Services (business rules, transactions)
   └─ Models (src/models/index.js, Sequelize)
         │
         ▼
   MySQL/MariaDB (production configuration; not verified in this phase)
   SQLite (verification and demo only; see E: drive working location)
```

The application is a single Express process (`server.js`). There is no background job runner, message queue or scheduler in the repositories.

## 4. Module layout (backend, `src/modules/`)

| Folder | Responsibility | Notes |
| --- | --- | --- |
| `auth` | Sign-in | Rate limited |
| `users` | Users, companies, registration | Password hashing with bcrypt cost 8 |
| `rbac` | Roles, modules, role permissions | `rbac_module`, `role_permission` |
| `projects` | Projects, milestones, tasks, subtasks, DPR, BOQ, WBS/CBS, budgets and budget heads, measurement books, RA bills, variation orders, snags, labour, drawings, copilot, export, setup (phases, zones, disciplines, cost centres, work packages, clients, consultants) | Largest module. Project setup added in this phase (`project_setup.*`). |
| `material` | Materials, project stock, quotations, purchase orders, GRN, stock ledger, inventory, store locations, stock transfers, procurement | Includes the inventory ledger and stock transfer workflow |
| `equipment` | Equipment master, project stock, equipment reassignment | |
| `vendors` | Vendors, labour vendors, invoices, payment requests, audits, history | |
| `stock-requests` | Stock requests with approval | |
| `category`, `skill`, `meeting`, `dashboard` | Supporting masters, meetings, dashboard | |

Core services (`src/core/`): authentication and permission middleware, access policy (`utils/access.js`), migration runner (`utils/migrator.js`), stock ledger, commitment ledger, project cost ledger, measurement billing, variation orders, UOM policy, AI service, mail service, storage service, menu registry.

## 5. Frontend structure (`src/app/`)

| Area | Path | Notes |
| --- | --- | --- |
| Shell, auth | `auth/`, `core/`, `shared/` | Guards, interceptors, sidebar service |
| Projects | `modules/projects/` | Projects portfolio, new project wizard, project detail (large single component), services |
| Resources | `modules/resources/` | Materials, equipment inventory, contracts, quotations, vendors, invoices, site labour attendance |
| Stock transfer | `modules/stock-transfer/` | Register, detail, in-transit board, inventory page, approvals |
| Master data | `modules/master/` | Category, equipment master, material master, skill master |
| Admin | `modules/users/`, `modules/company-management/`, `modules/menu-management/`, `modules/history/` | |
| Other | `modules/tasks/`, `modules/timeline/`, `modules/calendar/`, `modules/dashboard/`, `modules/stock-approval/`, `modules/vendors/` | |

Frontend services for the project setup APIs do not exist yet (see the implementation log).

## 6. Deployment and configuration

- Environment variables (names only; values are never recorded in documentation): `NODE_ENV`, `SERVER_PORT`, `DB_TARGET_CLASS`, `DB_DIALECT`, `DB_STORAGE`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_TEST_CONFIRMED`, `DB_TEST_HOST_ALLOWLIST`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `MAIL_*`, `AI_PROVIDER`, `OLLAMA_HOST`, `OLLAMA_MODEL`, `PROJECT_ACCESS_MODE`, `PROJECT_ACCESS_BYPASS_ROLES`, `ZYNO_SQLITE_WORK_DIR`, `ZYNO_DEV_SYNC`.
- The repository `.env` file currently points `DB_HOST` at the production address. The application-level database guard refuses to start with it (see Security and the implementation log). Do not use that file as a template.
- Database target guard: `src/config/database_target_guard.js`. Required declaration: `DB_TARGET_CLASS` (`isolated_test` or `local_demo`) and `DB_DIALECT` (`sqlite` or `mysql`). No default dialect.

## 7. Known architectural limitations (verified)

1. The schema is now defined by 16 migrations plus a generated baseline (`migrations/20261001000000-canonical-core-schema-baseline.js`). Before this phase, 13 migrations covered only a subset of tables; see the database design document.
2. Business rules are implemented per module. There is no generic approval or workflow engine.
3. The frontend project detail component is very large (`project-detail.ts` ≈ 2,455 lines), which makes it difficult to test and change safely.
4. Tests use an in-memory SQLite database. MySQL/MariaDB behaviour has not been verified.
5. Production deployment and the production environment have not been inspected or verified.
