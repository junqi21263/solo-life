import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { spacing, typography } from '@/shared/design-tokens';
import { useAppColors } from '@/shared/theme';

type ListRowProps = PropsWithChildren<{
  title: string;
  detail?: string;
  onPress?: () => void;
}>;

export function ListRow({ title, detail, onPress, children }: ListRowProps) {
  const theme = useAppColors();
  const content = (
    <>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {detail ? <Text style={[styles.detail, { color: theme.textSecondary }]}>{detail}</Text> : null}
      </View>
      {children}
      {onPress ? <Text accessibilityElementsHidden style={{ color: theme.textSecondary }}>›</Text> : null}
    </>
  );

  return onPress ? (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      {content}
    </Pressable>
  ) : (
    <View style={styles.row}>{content}</View>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  copy: { flex: 1, gap: spacing.xs },
  title: { ...typography.body, fontWeight: '500' },
  detail: { ...typography.label },
  pressed: { opacity: 0.72 },
});
