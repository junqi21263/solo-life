import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { spacing, typography } from '@/shared/design-tokens';
import { useAppColors } from '@/shared/theme';
import { t, type Locale } from '@/shared/i18n';

import { Button } from './Button';

type StateViewProps = {
  kind: 'loading' | 'empty' | 'error';
  locale?: Locale;
  message?: string;
  onRetry?: () => void;
};

export function StateView({ kind, locale = 'zh-Hans', message, onRetry }: StateViewProps) {
  const theme = useAppColors();
  if (kind === 'loading') return <ActivityIndicator accessibilityLabel="Loading" color={theme.sageStrong} />;

  const title = t(locale, kind === 'empty' ? 'common.emptyTitle' : 'common.errorTitle');
  return (
    <View style={styles.container}>
      <Text accessibilityRole={kind === 'error' ? 'alert' : undefined} style={[styles.title, { color: theme.text }]}>
        {title}
      </Text>
      {message ? <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text> : null}
      {kind === 'error' && onRetry ? <Button onPress={onRetry} variant="secondary">{t(locale, 'common.retry')}</Button> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing['3xl'] },
  title: { ...typography.heading, textAlign: 'center' },
  message: { ...typography.body, textAlign: 'center' },
});
