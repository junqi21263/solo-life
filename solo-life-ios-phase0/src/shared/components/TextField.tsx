import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';

import { radius, spacing, typography } from '@/shared/design-tokens';
import { useAppColors } from '@/shared/theme';

type TextFieldProps = TextInputProps & { label: string; error?: string };

export function TextField({ label, error, style, ...props }: TextFieldProps) {
  const theme = useAppColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        style={[styles.input, { backgroundColor: theme.surface, borderColor: error ? theme.danger : theme.border, color: theme.text }, style]}
        placeholderTextColor={theme.textSecondary}
        {...props}
      />
      {error ? <Text accessibilityRole="alert" style={[styles.error, { color: theme.danger }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  label: { ...typography.label, fontWeight: '600' },
  input: { minHeight: 52, borderWidth: 1, borderRadius: radius.md, paddingHorizontal: spacing.lg, ...typography.body },
  error: { ...typography.label },
});
