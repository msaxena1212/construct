# Construction ERP: action items from the Farvision benchmark

Date: 2026-11-09. Scope: the construction pages of farvisionerp.com (Farvision ERP by Gamut Infosystems), compared with the ZYNO Construction ERP as it stands in the repository and in `ERP_ENTERPRISE_COMPLETION_PLAN.md`.

## Caveats before using this list

- The Farvision figures (900+ customers, ₹2.4L Cr project value, 14.6% margin, 47 machines, 94% auto-cleared invoices, 14 minutes per bill) are the vendor's own claims or illustrative screen samples. Treat them as marketing, not evidence.
- Third-party reviews are thin: Capterra shows 3.3 out of 5 from four reviews, and one 2022 review calls the product perpetually in beta (SelectHub, SaaSworthy and Capterra listings, found by search).
- The site mixes India (GST, TDS 194C, CLRA, BOCW) and GCC (WPS, EOSB, Iqama, UAE VAT) content. Statutory rules are a separate decision (item 21).
- Each item below is a candidate for the owner to accept, reject or defer. None has been built.

## What our ERP already has (from the code and the register)

- Projects, WBS and CBS, budget heads, budget revisions and item-wise allocation, commitment ledger, project cost ledger.
- Measurement books and contractor RA bills (bills to our subcontractors and vendors), with 5% retention and TDS on each bill, and variation orders.
- Procurement: quotations, purchase orders, goods receipt with inspection notes, vendor invoices. The three-way match at payment approval checks the unit rate (5% default tolerance) and the cumulative billed quantity against accepted GRN quantity. Total-value matching was not checked before Phase A. (An earlier version of this document said quantity matching was absent; that was wrong.)
- Stock: ledger, location balances, transfers within a project, write-offs, reversals, store locations, stock requests.
- Site: daily progress reports with up to 10 photos, labour attendance, snags, drawing register, meetings, documents, tasks with comments, attachments and activities, milestones, MS Project import and export.
- Copilot chat. SPI and CPI appear only inside its text answers (`copilot.controller.js`), not as a calculated module.

## Items already on our list (not from Farvision)

- Batch 3: inventory reconciliation defect, cross-project reallocation 409 gate.
- Authentication: no lockout, no logout.
- Accounting, payroll and statutory rules: not implemented, must not be presented as compliant.

## Action items

Priority: H = high, M = medium, L = low. "Add" means a new module. "Enhance" means extend what exists. Sources are the Farvision pages named in the Source column (site paths under farvisionerp.com).

### Phase A: complete the controls we half-have

| # | Item | Type | Farvision claim (source) | Our position | Suggested first step | Pri |
|---|------|------|--------------------------|--------------|----------------------|-----|
| 1 | Purchase requisitions (indents) checked against the project budget | Add | BOQ-driven indents checked against project budget; site indents turned into requisitions that can be revised (`farvision-module-materials`, `farvision-app-stores`) | Not started (register). Commitment ledger exists to check against | PR model with budget-head check at submit, PR to PO conversion | H |
| 2 | Three-way match: PO, GRN and bill, with a preview and recorded exceptions | Enhance | Bill checked against PO and GRN; matches inside tolerance auto-cleared; GRN needs QC pass (`farvision-module-materials`) | Rate tolerance and cumulative quantity were already enforced at approval; an override needed no reason. **Phase A (done):** shared rule service, `GET /api/v1/vendors/:vendorId/invoices/:invoiceId/three-way-match` report, override requires and records a reason. Still open: total-value match, auto-clear, QC gate on GRN | H |
| 3 | Client RA billing and receivables | Add | Bills built from certified work, client engineer review, retention and advance recovery, variations priced in, receivables aged by bill (`farvision-journey-construction`, `farvision-vertical-contractors`) | Not started (register). MB and RA logic exists for subcontractor bills | Reuse the MB certification path for client bills; add receivables ageing. Needs the owner to confirm we bill clients | H |
| 4 | Retention ledger with release, and bank-guarantee register | Enhance | Retention released after defect liability period; BG exposure by bank with renewal alerts (`farvision-vertical-contractors`, `farvision-module-engineering`) | **Phase A (done):** retention released only after the DLP ends and within the subcontractor's outstanding amount; handover date and DLP length per project; bank-guarantee register with expiry flags and release or invoke. Before: retention computed and held total reported only. Not browser-tested | H |
| 5 | Budget gate at bill certification and PO approval | Enhance | Over-budget bills block or warn per policy at certification; every voucher validated against budget (`farvision-module-engineering`) | **Phase A (done) for RA bills:** approval checks the bill against the head's headroom (approved allocation less net recognized cost). Company policy `budget_gate_mode`: `warn` (default) or `block`. Not done for POs: POs carry no budget head, so the gate cannot apply there. Open PO commitments are not deducted | H |
| 6 | Central approval rules with value brackets and escalation | Enhance | Tiered PO approvals by value; approval-age alerts; stuck items escalated; phone approvals (`farvision-module-materials`, `farvision-vertical-contractors`) | Per-module approvals only (register: PARTIAL) | **Partly done:** `GET /api/v1/project-controls/:projectId/approvals/ageing` lists payment requests and RA bills waiting for approval, with age, and flags items at or over 48 hours (`escalate`). Not done: value brackets, approver rules, and any escalation routing or notification | H |

