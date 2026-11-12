# Demo deployment checklist (SQLite, 12-project copy)

Status: local demo only. Not a production deployment. Production migrations, MariaDB 10.6 verification and the final QA batch are not approved or complete (see the implementation plan).

## Blockers to clear before the client sees it

- [ ] **AI chat:** the Ollama Cloud key returns HTTP 402 (no credit or plan lapsed). Fix the account billing, or supply a working key through the environment. The chat cannot answer until this is done.
- [ ] **Model routing:** `.env` currently sets `AI_PROVIDER` and `NEON_AI_GATEWAY_URL`, which route the copilot to the Neon AI gateway. For the demo, start the backend with `AI_PROVIDER=ollama NEON_AI_GATEWAY_URL=` set in the environment. Do not edit `.env` for this.
- [ ] **Credentials:** rotate the Ollama key after the demo. Rotate any Supabase or Neon password that has been pasted into chat or left in files.

## Database

- [ ] Database file: `E:\Port\Construction\_sqlite_work\tests\demo-india-full.disposable.sqlite` (12 projects).
- [ ] Do not use `demo-india.disposable.sqlite`. Another session rebuilds it and it has 3 projects.
- [ ] Take a copy of the full file before the demo, outside the working tree.
- [ ] Check that the backend log shows `file=demo-india-full.disposable.sqlite` and `migrations pending=0`.

## Start the backend

Set your own key in the environment first. Do not paste it into a file.

```bash
cd "/e/Port/Construction/zyno_construction_backend/zyno_construction_backend" && OLLAMA_API_KEY=<your-key> AI_PROVIDER=ollama NEON_AI_GATEWAY_URL= NEON_AI_GATEWAY_API_KEY= DB_HOST= DB_TARGET_CLASS=isolated_test DB_DIALECT=sqlite DB_STORAGE='E:/Port/Construction/_sqlite_work/tests/demo-india-full.disposable.sqlite' SERVER_PORT=3000 AGENTS_AUTORUN_MINUTES=30 node server.js
```

## Smoke test (after start)

- [ ] `GET http://127.0.0.1:3000/` returns 401 (the server is up and guarded).
- [ ] Sign in as the demo planner account from the seed script. The password lives in the seed script, not here.
- [ ] Copilot on the dashboard: "How many projects are on the register?" returns 12 projects.
- [ ] Copilot inside project 1: superstructure progress and open snags answer from records.
- [ ] Dashboard shows TOTAL PROJECTS 12.
- [ ] Agents status endpoint responds for the company.

## Frontend

- [ ] Run the Angular dev server or the built bundle against `http://localhost:3000`.
- [ ] Check the copilot streams an answer (not "did not answer").

## Known gaps to state to the client

- Screens for the Phase A/B controls, agents and India compliance are not built in the frontend.
- Approval engine, procurement revisions, inventory reservations, client billing, quality/HSE and finance core are not built.
- Frontend tests are stubs. Full backend suite: 41/41 suites, 459/459 tests, on in-memory SQLite.

## Sign-off

- [ ] Owner has approved the demo as a local demonstration.
- [ ] Owner has approved any hosted or client-facing deployment separately. This checklist does not approve one.
