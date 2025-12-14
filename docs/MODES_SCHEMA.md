\# Forge Modes Schema (Draft v0.1)



\## Purpose

Forge is for everyone via subscription-gated modes/profiles. Modes control:

\- visible UI surfaces

\- callable bridge routes

\- allowed intent types

\- read vs write permissions

\- safety gates (preview vs apply)

\- logging requirements



Forge does not grant permissions by itself. It renders what the bridge allows

for the current subscription + enabled modes.



\## Model

User → Subscription → Enabled Modes → Allowed Capabilities



\## Design Rules

\- Default mode must exist and be safe (read-only)

\- All write-like actions must require explicit confirmation

\- Modes must never expose backend/command center

\- Modes must never enable self-mutation



\## Suggested baseline modes

\- Free (read-only): status, profile display, logs, package list preview

\- Creator: submit safe intents, preview, download packages

\- Operator/Pro: apply packages/upgrades (still explicit + logged)

