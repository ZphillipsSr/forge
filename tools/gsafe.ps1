param(
  [Parameter(Position=0, Mandatory=$true)]
  [string] $TaskIntent
)

$enforcement = @'
LOCALITY_LOCK:
- Local repo on disk is the ONLY source of truth.
- NO GitHub, NO web, NO external templates, NO registries.
- If something is missing locally: STOP and report.

ANTI_LOOP:
- One scan pass only; then only targeted file opens/edits.
- No repeated rescans. No retries. Stop on ambiguity.

ROLES:
- Scanner/Mapper (read-only) -> SOURCE_OF_TRUTH_MAP
- Designer (proposal) -> MINIMAL_EDIT_PLAN
- Integrator/Writer (single writer) -> PATCH_DIFF
- Tester/Verifier -> BUILD_RUN_COMMANDS + VERIFICATION_CHECKLIST

STOP_CONDITIONS:
- If package/bundle ID changes are needed: STOP.
- If backend changes are needed: STOP.
'@

$prompt = $enforcement + "`n`n" + $TaskIntent

# If your gemini CLI uses -p instead of --prompt, swap it here.
gemini --model gemini-2.5-flash --prompt $prompt