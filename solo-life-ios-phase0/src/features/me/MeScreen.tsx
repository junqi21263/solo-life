import { router } from 'expo-router';

import { Card } from '@/shared/components/Card';
import { Heading } from '@/shared/components/Heading';
import { ListRow } from '@/shared/components/ListRow';
import { Screen } from '@/shared/components/Screen';
import { t } from '@/shared/i18n';

export default function MeScreen() {
  return (
    <Screen>
      <Heading title={t('zh-Hans', 'me.title')} />
      <Card>
        <ListRow title={t('zh-Hans', 'me.pets')} detail="Momo" onPress={() => router.push('/pets/demo-pet')} />
        <ListRow title={t('zh-Hans', 'me.addPet')} onPress={() => router.push('/pets/new')} />
        <ListRow title={t('zh-Hans', 'me.language')} detail={t('zh-Hans', 'me.languageSimplified')} />
        <ListRow title={t('zh-Hans', 'me.onboarding')} detail={t('zh-Hans', 'me.onboardingDetail')} onPress={() => router.push('/onboarding')} />
      </Card>
    </Screen>
  );
}
