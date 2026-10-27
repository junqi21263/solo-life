import { NativeTabs } from 'expo-router/native-tabs';

import { t } from '@/shared/i18n';
import { useAppColors } from '@/shared/theme';

const locale = 'zh-Hans';

export default function TabLayout() {
  const theme = useAppColors();

  return (
    <NativeTabs tintColor={theme.sageStrong}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{t(locale, 'tab.home')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="care">
        <NativeTabs.Trigger.Label>{t(locale, 'tab.care')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'leaf', selected: 'leaf.fill' }} md="favorite" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="moments">
        <NativeTabs.Trigger.Label>{t(locale, 'tab.moments')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'camera', selected: 'camera.fill' }} md="photo_camera" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="me">
        <NativeTabs.Trigger.Label>{t(locale, 'tab.me')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }} md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
