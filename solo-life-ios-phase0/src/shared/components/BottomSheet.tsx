import type { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReducedMotion } from 'react-native-reanimated';

import { radius, spacing } from '@/shared/design-tokens';
import { useAppColors } from '@/shared/theme';

type BottomSheetProps = PropsWithChildren<{ visible: boolean; onClose: () => void }>;

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const theme = useAppColors();
  const reduceMotion = useReducedMotion();

  return (
    <Modal animationType={reduceMotion ? 'none' : 'slide'} onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable accessibilityLabel="Close panel" accessibilityRole="button" onPress={onClose} style={StyleSheet.absoluteFill} />
        <SafeAreaView
          accessibilityViewIsModal
          edges={['bottom']}
          style={[styles.sheet, { backgroundColor: theme.surface }]}>
          <View style={[styles.handle, { backgroundColor: theme.border }]} />
          {children}
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000055' },
  sheet: { padding: spacing['2xl'], gap: spacing.lg, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
  handle: { alignSelf: 'center', width: 36, height: 4, borderRadius: radius.pill },
});
