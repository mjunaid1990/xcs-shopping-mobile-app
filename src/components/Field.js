import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radius } from '../theme';

export default function Field({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  maxLength,
  style,
  ...rest
}) {
  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.faint}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        style={[styles.input, error ? styles.inputError : null]}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.inkSoft,
    marginBottom: 7,
    letterSpacing: 0.2,
  },
  input: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.ink,
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: '#FFFBFA',
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    color: colors.danger,
    fontWeight: '600',
  },
});
