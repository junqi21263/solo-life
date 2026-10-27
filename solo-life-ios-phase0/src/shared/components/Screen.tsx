import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { spacing } from '@/shared/design-tokens';
import { useAppColors } from '@/shared/theme';

type ScreenProps = PropsWithChildren<{
  header?: ReactNode;
  edges?: Edge[];
}>;

export function Screen({ children, header, edges = ['top', 'left', 'right'] }: ScreenProps) {
  const theme = useAppColors();

  return (
    <SafeAreaView edges={edges} style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { backgroundColor: theme.background }]} keyboardShouldPersistTaps="handled">
        {header}
        <View style={styles.body}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    flexGrow: 1,
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.xl,
  },
  body: { gap: spacing.xl },
});
