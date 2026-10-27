# Phase 1 UI foundation

## Foundation only

This phase creates route structure and reusable layout primitives. It is not the final UI design. Token values and sample copy are provisional and must be checked against the approved Stitch screens before detailed component styling or visual acceptance.

## Provisional design direction

- Warm Ivory background (`#F7F4ED`), near-white surfaces, muted Sage Green accents, soft sand surfaces, and dark charcoal text.
- Use native system fonts and restrained editorial type sizes. Do not bundle a font before Stitch confirms the visual direction.
- Spacing uses a 4-point base; cards use generous padding and 16/24-point radii. Keep decorative motion out of the foundation.
- Light and dark palettes are included. Native text keeps React Native's default font scaling enabled.

## Code map

- `src/app/`: Expo Router route files and stack/tab layouts only.
- `src/features/<feature>/`: screen-level composition for onboarding, home, care, moments, and me.
- `src/shared/design-tokens/`: colors, spacing, radii, and type roles.
- `src/shared/components/`: reusable Button, Card, TextField, ListRow, BottomSheet, StateView, Heading, and Screen primitives.
- `src/shared/i18n/`: typed Simplified Chinese, Traditional Chinese, and English dictionaries. The preview currently selects Simplified Chinese statically; locale selection/persistence is not implemented.

## Route map

| Route | Purpose |
| --- | --- |
| `/onboarding` | First-run pet preference entry point |
| `/(tabs)` | Native tab shell |
| `/(tabs)/` | Home overview and mock today's tasks |
| `/(tabs)/care` | Home and pet care overview |
| `/(tabs)/moments` | Life timeline empty state |
| `/(tabs)/me` | Profile and settings entry points |
| `/tasks/new`, `/tasks/[taskId]` | Task creation and detail placeholders |
| `/pets/new`, `/pets/[petId]` | Pet profile placeholders |
| `/moments/new`, `/moments/[momentId]` | Moment create and detail placeholders |

## iOS behavior

- Root `SafeAreaProvider` and shared `Screen` use `react-native-safe-area-context`; the tab bar reserves its own bottom area.
- Native tabs keep the platform's adaptive placement. iPad support and all orientations are enabled; screen content is capped at 680 points on wider layouts.
- Text does not disable `allowFontScaling`, so the system Dynamic Type size remains effective.
- No decorative animation is used. The shared bottom sheet reads Reanimated's `useReducedMotion` and disables its transition when Reduce Motion is enabled.
- Buttons expose button roles and disabled state; form fields expose labels; error states use an alert role.

## Stitch handoff

1. Freeze the Stitch screens and component variants for onboarding, all four tabs, task create/detail, pet profile, and moment create/detail.
2. Record each screen's spacing, typography, colors, component states, and interaction/transition notes against these tokens.
3. Map repeated visual patterns to the shared primitives; add a new primitive only when the design repeats or needs a distinct accessibility contract.
4. Implement one route at a time, keeping route files thin and screen composition inside its feature folder.
5. Compare each iOS simulator screen against the approved Stitch frame at the matching device size, then check Dynamic Type, Reduce Motion, empty/error/disabled states, and all route transitions.

## Current limits

This is navigation and component scaffolding with a few illustrative task labels. It has no persistence, onboarding completion state, language picker, notification behavior, CloudBase access, or finished Stitch styling. The tab behavior was exercised on the available iPhone Duo simulator; iPad and other device sizes still need simulator review. The current localhost Metro process is bound to IPv4 loopback. Onboarding, tab and detail routes, and Fast Refresh were observed working against Metro.
