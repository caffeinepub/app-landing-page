# Specification

## Summary
**Goal:** Replace the existing SVG icons in the Hero section and Navigation bar with the uploaded VOXA logo image.

**Planned changes:**
- Save the edited VOXA logo (transparent background) as a static asset at `frontend/public/assets/generated/voxa-logo.png`
- In `HeroSection.tsx`, replace the current sound-wave SVG icon with the `voxa-logo.png` image displayed at approximately 64×64 px next to the "VOXA" wordmark
- In the sticky Navigation bar component, replace any existing SVG brand icon with `voxa-logo.png` displayed at approximately 32×32 px next to the "VOXA" brand name

**User-visible outcome:** The VOXA logo image appears in both the Hero section and the navigation bar, replacing the previous SVG icons, and renders correctly on desktop and mobile.
