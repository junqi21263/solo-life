import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, useColorScheme } from 'react-native';

import { radius, spacing, typography } from '@/shared/design-tokens';
import { useAppColors } from '@/shared/theme';

type ButtonProps = PropsWithChildren<{
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'quiet';
}>;

export function Button({ children, onPress, disabled = false, variant = 'primary' }: ButtonProps) {
  const theme = useAppColors();
  const colorScheme = useColorScheme();
  const isPrimary = variant === 'primary';
  const backgroundColor = isPrimary ? theme.sageStrong : variant === 'secondary' ? theme.sageSoft : 'transparent';
  const labelColor = isPrimary ? (colorScheme === 'dark' ? '#20231F' : '#FFFFFF') : theme.sageStrong;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: disabled ? theme.surfaceMuted : backgroundColor },
        pressed && !disabled && styles.pressed,
      ]}>
      <Text style={[styles.label, { color: disabled ? theme.disabled : labelColor }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 52, justifyContent: 'center', alignItems: 'center', paddingHorizontal: spacing.xl, borderRadius: radius.pill },
  label: { ...typography.label, fontWeight: '600' },
  pressed: { opacity: 0.82 },
});
