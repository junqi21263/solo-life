import { useColorScheme } from 'react-native';

import { colors } from './design-tokens';

export function useAppColors() {
  return colors[useColorScheme() === 'dark' ? 'dark' : 'light'];
}
