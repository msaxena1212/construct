# Portfolio layer

Cross-project views built only from records that already exist. Read-only: it writes nothing and adds no table, so it needs no migration. Code: `src/modules/portfolio/` (rules in `portfolio.calc.js`, queries in `portfolio.service.js`, routes in `portfolio.routes.js`). Tests: `tests/portfolio.test.js`. Frontend: `/master/portfolio` (`modules/portfolio`), entered from the dashboard banner.

Closes or advances: RP-01 (executive dashboards, partly), P-10 (critical path), F-04 (cash flow, outflow side only), E-04 (subcontractor performance, partly), IN-01 (AI briefing).

## Endpoints (all `GET`, signed in, permission `projects` / `can_read`)

| Path | Returns |
| --- | --- |
| `/api/v1/portfolio/overview` | Every project in scope with earned value, risk score, RAG and the facts behind them, plus portfolio totals |
| `/api/v1/portfolio/brief?narrative=1` | Findings across the portfolio, most urgent first. `narrative=1` adds a model-written summary; if no model answers, `narrative` is `null` and `narrative_status` is `unavailable` with the reason. Nothing is invented. |
| `/api/v1/portfolio/cash-flow?weeks=13&terms_days=30[&project_id=]` | Weekly committed cash-out, by source and by project, with the assumptions used |
| `/api/v1/portfolio/vendors` | Subcontractor and supplier scores, grades and the reasons |
| `/api/v1/portfolio/projects/:projectId/critical-path` | Critical path of a project's tasks, float per task, and the margin to the contract completion date |

Scope: the caller's company. In `PROJECT_ACCESS_MODE=team`, a user who is not in a bypass role sees only the projects they belong to (`listAccessibleProjectIds` in `src/core/utils/access.js`). A project in another company is a 404.

## Rules (also stated in `portfolio.calc.js`)

**Risk score, 0 to 100** (sum of capped drivers; each driver is returned with its points and evidence):

| Driver | Points |
| --- | --- |
| Cost: CPI below 1 | up to 30 `(1 - CPI) x 100` |
| Schedule: SPI below 1 | up to 25 `(1 - SPI) x 80` |
| Quality: open snags (critical 6, high 3, medium 1, low 0.5) | up to 15 |
| Approvals past the escalation threshold | up to 10 (4 each) |
| Guarantees: expired but active 6, expiring 3 | up to 10 |
| Reporting: days since the last daily report beyond 2 | up to 5 |
| Overdue tasks | up to 5 |
| Project marked Delayed | 8 |

RAG: red at 55 and above, amber at 30 and above, otherwise green. A completed project is capped at 20. Figures that cannot be calculated (no approved budget, no dated milestones, no daily report) add nothing and are listed in `unknown`, so a blank is never read as fine. Earned value uses `project_controls.service.js` (equal-weight dated milestones).

**Critical path**: critical path method over `PROJECT_TASK_DEPENDENCIES`. A task's duration is the span of its sub-tasks; with none it is assumed 5 days (marked `default`). FS, SS, FF and SF links with lags are used. A dependency loop is reported, not guessed at. Float is in days.

**Cash-out forecast** (committed money only; client receipts are not modelled, so this is not net cash flow):

- Approved payment request: paid 3 days after approval. Waiting for approval: 10 days after it was raised.
- Contractor RA bill with no invoice linked: approved, 15 days after approval; submitted or certified, 21 days after it was raised.
- Unpaid vendor invoice with no payment request: due `terms_days` (default 30) after the invoice date, for the unpaid balance.
- Approved purchase order not fully received: 30 days after the expected delivery date, for the value not yet received and accepted.
- Anything already past its date is shown in week 1 as overdue. Items beyond the horizon are counted in `beyond_horizon`.

**Vendor score**: start at 100; no GSTIN -15, no PAN -10, goods rejected on receipt up to -25, open snags -3 each (-6 for high or critical, cap -25), stored compliance score of 1 to 79 up to -10 (0 means not assessed), unpaid invoices above 60% up to -10. Grades A 85+, B 70+, C 55+, D below.

## Not in this layer

No client invoicing or receipts (E-03, F-02), no per-milestone value (earned value weights milestones equally), no calendars or resource levelling (P-10 remainder), no stored baselines (P-09).
