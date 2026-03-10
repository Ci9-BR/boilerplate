---
description: Ultra-rigorous iterative dev workflow with story planning, infinite self-correction, security gates, and runtime log auditing.
---

1.  **Planning Phase**:
    - Define requirement as a **Hierarchy of User Stories**.
    - For each Story, define a list of **Atomic Tasks**.
    - Trigger `architect-reviewer` skill to validate SOLID compliance.

2.  **Iterative Task Execution**:
    - Focus on ONE Task at a time.
    - Implement with SOLID, clean patterns, and English JSDoc.

3.  **Local Infrastructure Readiness**:
    - // turbo
    - Run `npm run infra` to ensure containers are up.
    - Verify with `docker-compose ps` that all services are `healthy` or `running`.
    - **CRITICAL**: If infra is down, do not proceed to app startup.

4.  **Self-Correction & Linting**:
    - // turbo
    - Run `npm run lint -- --fix` to auto-correct stylistic and i18n gaps.

5.  **Rigorous Verification Gates**:
    - **A. Security**: Run `npm run audit --audit-level=high`. (ZERO high-priority vulns).
    - **B. Quality**: Run `npm run lint`. (100% Clean - Zero Warning Policy).
    - **C. Logic**: Run `npm run test:unit` (>85%) and `npm run test:integrated` (>80%).
    - **D. Stability**: Run `npm run build`.

6.  **Runtime & Log Audit**:
    - **E. App Startup**: // turbo  
      Run `npm run start` and monitor for "Nest application successfully started".
    - **F. Deep Log Audit**: // turbo  
      Use `log-navigator` on `storage/log/`. 
      **Requirement**: ZERO Warnings and ZERO Errors. 
      (Specifically audit for `PrismaClientInitializationError` P1001).

7.  **Performance Snapshot**:
    - **G. Metrics**: Record CPU/MEM and response times.

8.  **Infinite Loop Logic**:
    - **IF** any step (3-7) fails:
        - **INTERRUPT**. Fix root cause.
        - **RESTART** from Step 4 (Self-Correction).
    - **ELSE**: Proceed to next Task.

9.  **Completion**:
    Update `walkthrough.md` and notify user.