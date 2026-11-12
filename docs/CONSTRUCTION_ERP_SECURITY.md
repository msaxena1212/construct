# Construction ERP — Security

Status: Phase 0 baseline, 2026-11-01.

This document separates three things:
- **Verified protections**: implemented in code, and checked by a named automated test or by direct code reading noted as such.
- **Assumptions**: relied upon but not verified in this phase.
- **Findings**: weaknesses or risks that are open.

Nothing in this document is a penetration test. No external security assessment has been performed.

## 1. Authentication

| Item | Status | Evidence |
| --- | --- | --- |
| Bearer token required on all `/api/v1` routes except excluded ones | Verified (code) | `src/core/middleware/auth.middleware.js`, mounted in `src/app.js` |
| Token accepted only from the `Authorization: Bearer` header, not from the query string | Verified (code) | `auth.middleware.js` comment and check |
| Token signed with HS256 secret from `JWT_SECRET`; verification failure returns 401 | Verified (code) | `auth.middleware.js` |
| Token lifetime 24 hours (`expiresIn: 86400`) | Verified (code) | `src/modules/auth/auth.controller.js` |
| Password check with bcrypt (`bcryptjs.compareSync`) | Verified (code) | `auth.controller.js` |
| Passwords hashed with bcrypt cost factor 8 when users are created or changed | **Finding** | `src/modules/users/user.controller.js` uses `bcrypt.hashSync(password, 8)`. Cost 8 is low for current hardware. |
| Rate limit on `/api/auth`: 10 requests per 15 minutes per IP | Verified (code) | `src/app.js` `authLimiter` |
| Account lockout after repeated failures | **Not implemented** | No lockout fields or logic found in the repository |
| Logout or token revocation | **Not implemented** | No logout endpoint, token blacklist or revocation list found. A token stays valid until it expires. |
| Password reset flow | Not verified | Not inspected in this phase |
| Session management in the browser (storage, refresh) | Not verified | Frontend auth service not reviewed in this phase |

## 2. Authorization

| Item | Status | Evidence |
| --- | --- | --- |
| Module and action permissions on routes (`can_read`, `can_create`, `can_update`, `can_delete`) | Verified (code and tests) | `src/core/middleware/permission.middleware.js`; project setup tests check 403 for a read-only role (`tests/project_setup.test.js`) |
| Permission check runs before handler | Verified (code) | Route declarations, for example `src/modules/projects/project_setup.routes.js` |
| Company (tenant) scoping on queries: `where: { company_id: req.user.company_id }` | Verified (code and tests) | Project setup service and tests (`tests/project_setup.test.js`, cross-company 404 cases) |
| Project-level access: `assertProjectAccess` and `requireProjectAccess`, mode `company` by default, optional `team` mode | Verified (code); team mode not tested | `src/core/utils/access.js`, `src/core/middleware/project_access.middleware.js` |
| Super Admin override for separation of duties (inventory approvals) | Verified (tests) | `tests/stock_transfer_override.test.js` |
| Cross-tenant access returns 404 rather than 403 to avoid disclosing existence | Verified (code and tests) | `assertProjectAccess`; project setup tests |
| Role names are configurable data, not hard-coded checks, except the Super Admin normalisation | Verified (code) | `src/core/utils/access.js` `isSuperAdminUser` |

## 3. Input handling and data protection

| Item | Status | Evidence |
| --- | --- | --- |
| Parameterised queries through Sequelize | Verified (code) for models; raw SQL exists in some services | Raw `sequelize.query` calls use replacements where user data is involved (for example `stock_transfer.service.js`, migrations). Not exhaustively reviewed. |
| Input validation for project setup fields (codes, enums, currency, dates, emails) | Verified (tests) | `src/modules/projects/services/project_setup.service.js`; `tests/project_setup.test.js` |
| Mass assignment | Partly controlled | Project setup uses explicit field parsing. Older project and material controllers accept request bodies with broader field sets; not reviewed in this phase. |
| Error responses without stack traces | Verified (code) for project setup and the global error handler | `respondError` in `project_setup.controller.js`; global handler in `src/app.js` |
| Security headers (helmet, CSP) | **Not implemented** | No helmet dependency in `package.json` |
| CSRF protection | Not applicable to the Bearer-token design, but not verified for cookies | No cookie-based session found |

## 4. File storage and downloads

