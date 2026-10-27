import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { Card } from '@/shared/components/Card';
import { Heading } from '@/shared/components/Heading';
import { ListRow } from '@/shared/components/ListRow';
import { Screen } from '@/shared/components/Screen';
import { typography } from '@/shared/design-tokens';
import { t } from '@/shared/i18n';
import { useAppColors } from '@/shared/theme';

export default function CareScreen() {
  const theme = useAppColors();

  return (
    <Screen>
      <Heading title={t('zh-Hans', 'care.title')} subtitle={t('zh-Hans', 'care.subtitle')} />
      <Card>
        <Text style={[styles.title, { color: theme.text }]}>{t('zh-Hans', 'care.homeTasks')}</Text>
        <ListRow title={t('zh-Hans', 'care.changeSheets')} detail={t('zh-Hans', 'care.changeSheetsDetail')} onPress={() => router.push('/tasks/demo-task')} />
        <ListRow title={t('zh-Hans', 'care.restock')} detail={t('zh-Hans', 'care.restockDetail')} onPress={() => router.push('/tasks/demo-task')} />
      </Card>
      <Card>
        <Text style={[styles.title, { color: theme.text }]}>{t('zh-Hans', 'care.petCare')}</Text>
        <ListRow title={t('zh-Hans', 'care.addWater')} detail={t('zh-Hans', 'care.addWaterDetail')} onPress={() => router.push('/tasks/demo-task')} />
        <ListRow title={t('zh-Hans', 'care.petProfile')} detail={t('zh-Hans', 'care.petProfileDetail')} onPress={() => router.push('/pets/demo-pet')} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({ title: { ...typography.heading } });
