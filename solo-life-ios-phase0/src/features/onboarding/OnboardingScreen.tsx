import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/shared/components/Button';
import { Heading } from '@/shared/components/Heading';
import { Screen } from '@/shared/components/Screen';
import { spacing, typography } from '@/shared/design-tokens';
import { t } from '@/shared/i18n';
import { useAppColors } from '@/shared/theme';

export default function OnboardingScreen() {
  const theme = useAppColors();
  const continueToHome = () => router.replace('/(tabs)');

  return (
    <Screen edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.content}>
        <Text accessibilityLabel="Solo Life" style={[styles.mark, { color: theme.sageStrong }]}>solo life</Text>
        <Heading title={t('zh-Hans', 'onboarding.title')} subtitle={t('zh-Hans', 'onboarding.body')} />
        <View style={styles.choice}>
          <Text style={[styles.question, { color: theme.text }]}>{t('zh-Hans', 'onboarding.petQuestion')}</Text>
          <Button onPress={continueToHome}>{t('zh-Hans', 'onboarding.petYes')}</Button>
          <Button onPress={continueToHome} variant="secondary">{t('zh-Hans', 'onboarding.petNo')}</Button>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', gap: spacing['4xl'] },
  mark: { ...typography.label, letterSpacing: 1.2, textTransform: 'uppercase' },
  choice: { gap: spacing.md },
  question: { ...typography.heading, marginBottom: spacing.sm },
});
