# Dependency security review

## 2026-10-27: Zod local mitigation

The upstream advisory [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) remains open in npm audit for `zod@3.25.76`, `@expo/cli`, and `expo`: npm classifies by package version and does not recognize local patches. Do not suppress the advisory or interpret the patch as an upstream release.

Two version-pinned patches are applied by `postinstall` via `patch-package --error-on-fail`:

- `zod+3.25.76.patch` backports early rejection for oversized arrays (`max` and exact `length`) and sets (`max`/`size`) in the Zod 3 CommonJS and ESM builds, for sync and async parsing. This follows the approach of the [upstream Zod 4 change](https://github.com/colinhacks/zod/pull/6652); it changes error aggregation for oversized inputs because children are no longer parsed.
- `expo++@expo+cli+58.1.15.patch` limits each of the CLI dev-tool plugin schema arrays (environments, commands, parameters, and output lines) to 1,000 entries. Inputs above that limit now fail validation. This limit is a local compatibility tradeoff; verify any unusually large plugin before relying on it.

`npm run test:security` covers oversized bounded sync/async arrays and sets, an ESM exact-length case, all four oversized Expo plugin arrays, ordinary Expo plugin data, and the node-forge regression. Clean isolated `npm ci` and `npm ci --omit=dev` both applied both patches and passed these tests. Expo Doctor (20/20), TypeScript, ESLint, iOS JavaScript export, and localhost-only Metro status also passed.

**Limits:** This is a targeted mitigation, not a complete Zod security certification. It does not modify Zod's bundled v4 entry points, unbounded Zod collections elsewhere, nested total input size, JSON decoding before validation, or other dependencies. An install with `--ignore-scripts` will not apply patches; run `npm run postinstall` and the security tests before use. Patch drift or dependency upgrades must fail or be revalidated; replace these local patches with a compatible upstream fix when available. No native iOS rebuild, simulator or device acceptance, production deployment, or release-package audit was performed for this change.

## node-forge

`node-forge` 1.4.1 is locked within Expo's declared dependency range. The regression test rejects a malformed nested DigestAlgorithm signature and accepts a valid signature; 1.4.0 accepted the malformed case in a temporary comparison. npm audit no longer reports [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv).
