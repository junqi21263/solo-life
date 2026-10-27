import { router } from 'expo-router';

import { Button } from '@/shared/components/Button';
import { Heading } from '@/shared/components/Heading';
import { Screen } from '@/shared/components/Screen';
import { StateView } from '@/shared/components/StateView';
import { t } from '@/shared/i18n';

export default function MomentsScreen() {
  return (
    <Screen>
      <Heading title={t('zh-Hans', 'moments.title')} />
      <StateView kind="empty" message={t('zh-Hans', 'moments.empty')} />
      <Button onPress={() => router.push('/moments/new')}>{t('zh-Hans', 'moments.add')}</Button>
    </Screen>
  );
}