### Phase B: quality, equipment and cost analytics

| # | Item | Type | Farvision claim (source) | Our position | Suggested first step | Pri |
|---|------|------|--------------------------|--------------|----------------------|-----|
| 7 | Quality inspections and non-conformities (NC) with SLA; open NC blocks RA approval | Add | Checklists built per BOQ activity; NC raised in one tap with photo, location and severity; NC has SLA, closes only after re-inspection; open NC blocks that activity's RA bill (`farvision-app-project-qc`) | QA/QC not started. Snags exist; GRN inspection notes only | Checklist templates per BOQ activity, NC with SLA and re-inspection, RA approval gate | H |
| 8 | Equipment usage log, fuel, maintenance and breakdown history | Add | Operator hour-meter or km readings, GPS-stamped, tamper flags; fuel reconciled to hours; PM by hours or calendar; breakdown history with MTBF; true cost per hour (`farvision-vertical-contractors`) | Equipment master and stock only; no usage, fuel, maintenance or breakdown tables | Usage log and fuel log first; cost per hour posted to the project cost ledger | H |
| 9 | EVM and S-curve from milestones and budget | Add | S-curve of planned, earned and actual cost; CV, SV, CPI, SPI per project and WBS node; cost-to-complete; delay-risk signals (`farvision-module-engineering`) | SPI and CPI computed only in copilot text. Milestone progress and budget data exist | **Partly done:** `GET /api/v1/project-controls/:projectId/evm` gives project-level BAC, PV, EV, AC, CV, SV, CPI, SPI and EAC, with the method stated in the response (equal-weight dated milestones). Not done: S-curve, cost-to-complete, delay-risk signals, earned value per WBS node, dashboard display, and copilot reading this instead of computing inline | H |
| 10 | Tender BOQ and execution BOQ, linked and reconciled | Add | Client tender BOQ and internal execution BOQ linked line by line; live margin; alert when a line varies more than 5% (`farvision-vertical-contractors`) | One BOQ table (`BOQ_ITEMS`). No tender or execution split | Execution BOQ linked to tender lines; margin and variance per line with a configurable threshold | H |
| 11 | Subcontract work orders: amendment and short close | Add | Work orders issued to subcontractors with amendment and short-close; sub-BOQ; subcontract as a budget head group (`farvision-module-engineering`) | No work-order table. Subcontractor RA bills exist without a work order | Work-order model linked to BOQ lines and budget heads; RA bills reference a work order | H |
| 12 | Labour roll and productivity per labour-day | Enhance | Certified daily labour roll; subcontractor invoices generated from it; productivity per labour-day and rejection rate (`farvision-vertical-contractors`) | Attendance and skill tables exist; no certified roll or productivity measure | Certify the daily roll; generate subcontractor bill lines from it; productivity KPI | M |

### Phase C: site capture, stores, closure and reporting

