import { StyleSheet, Text, View } from 'react-native';

import { spacing, typography } from '@/shared/design-tokens';
import { useAppColors } from '@/shared/theme';

export function Heading({ title, subtitle }: { title: string; subtitle?: string }) {
  const theme = useAppColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  title: { ...typography.display },
  subtitle: { ...typography.body },
});
