import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, radius } from '../theme';

export default function AppButton({
  title,
  onPress,
  icon,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  fullWidth = true,
}) {
  const isDisabled = disabled || loading;

  const content = (
    <View style={styles.inner}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.primary}
        />
      ) : (
        <>
          {icon ? (
            <Ionicons
              name={icon}
              size={size === 'lg' ? 20 : 18}
              color={
                variant === 'primary'
                  ? colors.white
                  : variant === 'ghost'
                    ? colors.primary
                    : colors.ink
              }
              style={styles.icon}
            />
          ) : null}
          <Text
            style={[
              styles.label,
              size === 'lg' && styles.labelLg,
              variant === 'primary' && styles.labelPrimary,
              variant === 'ghost' && styles.labelGhost,
              variant === 'danger' && styles.labelDanger,
              isDisabled && styles.labelDisabled,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </View>
  );

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        size === 'lg' && styles.baseLg,
        fullWidth && styles.fullWidth,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        variant === 'danger' && styles.danger,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      {variant === 'primary' && !isDisabled ? (
        <LinearGradient
          colors={['#6E5BFF', '#4B36E0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  baseLg: {
    height: 58,
    borderRadius: radius.lg,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
  },
  labelLg: {
    fontSize: 16,
  },
  labelPrimary: {
    color: colors.white,
  },
  labelGhost: {
    color: colors.primary,
  },
  labelDanger: {
    color: colors.danger,
  },
  labelDisabled: {
    color: colors.faint,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  ghost: {
    backgroundColor: colors.primarySoft,
  },
  danger: {
    backgroundColor: colors.dangerSoft,
  },
  disabled: {
    backgroundColor: colors.surfaceAlt,
    shadowOpacity: 0,
    elevation: 0,
  },
  pressed: {
    opacity: 0.88,
  },
});
