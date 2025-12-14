\# Forge



Forge is a profile- and mode-driven distribution shell that connects to an external backend via a controlled bridge.



\## Philosophy \& Safety Contract



Read the canonical Forge definition and non-negotiable safety rules here:



\- `FORGE\_PHILOSOPHY.md`



\## Development Notes (Android Emulator)



\- Use `http://10.0.2.2:<port>` to reach host services from the Android emulator.

\- Forge must not embed or expose the backend UI; all access is via explicit bridge routes.

