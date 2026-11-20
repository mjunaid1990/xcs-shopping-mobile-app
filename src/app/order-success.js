import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import { colors, gradients, radius, shadow } from '../theme';

export default function OrderSuccessScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [scale] = useState(() => new Animated.Value(0.7));
  const [fade] = useState(() => new Animated.Value(0));
  const [rise] = useState(() => new Animated.Value(18));

  const orderId = String(params.orderId ?? 'XCS-000000');
  const eta = String(params.eta ?? 'in 3 – 5 days');
  const payment = String(params.payment ?? 'Card');
  const total = String(params.total ?? '0.00');
  const itemCount = String(params.itemCount ?? '1');

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 420, useNativeDriver: true }),
      Animated.timing(rise, { toValue: 0, duration: 420, useNativeDriver: true }),
    ]).start();
  }, [scale, fade, rise]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 30, paddingBottom: insets.bottom + 20 }]}>
      <Animated.View style={{ opacity: fade, transform: [{ translateY: rise }] }}>
        <Animated.View style={[styles.badge, { transform: [{ scale }] }]}>
          <LinearGradient colors={gradients.mint} style={styles.badgeGradient}>
            <Ionicons name="checkmark" size={44} color={colors.white} />
          </LinearGradient>
          <View style={styles.badgeRing} />
        </Animated.View>

        <Text style={styles.title}>Order confirmed!</Text>
        <Text style={styles.subtitle}>
          Thanks for shopping with XCS. We are packing your order right now.
        </Text>
      </Animated.View>

      <Animated.View style={[styles.card, { opacity: fade, transform: [{ translateY: rise }] }]}>
        <View style={styles.orderHead}>
          <View>
            <Text style={styles.label}>Order number</Text>
            <Text style={styles.orderId}>{orderId}</Text>
          </View>
          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Processing</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <InfoRow icon="calendar-outline" label="Estimated delivery" value={eta} />
        <InfoRow icon="cube-outline" label="Items" value={`${itemCount} item${itemCount === '1' ? '' : 's'}`} />
        <InfoRow icon="wallet-outline" label="Payment" value={payment} />
        <InfoRow icon="receipt-outline" label="Total paid" value={`$${total}`} highlight />
      </Animated.View>

      <View style={styles.spacer} />

      <AppButton
        title="Continue shopping"
        icon="arrow-forward"
        size="lg"
        onPress={() => router.replace('/')}
      />
      <AppButton
        title="Back to home"
        variant="outline"
        onPress={() => router.replace('/')}
        style={styles.secondary}
      />

      <Text style={styles.support}>Need help? support@xcsshop.com</Text>
    </View>
  );
}

function InfoRow({ icon, label, value, highlight }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={16} color={colors.primary} />
      </View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, highlight && styles.infoValueHighlight]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 24,
  },
  badge: {
    alignSelf: 'center',
    width: 104,
    height: 104,
  },
  badgeGradient: {
    width: 104,
    height: 104,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.floating,
  },
  badgeRing: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: 'rgba(18,183,106,0.18)',
  },
  title: {
    marginTop: 26,
    fontSize: 26,
    fontWeight: '800',
    color: colors.ink,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 26,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 18,
    ...shadow.card,
  },
  orderHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.faint,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  orderId: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: 0.3,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successSoft,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
  },
  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  infoLabel: {
    flex: 1,
    fontSize: 12.5,
    color: colors.muted,
  },
  infoValue: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.ink,
    maxWidth: '55%',
    textAlign: 'right',
  },
  infoValueHighlight: {
    fontSize: 15,
    color: colors.primary,
  },
  spacer: {
    flex: 1,
  },
  secondary: {
    marginTop: 10,
  },
  support: {
    marginTop: 14,
    fontSize: 11.5,
    color: colors.faint,
    textAlign: 'center',
  },
});
