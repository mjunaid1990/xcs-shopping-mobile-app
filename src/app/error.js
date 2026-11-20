import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import { colors, radius, shadow } from '../theme';

export default function ErrorScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const title = String(params.title ?? 'Something went wrong');
  const message = String(
    params.message ??
      'We could not complete that request. Please check your connection and try again.',
  );
  const code = String(params.code ?? 'SOMETHING_BROKE');

  return (
    <View
      style={[styles.screen, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 }]}
    >
      <View style={styles.body}>
        <View style={styles.iconWrap}>
          <Ionicons name="alert-circle" size={46} color={colors.danger} />
        </View>

        <View style={styles.codePill}>
          <Text style={styles.codeText}>{code}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={16} color={colors.accent} />
          <Text style={styles.tipText}>
            Your cart is untouched — nothing has been charged and you can try again safely.
          </Text>
        </View>
      </View>

      <AppButton
        title="Try again"
        icon="refresh"
        size="lg"
        onPress={() => (router.canGoBack() ? router.back() : router.replace('/checkout'))}
      />
      <AppButton
        title="Back to home"
        variant="outline"
        onPress={() => router.replace('/')}
        style={styles.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 24,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 104,
    height: 104,
    borderRadius: radius.pill,
    backgroundColor: colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  codePill: {
    marginTop: 22,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  codeText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: colors.muted,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '800',
    color: colors.ink,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  message: {
    marginTop: 10,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 24,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    padding: 14,
  },
  tipText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    lineHeight: 18,
    color: '#8A3B1E',
    fontWeight: '600',
  },
  secondary: {
    marginTop: 10,
  },
});
