import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../theme';

export default function QtyStepper({ quantity, onChange, min = 1, max = 10, size = 'md' }) {
  const small = size === 'sm';
  const buttonSize = small ? 28 : 36;

  return (
    <View style={[styles.wrapper, small && styles.wrapperSm]}>
      <Pressable
        onPress={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        hitSlop={6}
        style={({ pressed }) => [
          styles.button,
          { width: buttonSize, height: buttonSize },
          quantity <= min && styles.buttonDisabled,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons
          name="remove"
          size={small ? 14 : 18}
          color={quantity <= min ? colors.faint : colors.ink}
        />
      </Pressable>
      <Text style={[styles.value, small && styles.valueSm]}>{quantity}</Text>
      <Pressable
        onPress={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        hitSlop={6}
        style={({ pressed }) => [
          styles.button,
          styles.buttonPrimary,
          { width: buttonSize, height: buttonSize },
          quantity >= max && styles.buttonDisabled,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons
          name="add"
          size={small ? 14 : 18}
          color={quantity >= max ? colors.faint : colors.white}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    padding: 4,
    alignSelf: 'flex-start',
  },
  wrapperSm: {
    padding: 3,
  },
  button: {
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.7,
  },
  value: {
    minWidth: 34,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '800',
    color: colors.ink,
  },
  valueSm: {
    minWidth: 26,
    fontSize: 13,
  },
});
