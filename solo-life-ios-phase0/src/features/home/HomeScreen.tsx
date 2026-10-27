import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { Heading } from '@/shared/components/Heading';
import { ListRow } from '@/shared/components/ListRow';
import { Screen } from '@/shared/components/Screen';
import { spacing, typography } from '@/shared/design-tokens';
import { t } from '@/shared/i18n';
import { useAppColors } from '@/shared/theme';

export default function HomeScreen() {
  const theme = useAppColors();

  return (
    <Screen>
      <Heading title={t('zh-Hans', 'home.title')} subtitle={t('zh-Hans', 'home.subtitle')} />
      <Card>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('zh-Hans', 'home.tasks')}</Text>
        <ListRow title={t('zh-Hans', 'home.waterPet')} detail={t('zh-Hans', 'home.waterPetDetail')} onPress={() => router.push('/tasks/demo-task')} />
        <ListRow title={t('zh-Hans', 'home.tidyKitchen')} detail={t('zh-Hans', 'home.tidyKitchenDetail')} onPress={() => router.push('/tasks/demo-task')} />
      </Card>
      <View style={styles.actions}>
        <Button onPress={() => router.push('/tasks/new')}>{t('zh-Hans', 'home.addTask')}</Button>
        <Button onPress={() => router.push('/moments/new')} variant="secondary">{t('zh-Hans', 'home.logToday')}</Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { ...typography.heading },
  actions: { gap: spacing.md },
});