| # | Item | Type | Farvision claim (source) | Our position | Suggested first step | Pri |
|---|------|------|--------------------------|--------------|----------------------|-----|
| 13 | Geotag and timestamp on DPR and QC photos | Enhance | Photos carry geotag and timestamp; required at critical checkpoints (`farvision-app-project-qc`, `farvision-app-stores`) | DPR photos store upload time only | Read GPS and capture time from the image on upload; show on the detail view | M |
| 14 | Offline capture with later sync for site apps | Add | Inspections keep working offline and sync later (`farvision-app-project-qc`); mobile store app for iOS and Android | Web app only | Progressive web app for DPR and QC after items 7 and 13 | M |
| 15 | Stock: issue returns, count sessions, reorder alerts, ageing | Enhance | Issue returns; stock count workflow; reorder levels set per item and project; stock ageing (`farvision-app-stores`, `farvision-module-materials`) | Movement types: receipt, issue, write-off, transfers, reversal, opening balance. No return, count, reorder or ageing | Issue-return movement type; reorder level per item and project with alerts; count session | M |
| 16 | Wastage check against material coefficients | Add | Flags excess steel, cement and brick use against coefficients (`farvision-vertical-contractors`) | BOQ quantities are capped during measurement; no coefficient per material | Coefficient per BOQ line; consumption variance on issues | M |
| 17 | Role-based dashboards | Enhance | Owner, CFO, project head and plant head views (`farvision-vertical-contractors`) | Basic dashboards, not role-based (register) | Owner and project-head views first, using items 9 and 10 | M |
| 18 | RFI log and drawing transmittals | Add | Drawings tracked, versioned and transmitted to contractors; RFIs raised by contractors (`farvision-module-engineering`) | Drawing register exists; RFI and submittals not started (register) | RFI log with ageing, linked to drawing revisions | M |
| 19 | Handover, defect liability and close-out | Add | Defect logs, final certificate, snag handover, retention and BG release (`farvision-journey-construction`) | Not started (register) | Handover checklist and defect-liability period, linked to item 4 retention release | M |
| 20 | Vendor and subcontractor portal | Add | Vendors view POs, submit bills, track payment, submit quotations; KYC onboarding (`farvision-module-materials-vendor-portal`) | Vendor records exist; no external access | Scoped portal after item 6 and a security review of tenant isolation | M |

### Decisions first

| # | Item | Why it waits | Pri |
|---|------|--------------|-----|
| 21 | Statutory coverage: GST and e-invoicing, TDS 194C and 26Q, CLRA and BOCW, PF, ESI, WPS, EOSB, UAE VAT | **India chosen (owner, 2026-11-09). Partly built as flags for review:** GSTIN and PAN format, TDS 194C check, GST at 18% shown per RA bill, section 269ST cash check, contract-labour threshold (`GET /api/v1/agents/:projectId/india-compliance`). Not built: e-invoicing (IRN), GST returns, TDS returns (26Q), PF, ESI and registers; GCC rules not built. Each flag needs a compliance adviser to confirm; the register still forbids presenting these as compliant | Partly done |
| 22 | AI bill scanning and matching | Depends on items 2 and 10. Our copilot already answers questions; bill extraction would be a new feature | Later |

## Not recommended for this ERP

- Real-estate buyer CRM, booking, sales hub, broker and community apps (Farvision's sales and residential verticals). Outside a construction contractor ERP.
- HRMS and property leasing (Farvision modules). Out of scope unless the owner asks.
- Ind-AS 115 percentage-of-completion accounting. Belongs with the finance module, which is not started.
- Revit, IFC and NWD model uploads (`farvision-module-engineering`). No evidence of need in our requirements. Note that the homepage lists AutoCAD integration while the engineering page does not.

## Suggested order

1. Items 2, 4, 5 and 6: finish controls we half-have.
2. Items 1, 11 and 10: procurement and subcontract chain from requisition to bill.
3. Items 7, 9 and 8: quality gate, cost analytics and equipment cost.
4. Items 3, 19, 18, 15, 12, 13, 16, 17, 20, 14: client billing, closure, drawings, stores, labour, site capture, reporting, portal, offline.
5. Items 21 and 22: after the owner decides the target market.

## Sources

- Farvision home: https://farvisionerp.com
- Contractors vertical: http://farvisionerp.com/farvision-vertical-contractors
- Engineering module: http://farvisionerp.com/farvision-module-engineering
- Materials module: http://farvisionerp.com/farvision-module-materials
- Vendor portal: http://farvisionerp.com/farvision-module-materials-vendor-portal (listed on the home page; not fetched)
- Project QC app: http://farvisionerp.com/farvision-app-project-qc
- Stores app: http://farvisionerp.com/farvision-app-stores
- Contractor journey: http://farvisionerp.com/farvision-journey-construction
- Third-party listings (search): Capterra (https://www.capterra.com/p/139632/Farvision-ERP/), SoftwareFinder (https://softwarefinder.com/enterprise-resource-planning-software/farvision), SelectHub (https://www.selecthub.com/construction-management-software/farvision/), SaaSworthy (https://www.saasworthy.com/product/farvision-erp)
