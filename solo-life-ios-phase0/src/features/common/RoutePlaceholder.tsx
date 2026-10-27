import { router } from 'expo-router';
import { Text } from 'react-native';

import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { Heading } from '@/shared/components/Heading';
import { Screen } from '@/shared/components/Screen';
import { t } from '@/shared/i18n';
import { useAppColors } from '@/shared/theme';
import { typography } from '@/shared/design-tokens';

export function RoutePlaceholder({ title }: { title: string }) {
  const theme = useAppColors();

  return (
    <Screen>
      <Heading title={title} />
      <Card>
        <Text style={{ ...typography.body, color: theme.textSecondary }}>{t('zh-Hans', 'common.comingSoon')}</Text>
      </Card>
      <Button onPress={() => router.back()} variant="secondary">{t('zh-Hans', 'common.back')}</Button>
    </Screen>
  );
}
