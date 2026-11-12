# Construction ERP — Feature Register

Status: Phase 0 baseline, 2026-11-01. Source of truth for what the application does today.

## Status vocabulary (from the master implementation prompt)

NOT STARTED · IN PROGRESS · BLOCKED · IMPLEMENTED · TESTING · VERIFIED · COMPLETE

- **IMPLEMENTED**: code exists in the repository and an automated test covers it. The test has not been confirmed in the final regression run unless stated.
- **VERIFIED**: the automated tests for the feature passed in the final regression run recorded in the implementation log.
- **COMPLETE**: not used yet. No feature meets every acceptance criterion in section 14 of the prompt (frontend, end-to-end, security review, documentation).
- **PARTIAL** (used here for clarity): part of the feature exists; the rest is missing.

The scope column refers to the Construction ERP scope document, section numbers in brackets.

## 1. Administration, tenants and access

| ID | Feature | Status | Evidence | Gaps |
| --- | --- | --- | --- | --- |
| A-01 | Company (tenant) records and company profile | PARTIAL | `RBAC_COMPANY_MASTER`; `src/modules/company-management` (frontend); users controller | No legal entity, branch or business-unit model |
| A-02 | Users, roles, module permissions | IMPLEMENTED | `src/modules/rbac`, `src/modules/users`, `checkPermission` | No delegation, no approval authority matrix |
| A-03 | Branches, departments, business units [§03, §09] | NOT STARTED | No model or route | Required by scope |
| A-04 | Menu management | IMPLEMENTED | `tests/menu_management_enterprise.test.js` | |
| A-05 | Project-level access (company mode by default; team mode optional) | IMPLEMENTED | `src/core/utils/access.js`; `requireProjectAccess` | Team mode not tested |
| A-06 | Audit trail: project history | IMPLEMENTED | `PROJECT_HISTORY`, `project-history.controller.js`; project setup writes entries | Not all modules write history |
| A-07 | Audit trail: stock ledger and transfer events | IMPLEMENTED | `STOCK_LEDGER`, `STOCK_TRANSFER_EVENT` | |
| A-08 | Document numbering configuration | NOT STARTED | No model | |
| A-09 | Financial year, tax configuration, units of measure master | PARTIAL | UOM policy `src/core/utils/uom.js`; GST and TDS fields in billing | No configuration screens or master tables |
| A-10 | Authentication: sign-in, JWT 24 h, rate limit | IMPLEMENTED | `src/modules/auth`, `auth.middleware.js`, `app.js` | No lockout, no logout, no password reset review |

## 2. Project management and planning (scope §03)

| ID | Feature | Status | Evidence | Gaps |
| --- | --- | --- | --- | --- |
| P-01 | Project create, update, list, detail | IMPLEMENTED | `project.controller.js`; `tests/` (project-related) | Frontend exists in `modules/projects` |
| P-02 | Project header details: code, contract type, currency, start date, location, description, client, consultant, project manager | IMPLEMENTED (backend) | `project_setup.service.js`, `project_setup.routes.js`, migration `20261101000001`; `tests/project_setup.test.js` | No frontend screen |
| P-03 | Project phases, zones/blocks/floors, disciplines, cost centres, work packages | IMPLEMENTED (backend) | Same as P-02 | No frontend screen; no WBS link |
| P-04 | Clients and consultants (company masters) | IMPLEMENTED (backend) | `/clients`, `/consultants` routes; `tests/project_setup.test.js` | No frontend screen |
| P-05 | Project team assignment | IMPLEMENTED | `PROJECT_TEAM`, project create | |
| P-06 | Milestones and sub-milestones | IMPLEMENTED | `milestone.model.js`, timeline routes | |
| P-07 | Tasks, sub-tasks, comments, attachments | IMPLEMENTED | `task.controller.js`, `task-*.model.js` | Dependencies stored, no critical-path calculation |
| P-08 | Gantt timeline | PARTIAL | `modules/timeline`, `@worktile/gantt`, `frappe-gantt` | No baseline dates, no resource allocation |
| P-09 | Project baseline and planned vs actual progress | NOT STARTED | No model | |
| P-10 | Project calendars, resource allocation, critical path | NOT STARTED | No model | |
| P-11 | Project revisions, scope and schedule change control | NOT STARTED | No model | Budget revisions exist (P-14) |
| P-12 | Project closure | NOT STARTED | No status workflow | `status` enum has only On Track, Delayed, Completed |
| P-13 | Project documents | IMPLEMENTED | `project_document`, upload and protected download | Versioning missing |
| P-14 | WBS and CBS | IMPLEMENTED | `PROJECT_WBS`, `PROJECT_CBS`; `tests/budget_wbs.test.js` | |
| P-15 | Cost codes and cost-code mapping to BOQ | PARTIAL | `PROJECT_CBS.cost_code`; BOQ link to WBS and CBS exists | No mapping to materials or labour |
| P-16 | Daily progress reports (DPR) and work items | PARTIAL | `dpr` routes, `DAILY_PROGRESS_REPORTS`, `DPR_WORK_ITEMS` | No approval chain, no manpower or equipment detail |
| P-17 | Site snags and defects | PARTIAL | `snag.routes.js`, `SNAG_ITEMS` | No handover or DLP link |
| P-18 | Drawings register | PARTIAL | `drawing.routes.js`, `DRAWING_REGISTER` | No revision chain or approval |
| P-19 | Labour attendance | PARTIAL | `labour.routes.js`, `LABOUR_ATTENDANCE` | No payroll |
| P-20 | Project dashboards | PARTIAL | `dashboard.routes.js`, budget widgets | Not role-based; KPIs not documented |

