import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import Field from '../components/Field';
import ScreenHeader from '../components/ScreenHeader';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { colors, radius, shadow } from '../theme';

const DELIVERY_OPTIONS = [
  { id: 'standard', title: 'Standard', note: '3 – 5 business days', price: 9.99 },
  { id: 'express', title: 'Express', note: '1 – 2 business days', price: 19.99 },
];

const PAYMENT_OPTIONS = [
  { id: 'card', title: 'Credit / debit card', note: 'Visa, Mastercard, Amex', icon: 'card-outline' },
  { id: 'cod', title: 'Cash on delivery', note: 'Pay the courier in cash', icon: 'cash-outline' },
  { id: 'wallet', title: 'XCS Wallet', note: 'Balance $420.50', icon: 'wallet-outline' },
];

export default function CheckoutScreen() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    delivery,
    setDelivery,
    coupon,
    clearCart,
    showToast,
  } = useCart();
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    card: '',
    expiry: '',
    cvv: '',
  });
  const [payment, setPayment] = useState('card');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Enter the recipient name';
    if (!/^[0-9+\s-]{7,}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number';
    if (form.address.trim().length < 6) next.address = 'Street address is required';
    if (!form.city.trim()) next.city = 'City is required';
    if (!/^[0-9]{4,6}$/.test(form.zip.trim())) next.zip = 'Enter a valid postal code';

    if (payment === 'card') {
      const digits = form.card.replace(/\s/g, '');
      if (!/^[0-9]{16}$/.test(digits)) next.card = 'Card number must be 16 digits';
      if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(form.expiry.trim())) {
        next.expiry = 'Use MM/YY';
      }
      if (!/^[0-9]{3,4}$/.test(form.cvv.trim())) next.cvv = 'Enter the CVV';
    }
    return next;
  };

  const placeOrder = () => {
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      showToast('Please fix the highlighted fields');
      return;
    }

    const orderNumber = `XCS-${Math.floor(100000 + Math.random() * 899999)}`;
    const eta = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const paymentLabel =
      payment === 'cod'
        ? 'Cash on delivery'
        : payment === 'wallet'
          ? 'XCS Wallet'
          : `Card •••• ${form.card.replace(/\s/g, '').slice(-4)}`;
    const snapshot = {
      orderId: orderNumber,
      eta,
      payment: paymentLabel,
      total: total.toFixed(2),
      itemCount: String(itemCount),
      email: form.name.split(' ')[0],
    };

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Demo hook: cards starting with 0000 always decline so the error screen is testable.
      if (payment === 'card' && form.card.replace(/\s/g, '').startsWith('0000')) {
        router.push({
          pathname: '/error',
          params: {
            code: 'CARD_DECLINED',
            title: 'Payment declined',
            message:
              'Your bank declined this card. Try a different card, or choose cash on delivery to place the order.',
          },
        });
        return;
      }
      clearCart();
      router.replace({ pathname: '/order-success', params: snapshot });
    }, 1400);
  };

  if (itemCount === 0) {
    return (
      <View style={styles.screen}>
        <ScreenHeader title="Checkout" />
        <View style={styles.empty}>
          <Ionicons name="cart-outline" size={44} color={colors.faint} />
          <Text style={styles.emptyTitle}>Nothing to check out</Text>
          <Text style={styles.emptyText}>Add a few items to your cart first.</Text>
          <AppButton
            title="Browse products"
            onPress={() => router.replace('/categories')}
            style={{ marginTop: 22, paddingHorizontal: 26 }}
            fullWidth={false}
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title="Checkout" subtitle={`${itemCount} items · secure payment`} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 160 }}
      >
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>1</Text>
            </View>
            <Text style={styles.cardTitle}>Shipping details</Text>
          </View>

          <Field
            label="Full name"
            value={form.name}
            onChangeText={(text) => update('name', text)}
            placeholder="John Doe"
            error={errors.name}
            autoCapitalize="words"
          />
          <Field
            label="Phone number"
            value={form.phone}
            onChangeText={(text) => update('phone', text)}
            placeholder="+92 300 1234567"
            keyboardType="phone-pad"
            error={errors.phone}
          />
          <Field
            label="Street address"
            value={form.address}
            onChangeText={(text) => update('address', text)}
            placeholder="House 24, Street 8, Gulberg"
            error={errors.address}
          />
          <View style={styles.row}>
            <Field
              label="City"
              value={form.city}
              onChangeText={(text) => update('city', text)}
              placeholder="Lahore"
              error={errors.city}
              style={styles.rowItem}
            />
            <Field
              label="Postal code"
              value={form.zip}
              onChangeText={(text) => update('zip', text)}
              placeholder="54000"
              keyboardType="number-pad"
              error={errors.zip}
              style={styles.rowItem}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>2</Text>
            </View>
            <Text style={styles.cardTitle}>Delivery method</Text>
          </View>

          {DELIVERY_OPTIONS.map((option) => {
            const active = delivery === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => setDelivery(option.id)}
                style={[styles.optionRow, active && styles.optionRowActive]}
              >
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active ? <View style={styles.radioDot} /> : null}
                </View>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionNote}>{option.note}</Text>
                </View>
                <Text style={styles.optionPrice}>
                  {formatPrice(option.price)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepText}>3</Text>
            </View>
            <Text style={styles.cardTitle}>Payment method</Text>
          </View>

          {PAYMENT_OPTIONS.map((option) => {
            const active = payment === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => setPayment(option.id)}
                style={[styles.optionRow, active && styles.optionRowActive]}
              >
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active ? <View style={styles.radioDot} /> : null}
                </View>
                <Ionicons name={option.icon} size={20} color={colors.inkSoft} />
                <View style={styles.optionInfo}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionNote}>{option.note}</Text>
                </View>
              </Pressable>
            );
          })}

          {payment === 'card' ? (
            <View style={styles.cardFields}>
              <Field
                label="Card number"
                value={form.card}
                onChangeText={(text) => update('card', text.replace(/[^0-9 ]/g, ''))}
                placeholder="4242 4242 4242 4242"
                keyboardType="number-pad"
                maxLength={19}
                error={errors.card}
              />
              <View style={styles.row}>
                <Field
                  label="Expiry"
                  value={form.expiry}
                  onChangeText={(text) => update('expiry', text)}
                  placeholder="MM/YY"
                  maxLength={5}
                  error={errors.expiry}
                  style={styles.rowItem}
                />
                <Field
                  label="CVV"
                  value={form.cvv}
                  onChangeText={(text) => update('cvv', text.replace(/[^0-9]/g, ''))}
                  placeholder="123"
                  keyboardType="number-pad"
                  maxLength={4}
                  error={errors.cvv}
                  style={styles.rowItem}
                />
              </View>
              <View style={styles.hint}>
                <Ionicons name="information-circle-outline" size={15} color={colors.muted} />
                <Text style={styles.hintText}>
                  Demo only — no real charge. A card starting with 0000 simulates a decline.
                </Text>
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order summary</Text>
          {items.map((line) => (
            <View key={line.key} style={styles.summaryItem}>
              <Text style={styles.summaryItemName} numberOfLines={1}>
                {line.quantity} × {line.product.name}
              </Text>
              <Text style={styles.summaryItemPrice}>
                {formatPrice(line.product.price * line.quantity)}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
          </View>
          {discount > 0 ? (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount {coupon ? `(${coupon.code})` : ''}</Text>
              <Text style={[styles.summaryValue, { color: colors.success }]}>
                -{formatPrice(discount)}
              </Text>
            </View>
          ) : null}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {shipping === 0 ? 'Free' : formatPrice(shipping)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>{formatPrice(tax)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total to pay</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View>
          <Text style={styles.bottomLabel}>Total</Text>
          <Text style={styles.bottomTotal}>{formatPrice(total)}</Text>
        </View>
        <AppButton
          title="Place order"
          icon="shield-checkmark-outline"
          loading={loading}
          onPress={placeOrder}
          style={styles.placeButton}
          fullWidth={false}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 14,
    ...shadow.card,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },
  stepText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.ink,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surfaceAlt,
    marginBottom: 10,
  },
  optionRowActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.faint,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  radioActive: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 9,
    height: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  optionInfo: {
    flex: 1,
    marginLeft: 4,
  },
  optionTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.ink,
  },
  optionNote: {
    marginTop: 2,
    fontSize: 11.5,
    color: colors.muted,
  },
  optionPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.ink,
  },
  cardFields: {
    marginTop: 4,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    padding: 10,
    marginTop: 2,
  },
  hintText: {
    flex: 1,
    marginLeft: 7,
    fontSize: 11,
    lineHeight: 16,
    color: colors.muted,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    gap: 10,
  },
  summaryItemName: {
    flex: 1,
    fontSize: 12.5,
    color: colors.inkSoft,
  },
  summaryItemPrice: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.ink,
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  summaryLabel: {
    fontSize: 12.5,
    color: colors.muted,
  },
  summaryValue: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.ink,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 14,
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
  placeButton: {
    paddingHorizontal: 28,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  emptyTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '800',
    color: colors.ink,
  },
  emptyText: {
    marginTop: 6,
    fontSize: 13,
    color: colors.muted,
  },
});
