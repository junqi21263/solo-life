import { router } from 'expo-router';
import { useState } from 'react';

import { Button } from '@/shared/components/Button';
import { Heading } from '@/shared/components/Heading';
import { Screen } from '@/shared/components/Screen';
import { TextField } from '@/shared/components/TextField';
import { t } from '@/shared/i18n';

export default function NewTaskRoute() {
  const [title, setTitle] = useState('');

  return (
    <Screen>
      <Button onPress={() => router.back()} variant="quiet">{t('zh-Hans', 'common.back')}</Button>
      <Heading title={t('zh-Hans', 'task.newTitle')} />
      <TextField label={t('zh-Hans', 'task.titleLabel')} placeholder={t('zh-Hans', 'task.titlePlaceholder')} value={title} onChangeText={setTitle} returnKeyType="done" />
      <Button disabled={!title.trim()} onPress={() => router.back()}>{t('zh-Hans', 'task.save')}</Button>
    </Screen>
  );
}