## 3. Estimation, BOQ and budgets (scope §03, §06; prompt module 4)

| ID | Feature | Status | Evidence | Gaps |
| --- | --- | --- | --- | --- |
| B-01 | BOQ items for a project | PARTIAL | `boq.routes.js` (7 endpoints), `BOQ_ITEMS` | No rate analysis, no tender BOQ, no approved-BOQ version history |
| B-02 | Budget header, lines, revisions, approval and lock | IMPLEMENTED | `budget.routes.js` (16), `PROJECT_BUDGET*`; `tests/budget_heads.test.js`, `tests/budget_reconciliation_fix.test.js` | Contingency and overhead model not defined |
| B-03 | Budget heads and allocations | IMPLEMENTED | `PROJECT_BUDGET_HEAD`, `PROJECT_BUDGET_HEAD_ALLOCATION`; `tests/budget_heads.test.js` | |
| B-04 | Commitments ledger | IMPLEMENTED | `PROJECT_COMMITMENT_LEDGER`; `tests/commitment_reconciliation.test.js` | |
| B-05 | Project cost ledger | IMPLEMENTED | `PROJECT_COST_LEDGER`; `tests/project_cost_ledger.test.js` | Reversal present; no GL posting |
| B-06 | Budget variance, forecast, cost-to-complete | PARTIAL | Variance in budget views; no EAC or forecast model | |
| B-07 | Tender estimation and bid BOQ | NOT STARTED | No model | |

## 4. CRM, tenders and contracts (scope §04; prompt modules 2, 5)

| ID | Feature | Status | Evidence | Gaps |
| --- | --- | --- | --- | --- |
| C-01 | Leads, enquiries, opportunities, follow-ups | NOT STARTED | No model or route | |
| C-02 | Tender register, documents, submission tracking, outcomes | NOT STARTED | Only a quotation label "Tender Quotations" reuses the RFQ screen | |
| C-03 | Bid comparison and tender approvals | NOT STARTED | | |
| C-04 | Client contract records (value, dates, terms, retention, guarantees) | NOT STARTED | No client contract model | |
| C-05 | Subcontract agreements and work packages | PARTIAL | Work packages (P-03) and vendor link; no agreement model | |
| C-06 | Variation orders with items and status | IMPLEMENTED | `variation_order.routes.js` (12), `VARIATION_ORDERS`; `tests/variation_orders.test.js` | Approval stages configured per module, not by engine |
| C-07 | Change orders, claims, extension of time | NOT STARTED | Claims referenced in VO code; EOT missing | |

## 5. Procurement (scope §05; prompt module 6)

