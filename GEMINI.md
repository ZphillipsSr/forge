\# GEMINI — Forge Repo Guardrails (LOCKED)



\## SOURCE OF TRUTH

\- The local repo on disk is the only source of truth.

\- Do NOT use GitHub/web or external templates.



\## HARD CONSTRAINT

All changes MUST comply with `FORGE\_PHILOSOPHY.md`.



If a requested change violates Forge Philosophy, STOP and explain why.



\## FORGE MUST NEVER

\- Expose the backend/command center UI or raw admin access

\- Self-mutate (no code generation, no evolution, no hidden writes)

\- Bypass the Distro Bridge (no undocumented endpoints)

\- Invent capabilities (only show what the bridge explicitly declares)

\- Escalate privileges (no client-side trust flags)

\- Perform irreversible actions silently (must be explicit + logged)

\- Act autonomously (no scheduled/background actions)



\## WORKFLOW (ANTI-LOOP)

\- Scan-first: locate exact file + exact lines before editing.

\- Single-writer: one editing agent only.

\- Minimal changes: smallest diff that solves the objective.

\- Verify: run build/tests and report results.

\- Stop conditions: if ambiguity remains after one scan + one attempt, STOP and report options (no loops).



\## OUTPUT FORMAT

For any change request, produce:

1\) SOURCE\_OF\_TRUTH\_MAP (paths + line references)

2\) MINIMAL\_EDIT\_PLAN

3\) PATCH\_DIFF

4\) BUILD\_RUN\_COMMANDS

5\) VERIFICATION\_CHECKLIST