| Item | Status | Evidence |
| --- | --- | --- |
| Upload extension allowlist (PDF, DWG, DXF, common image types, SVG, TIFF, HEIC) | Verified (code) | `src/shared/middlewares/upload.middleware.js` |
| Upload size limit 10 MB per file | Verified (code) | `upload.middleware.js` |
| Content sniffing (checking file bytes match extension) | **Not implemented** | Extension check only |
| SVG uploads allowed | **Finding**: an SVG can contain script. It must not be served inline from the application origin. Not verified how SVG files are returned to browsers. |
| Files stored under `src/static/uploads` inside the application source tree | **Finding**: the storage location is inside the repository tree. It must be excluded from version control and backups must be reviewed. |
| Protected download route with ownership checks per file category | Verified (code); tested for projects in `tests/security.test.js` | `src/core/controllers/file.controller.js` `serveProtectedFile`: avatars match company, drawings and project documents check project access, vendor contracts check company, task attachments check project. Test cases: unauthenticated 401, same-company download, cross-company denial. |
| Path traversal protection | Verified (code) | `sanitizeFilename` in `file.controller.js` |
| Public static file serving | Not found in `src/app.js` | `app.js` serves `static/index.html` only; protected routes use `serveProtectedFile` |

## 5. Database target protection (this phase)

| Item | Status | Evidence |
| --- | --- | --- |
| Application-level guard before any connection: production host refused in any setting; explicit `DB_TARGET_CLASS` and `DB_DIALECT` required; no implicit default dialect | Verified (tests) | `src/config/database_target_guard.js`; `tests/database_target_guard.test.js` (function cases and real entry points: server, migration tool, adoption report). Focused run: passing. |
| Guard runs in `server.js` before the application is loaded | Verified (code) | `server.js` |
| Migration and schema tools refuse non-isolated targets | Verified (tests) | `scripts/migrate.js`, `scripts/schema/*`, `tests/dev_sync_guard.test.js` |
| Development synchronization refused unless opted in and the target is a disposable local SQLite file | Verified (tests) | `scripts/schema/dev-sync-guard.js`; `tests/dev_sync_guard.test.js` |
| Repository `.env` points at the production host | **Finding**. The guard refuses it; the file is still present and should be corrected by its owner. Its values are not recorded in documentation. |
| Production database has been modified in this phase | No. Verified by design: no production connection was made. |

## 6. Secrets and credentials

| Item | Status |
| --- | --- |
| Secrets are read from environment variables | Verified (code) for `JWT_SECRET`, DB credentials, `MAIL_*`, `OLLAMA_*` |
| `.env` is git-ignored | Verified (`.gitignore` contains `.env`) |
| `.env.example` and `README.md` contain placeholder values, not real secrets | Verified by inspection (values are placeholders) |
| Demo Super Admin password was shared in chat | **Finding**. Rotated on the demo database on 2026-10-31. The old value remains in the chat transcript and must not be reused. The new value is stored locally only. |
| AI service credentials | Not required by the current code path when Ollama is local. No key is stored in the repository. |
| Scripts that write to a live database | **Finding**. `scripts/execute-inventory-adjustments.js` performs stock balance adjustments through the configured database and is untracked in Git. It has not been run in this phase and is excluded from checkpoint commits. `scripts/prepare-inventory-changeset.js` is also untracked and must be reviewed before any use. |

## 7. Operational security

| Item | Status |
| --- | --- |
| Backup and restore procedure | **Not verified**. None documented in the repositories. |
| Logging of sensitive values | Not reviewed. Several controllers log errors with `console.error`. |
| Audit trail | Partial. Project history, stock transfer events and the stock ledger record actions. Other modules do not have audit trails. |
| Monitoring and alerting | Not present in the repositories. |
| Dependency vulnerability scanning | Not performed in this phase. |

## 8. Open findings (summary)

1. Low bcrypt cost factor (8).
2. No account lockout.
3. No logout or token revocation; 24-hour tokens.
4. No helmet or equivalent security headers.
5. SVG upload allowed without content checks; file storage inside the source tree.
6. Repository `.env` points at the production host.
7. Untracked scripts that write to a live database.
8. Demo password exposure in chat history (rotated).
9. Backup, monitoring and dependency scanning not in place.
10. Not verified: password reset, frontend token storage, MySQL/MariaDB behaviour of tenant queries.
