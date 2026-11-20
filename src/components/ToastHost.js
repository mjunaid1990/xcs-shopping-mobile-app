import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCart } from '../context/CartContext';
import { colors, radius, shadow } from '../theme';

export default function ToastHost() {
  const { toast } = useCart();
  const insets = useSafeAreaInsets();
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.spring(progress, {
      toValue: toast ? 1 : 0,
      useNativeDriver: true,
      friction: 9,
      tension: 90,
    }).start();
  }, [toast, progress]);

  if (!toast) return null;

  const success = toast.tone === 'success';

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.wrapper,
        { bottom: insets.bottom + 84 },
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={[styles.toast, success && styles.toastSuccess]}>
        <Ionicons
          name={success ? 'checkmark-circle' : 'information-circle'}
          size={18}
          color={success ? colors.white : colors.primary}
        />
        <Text style={[styles.text, success && styles.textSuccess]} numberOfLines={2}>
          {toast.message}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 50,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: radius.md,
    maxWidth: '100%',
    ...shadow.floating,
  },
  toastSuccess: {
    backgroundColor: colors.ink,
  },
  text: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '700',
    color: colors.ink,
    flexShrink: 1,
  },
  textSuccess: {
    color: colors.white,
  },
});
