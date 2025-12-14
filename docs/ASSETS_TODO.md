# Asset Requirements: Forge Cinematic Intro

To complete the photoreal introductory experience, please provide the following assets in `public/intro/`.

## 1. Video Asset
**Path:** `public/intro/forge-hammer.mp4`

*   **Duration:** 6.0 seconds (±0.2s)
*   **Resolution:** 1920x1080 (preferred) or 1280x720 minimum
*   **FPS:** 30 (preferred) or 60
*   **Encoding:** H.264 (Baseline/Main profile)
*   **Bitrate Target:** 6–12 Mbps
*   **Content:**
    *   0.0s – 4.5s: Close-up of a Forge object (anvil or red-hot metal) with subtle ambient motion, heat distortion, or glow.
    *   4.5s – 5.5s: A gloved hand enters frame and strikes the metal with a hammer.
    *   5.5s – 6.0s: The impact causes sparks and a bright bloom/lens flare. The screen should transition to pure white by the end (6.0s) to match the code's flash transition.

## 2. Poster Image
**Path:** `public/intro/forge-hammer-poster.png`

*   **Resolution:** Matches video (1920x1080)
*   **Content:** A high-quality still frame from the beginning (0.0s) of the video. This serves as a fallback and loading placeholder.

## Notes
*   If the video fails to load or play (e.g., restricted codecs on some Android devices), the system will fallback to showing the poster and a "Enter Forge" button after a timeout.
*   The "flash" transition is handled in code (`src/pages/BootSplash.tsx`) via a white overlay, so the video ending in white is stylistic but not strictly functional—the code will overlay white regardless.