| ID | Feature | Status | Evidence | Gaps |
| --- | --- | --- | --- | --- |
| PR-01 | Purchase requisition / indent | NOT STARTED | No model; no route | Required by scope §05 |
| PR-02 | RFQ generation and quotation capture | PARTIAL | `quotation.routes.js` (14), `QUOTATION`; `generate-rfq` | No structured technical or commercial scoring |
| PR-03 | Vendor evaluation and comparison | NOT STARTED | | |
| PR-04 | Purchase orders: create, approve, cancel | PARTIAL | `procurement.routes.js`, `PURCHASE_ORDER` (approved_by, cancelled_by); `tests/procurement.test.js` | No revision or amendment history; no vendor acknowledgement |
| PR-05 | Goods receipt notes | PARTIAL | `GOODS_RECEIPT_NOTE`, status and inspection fields | Quality inspection workflow missing |
| PR-06 | Vendor invoices and payment requests with approve, reject, execute | PARTIAL | `vendors_invoice_controller.js`, `vendors_payment_request_controller.js`; `tests/cumulative_matching.test.js` | Three-way match not confirmed; credit and debit notes not found |
| PR-07 | Procurement commitments from purchase orders | IMPLEMENTED | `commitment_ledger.service.js`; `tests/commitment_reconciliation.test.js` | |

## 6. Inventory and warehouse (scope §05; prompt module 7)

| ID | Feature | Status | Evidence | Gaps |
| --- | --- | --- | --- | --- |
| I-01 | Stock ledger, append-only, with location and transfer references | IMPLEMENTED | `STOCK_LEDGER`, `stock_ledger.service.js`; `tests/inventory_ledger.test.js`, `tests/inventory_demo.test.js` | |
| I-02 | Store locations (store, in-transit and other types) | IMPLEMENTED | `STORE_LOCATION`; `tests/stock_transfer.test.js` | No rack, bin or yard levels |
| I-03 | Same-project stock transfers with approval, dispatch, receipt, shortage and write-off | IMPLEMENTED | `stock_transfer.service.js`, `STOCK_TRANSFER*`; `tests/stock_transfer*.test.js` (3 files, including Super Admin override) | Browser checks of approval queue and in-transit board pending |
| I-04 | Cross-project material reallocation | BLOCKED | HTTP 409 gate (`REALLOCATION_UNAVAILABLE`); tests in `tests/project_reallocation_gate.test.js` | Ledger-based replacement (paired reallocation_out and reallocation_in) not implemented |
| I-05 | Inventory issues and receipts | PARTIAL | `inventory.routes.js` (`/issues`, `/receipts`, `/movements`, `/balances`) | Issue against WBS, site or subcontractor not modelled |
| I-06 | Reconciliation | PARTIAL | `/inventory/reconciliation` | Physical count sheets missing |
| I-07 | Reservations, picking, returns, damaged stock | NOT STARTED | No reservation model. Shortage and write-off exist in transfers. | |
| I-08 | Reorder levels, min and max stock, ageing, slow-moving alerts | NOT STARTED | | |
| I-09 | Unit of measure policy (whole-unit materials only) | IMPLEMENTED | `src/core/utils/uom.js`; `tests/stock_transfer_location_uom.test.js` | Fractional units refused (`PRECISION_UNSUPPORTED`) |
| I-10 | Equipment project stock and reassignment | IMPLEMENTED | `equipment.routes.js` (8); `tests/project_reallocation.test.js` (equipment cases) | Maintenance, fuel and rental missing |

## 7. Construction execution, subcontractors and measurement (scope §07; prompt modules 8, 9, 12, 13)

| ID | Feature | Status | Evidence | Gaps |
| --- | --- | --- | --- | --- |
| E-01 | Measurement book: header, items, cumulative quantities | IMPLEMENTED | `measurement_book.routes.js` (8), `MEASUREMENT_BOOKS`, `MEASUREMENT_BOOK_ITEMS`; `tests/measurement_billing.test.js` | No approval chain beyond status; no photos |
| E-02 | Contractor (subcontractor) RA bills with retention, advance, deductions, GST and TDS fields | IMPLEMENTED | `contractor_ra_bill.routes.js` (4), `CONTRACTOR_RA_BILLS`; `tests/measurement_billing.test.js` | Certification workflow partial; payment link partial |
| E-03 | Client RA bills and client invoicing | NOT STARTED | Only contractor-side billing exists | Required by scope §04 and prompt module 11 |
| E-04 | Subcontractor registration, documents, insurance, performance | NOT STARTED | Vendor master exists; no compliance model | |
| E-05 | Site instructions, RFIs on site, manpower and weather in DPR | NOT STARTED | DPR lacks these fields | |
| E-06 | Equipment usage hours, operator assignment, breakdowns | NOT STARTED | | |
| E-07 | Productivity measurement | NOT STARTED | | |

## 8. Quality, safety and documentation (scope §07–§08; prompt modules 14, 15, 16, 17)

