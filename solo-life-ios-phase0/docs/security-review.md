# Dependency security review

## 2026-10-27 update

- **Fixed in the lockfile:** `node-forge` was updated from 1.4.0 to 1.4.1 within Expo CLI's existing `^1.4.0` range. The installed 1.4.1 RSA verifier re-encodes and compares canonical DER DigestInfo. A regression test rejects a signature with an extra nested DigestAlgorithm element while accepting a valid signature: `node --test tests/node-forge-security.cjs`. The same malformed case was accepted by 1.4.0 in a temporary comparison. npm audit no longer reports node-forge for [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv).
- **Open:** [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) lists Zod versions below 4.6.6 as affected. Expo CLI 58.1.15 declares Zod `^3.25.76`; eslint-plugin-react-hooks and zod-validation-error also resolve 3.25.76. Expo CLI uses Zod to validate development-tool plugin descriptors and results, including arrays. An oversized malicious input can cause memory exhaustion under the advisory's conditions. The precise reachability and exploitability of each CLI path is not established.
- npm audit reports three high-severity package entries: `zod`, plus its dependency ancestors `@expo/cli` and `expo`; this is one remaining advisory, not three distinct vulnerabilities. A Zod 4 override is outside Expo CLI's declared range, and no compatible Zod 3 patched release was found. Do not mark this finding fixed; reassess upstream and test compatibility before upgrading. Do not use `npm audit fix --force`.
- Both affected dependency paths are development/build tooling paths, even though npm classifies Expo CLI as a production dependency of `expo`. A prior production-mode iOS JavaScript source map did not list these modules. That check does not prove a native distribution archive or its build process is free of risk. Keep Metro on loopback, use trusted local projects and plugins, and reassess advisories and the actual release archive before distribution.

## Verification

The RSA regression test, TypeScript, ESLint, Expo Doctor (20/20), iOS JavaScript export, and a fresh loopback-only Metro startup and status request passed after the update. No native iOS rebuild, simulator acceptance, real-device test, cloud deployment, or production release was performed for this change.
