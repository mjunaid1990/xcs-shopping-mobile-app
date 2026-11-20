import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '../../components/AppButton';
import QtyStepper from '../../components/QtyStepper';
import ScreenHeader from '../../components/ScreenHeader';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import { colors, radius, shadow } from '../../theme';

export default function CartScreen() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    coupon,
    applyCoupon,
    removeCoupon,
    setQuantity,
    removeItem,
    freeShippingRemaining,
    freeShippingThreshold,
    showToast,
  } = useCart();
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApply = () => {
    const result = applyCoupon(code);
    if (!result.ok) {
      setCouponError(result.message);
      return;
    }
    setCouponError('');
    setCode('');
    showToast(result.message, 'success');
  };

  const progress = Math.min(100, ((subtotal - discount) / freeShippingThreshold) * 100);

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="My cart"
        subtitle={`${itemCount} item${itemCount === 1 ? '' : 's'} ready to go`}
        showBack={false}
        right={
          <Pressable
            onPress={() => router.push('/categories')}
            style={({ pressed }) => [styles.headerAction, pressed && styles.pressed]}
          >
            <Ionicons name="add" size={20} color={colors.primary} />
          </Pressable>
        }
      />

      {items.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="bag-handle-outline" size={38} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Browse the catalogue and add something you love — we will keep it here for you.
          </Text>
          <AppButton
            title="Start shopping"
            icon="arrow-forward"
            onPress={() => router.push('/categories')}
            style={styles.emptyButton}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 180 }}
        >
          {freeShippingRemaining > 0 ? (
            <View style={styles.shippingCard}>
              <View style={styles.shippingRow}>
                <Ionicons name="rocket-outline" size={16} color={colors.primary} />
                <Text style={styles.shippingText}>
                  Add {formatPrice(freeShippingRemaining)} more for free shipping
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
            </View>
          ) : (
            <View style={[styles.shippingCard, styles.shippingCardDone]}>
              <View style={styles.shippingRow}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={[styles.shippingText, { color: colors.success }]}>
                  Free shipping unlocked
                </Text>
              </View>
            </View>
          )}

          {items.map((line) => (
            <View key={line.key} style={styles.itemCard}>
              <Image source={line.product.image} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <View style={styles.itemTop}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {line.product.name}
                  </Text>
                  <Pressable onPress={() => removeItem(line.key)} hitSlop={10}>
                    <Ionicons name="trash-outline" size={17} color={colors.faint} />
                  </Pressable>
                </View>
                <Text style={styles.itemVariant}>
                  {[line.color, line.size].filter(Boolean).join(' · ') || line.product.brand}
                </Text>
                <View style={styles.itemBottom}>
                  <Text style={styles.itemPrice}>{formatPrice(line.product.price)}</Text>
                  <QtyStepper
                    size="sm"
                    quantity={line.quantity}
                    onChange={(next) => setQuantity(line.key, next)}
                  />
                </View>
              </View>
            </View>
          ))}

          <View style={styles.card}>
            <View style={styles.cardTitleRow}>
              <Ionicons name="pricetag-outline" size={16} color={colors.ink} />
              <Text style={styles.cardTitle}>Promo code</Text>
            </View>
            {coupon ? (
              <View style={styles.couponApplied}>
                <View style={styles.couponPill}>
                  <Ionicons name="checkmark-circle" size={15} color={colors.success} />
                  <Text style={styles.couponCode}>{coupon.code}</Text>
                </View>
                <Text style={styles.couponLabel}>{coupon.label}</Text>
                <Pressable onPress={removeCoupon} hitSlop={8}>
                  <Text style={styles.removeLink}>Remove</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <View style={styles.couponRow}>
                  <TextInput
                    value={code}
                    onChangeText={(text) => {
                      setCode(text.toUpperCase());
                      setCouponError('');
                    }}
                    placeholder="Try SAVE10"
                    placeholderTextColor={colors.faint}
                    autoCapitalize="characters"
                    style={styles.couponInput}
                  />
                  <Pressable
                    onPress={handleApply}
                    style={({ pressed }) => [styles.applyButton, pressed && styles.pressed]}
                  >
                    <Text style={styles.applyText}>Apply</Text>
                  </Pressable>
                </View>
                {couponError ? <Text style={styles.couponError}>{couponError}</Text> : null}
              </>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Order summary</Text>
            <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
            {discount > 0 ? (
              <SummaryRow
                label="Discount"
                value={`-${formatPrice(discount)}`}
                valueStyle={{ color: colors.success }}
              />
            ) : null}
            <SummaryRow
              label="Shipping"
              value={shipping === 0 ? 'Free' : formatPrice(shipping)}
            />
            <SummaryRow label="Tax (8%)" value={formatPrice(tax)} />
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
          </View>
        </ScrollView>
      )}

      {items.length > 0 ? (
        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View>
            <Text style={styles.bottomLabel}>Total</Text>
            <Text style={styles.bottomTotal}>{formatPrice(total)}</Text>
          </View>
          <AppButton
            title="Checkout"
            icon="lock-closed-outline"
            onPress={() => router.push('/checkout')}
            style={styles.checkoutButton}
            fullWidth={false}
          />
        </View>
      ) : null}
    </View>
  );
}

function SummaryRow({ label, value, valueStyle }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, valueStyle]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '800',
    color: colors.ink,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.muted,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: 24,
    paddingHorizontal: 30,
  },
  shippingCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 14,
    ...shadow.card,
  },
  shippingCardDone: {
    backgroundColor: colors.successSoft,
  },
  shippingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingText: {
    marginLeft: 8,
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.inkSoft,
    flexShrink: 1,
  },
  progressTrack: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 12,
    marginBottom: 12,
    ...shadow.card,
  },
  itemImage: {
    width: 84,
    height: 96,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.ink,
    lineHeight: 18,
  },
  itemVariant: {
    marginTop: 4,
    fontSize: 11.5,
    color: colors.muted,
  },
  itemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.ink,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 16,
    marginTop: 6,
    marginBottom: 12,
    ...shadow.card,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
    marginLeft: 8,
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  couponInput: {
    flex: 1,
    height: 46,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 14,
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: 0.5,
  },
  applyButton: {
    height: 46,
    paddingHorizontal: 20,
    borderRadius: radius.sm,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  couponError: {
    marginTop: 8,
    fontSize: 12,
    color: colors.danger,
    fontWeight: '600',
  },
  couponApplied: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  couponPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  couponCode: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '800',
    color: colors.success,
  },
  couponLabel: {
    flex: 1,
    fontSize: 12,
    color: colors.muted,
  },
  removeLink: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.danger,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.muted,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.ink,
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.ink,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.ink,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  bottomLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.faint,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  bottomTotal: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.ink,
    marginTop: 2,
  },
  checkoutButton: {
    paddingHorizontal: 42,
  },
});
