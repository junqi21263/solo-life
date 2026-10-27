import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { radius, spacing } from '@/shared/design-tokens';
import { useAppColors } from '@/shared/theme';

export function Card({ children }: PropsWithChildren) {
  const theme = useAppColors();
  return <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { gap: spacing.md, padding: spacing.xl, borderWidth: StyleSheet.hairlineWidth, borderRadius: radius.lg },
});