| ID | Feature | Status | Evidence | Gaps |
| --- | --- | --- | --- | --- |
| Q-01 | Inspection and test plans, checklists, inspection requests | NOT STARTED | Inspection field on GRN only | |
| Q-02 | Non-conformance reports and corrective actions | NOT STARTED | | |
| H-01 | HSE: incidents, near misses, permits, toolbox talks, PPE, training | NOT STARTED | | |
| D-01 | Document register with categories, revisions, approval status | PARTIAL | `project_document`, `drawing_register`, `documents` model | No revision chain, no approvals, no expiry alerts |
| D-02 | Protected document download with ownership checks | IMPLEMENTED | `src/core/controllers/file.controller.js`; `tests/security.test.js` (unauthenticated 401, same-company download, cross-company denial) | Not every file category is tested |
| R-01 | RFI, submittals, transmittals | NOT STARTED | Label "RFI" appears in project detail UI only | |

## 9. Workflow, notifications and reporting (scope §08, §11; prompt modules 19–21)

| ID | Feature | Status | Evidence | Gaps |
| --- | --- | --- | --- | --- |
| W-01 | Generic approval and workflow engine | NOT STARTED | Approvals exist per module: stock requests, stock transfers (SoD), payment requests, budget approval | No configurable routing, delegation or escalation |
| W-02 | Maker-checker and separation of duties | PARTIAL | Stock transfer SoD with Super Admin override (`tests/stock_transfer_override.test.js`) | Other modules not covered |
| N-01 | Email notifications | PARTIAL | `src/core/services/mail.service.js` | Delivery not verified |
| N-02 | In-app notifications, preferences, read state | NOT STARTED | | |
| RP-01 | Executive and budget dashboards | PARTIAL | `dashboard.routes.js`, widgets | Not role-based |
| RP-02 | Exports | PARTIAL | `export.routes.js` (2 endpoints) | Content and formats not verified |
| RP-03 | Role-based dashboards for 13 roles | NOT STARTED | | |

## 10. Handover, DLP and finance (scope §06, §08; prompt modules 10, 22)

| ID | Feature | Status | Evidence | Gaps |
| --- | --- | --- | --- | --- |
| F-01 | General ledger, chart of accounts, journals, trial balance | NOT STARTED | | Scope §06 notes that the GL boundary is to be confirmed |
| F-02 | Accounts receivable and receipts | NOT STARTED | | |
| F-03 | Payroll | NOT STARTED | Sidebar group "H.R & Payroll" has no payroll screen | Scope §14 lists payroll as potentially excluded |
| F-04 | Cash flow forecast | NOT STARTED | | |
| HO-01 | Handover checklist, completion certificate, as-built documents | NOT STARTED | | |
| HO-02 | Defect liability period and defect closure | NOT STARTED | | |

## 11. Integrations and AI (scope §12; prompt section 7)

| ID | Feature | Status | Evidence | Gaps |
| --- | --- | --- | --- | --- |
| IN-01 | AI copilot via Ollama HTTP API | PARTIAL | `src/core/services/ai.service.js`; `copilot.routes.js` (2 endpoints), `copilot_snag.test.js` | Delivery and model availability not verified; configuration by environment |
| IN-02 | Accounting system integration | NOT STARTED | | |
| IN-03 | Identity provider (SSO) | NOT STARTED | | |
| IN-04 | Planning tool import and export | NOT STARTED | | |
| IN-05 | Banking or payment integration | NOT STARTED | | |
| IN-06 | MySQL/MariaDB production database | NOT VERIFIED | `mysql2` dependency; production configuration | See Batch 0 status |

## 12. Summary by status (this register)

Counts are for the rows above. They describe the repositories at Phase 0, not the scope document.

- IMPLEMENTED (code and automated tests present): see rows marked IMPLEMENTED.
- PARTIAL: rows marked PARTIAL.
- NOT STARTED: rows marked NOT STARTED.
- BLOCKED: I-04.
- VERIFIED in the final regression run: pending (see the implementation log).
- COMPLETE: none.

## 13. Next prioritised slice (for approval; not started)

1. Batch 0 completion: final regression, documentation, checkpoint decision (current).
2. Project setup frontend (screen for header, structure and masters) — prepared, not authorised.
3. Procurement chain: purchase requisition (PR-01), then approval routing for PR and PO, then GRN inspection. Depends on the workflow decision (W-01).
4. Inventory reservations and returns (I-07). Depends on I-05.
5. Client billing (E-03) and receivables (F-02). Depends on contract model (C-04) and measurement (E-01).
