Forge Philosophy

Forge Philosophy



Status: Locked – Canonical Reference



Forge is the user‑facing distribution shell for a powerful, evolving backend accessed exclusively through a controlled bridge. This document defines what Forge is, what it is not, and the non‑negotiable rules that govern its design.



1\. What Forge Is



Forge is a profile‑ and mode‑driven distribution shell that provides controlled, auditable access to capabilities exposed by a backend system via the Distro Bridge.



Forge exists to:



Safely distribute power without exposing its source



Provide transparency, consent, and control to users



Act as the only interface end users ever touch



Forge is:



Read‑heavy, action‑light



Explicit, predictable, and auditable



Calm, mechanical, and honest



Forge does not reason, evolve, or decide.



Forge asks.



2\. Who Forge Is For



Forge is for everyone, via modes / profiles.



Access is tiered:



One mode is always free



Additional modes unlock as part of a subscription



Modes define visibility and capability, not raw power



Forge does not grant permissions itself; it renders what the bridge allows for the active mode.



3\. Modes \& Profiles

Core Model

User → Subscription → Enabled Modes → Allowed Capabilities



Modes determine:



Visible UI surfaces



Callable bridge routes



Allowed intent types



Read vs write permissions



Rate limits and safety gates



Example Modes (Illustrative)



Free Mode



Connection status



Active profile display



Package visibility (read‑only)



Logs / history (read‑only)



Creator Mode



Submit safe intents



Download packages



Preview changes



Pro / Operator Mode



Apply packages



Trigger upgrades



Profile selection



Advanced diagnostics



Forge never infers what is possible. It reflects declared, validated capabilities only.



4\. What Forge Must Never Do (Hard Rules)



Forge must never:



Expose the backend or command center



No raw URLs



No directory browsing



No admin UI passthrough



Self‑mutate



No code generation



No schema evolution



No KB writes



No filesystem writes



No patch application logic



Bypass the Distro Bridge



All communication flows through explicit bridge routes



No hidden or undocumented endpoints



Invent capabilities



Forge does not guess or infer



Only declared, bridged capabilities are shown



Escalate privileges



Modes cannot unlock themselves



Subscription state is externally verified



No client‑side trust flags



Perform irreversible actions silently



All write‑like actions must be explicit



Previewable



Logged



Attributable



Act autonomously



No background evolution



No scheduled actions



No self‑directed behavior



These rules are non‑negotiable. Violating any of them breaks Forge’s trust contract.



5\. Relationship to the Larger System



Forge is intentionally constrained and safe.



It sits at the edge of a three‑tier system:



Command Center



Thinks, evolves, and mutates



Dangerous by design



Internal only



Distro Bridge



Contracts and validation



Policy enforcement



Translation layer



Forge



Presentation



Consent



Distribution



Forge is the only tier users ever see.



6\. Why These Constraints Matter



Forge’s power comes from what it refuses to do.



By being constrained, Forge becomes:



Auditable



Distributable



Certifiable



Enterprise‑safe



Trustworthy to users



Forge does not compete with the backend. Forge protects it.



7\. Locked Intent



This document is a north‑star reference.



All future Forge features, UI changes, and Gemini CLI intents must comply with this philosophy.



If a proposed change violates this document, the change is rejected.



End of Forge Philosophy

