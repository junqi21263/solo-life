# Phase 0 dependency security review

2026-10-27: `npm audit` reported five high-severity affected package entries: `node-forge`, `zod`, `@expo/code-signing-certificates`, `@expo/cli`, and `expo`. The last three are upstream dependency paths, not three additional advisories.

- `expo@58.0.19` → `@expo/cli@58.1.15` → `node-forge@1.4.0`, also via `@expo/code-signing-certificates@0.0.7`. [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv) affects versions through 1.4.0 and lists no patched version. npm reports 1.4.0 as latest; no patch is available at this check.
- `expo@58.0.19` → `@expo/cli@58.1.15` → `zod@3.25.76`. [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) lists versions below 4.6.6 as affected; CLI requires `^3.25.76`, so a v4 override is outside its declared compatibility range. No compatible fixed 3.x version was found.

Both dependencies occur via the development CLI, although npm counts them in production dependencies because `expo` depends on the CLI. A production-mode iOS Metro export with source map contained zero source paths for `node-forge`, `zod`, and `@expo/cli`; this does not inspect the final native release archive or prove every build-time usage safe. Do not treat these findings as resolved. Avoid untrusted build inputs; reassess Expo SDK 58 patch releases and upstream advisories before release. Do not force an incompatible downgrade or major override.
