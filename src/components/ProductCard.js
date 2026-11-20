import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { colors, radius, shadow } from '../theme';

export default function ProductCard({ product, onPress, compact = false }) {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const favorite = isFavorite(product.id);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        compact && styles.cardCompact,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.imageWrap, compact && styles.imageWrapCompact]}>
        <Image source={product.image} style={styles.image} resizeMode="cover" />
        {product.badge ? (
          <View
            style={[
              styles.badge,
              product.badge === 'Sale' && styles.badgeSale,
              product.badge === 'New' && styles.badgeNew,
            ]}
          >
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}
        <Pressable
          hitSlop={8}
          onPress={() => toggleFavorite(product.id)}
          style={styles.heart}
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={16}
            color={favorite ? colors.danger : colors.inkSoft}
          />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={styles.brand} numberOfLines={1}>
          {product.brand}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.bottomRow}>
          <View style={styles.priceBlock}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.oldPrice ? (
              <Text style={styles.oldPrice}>{formatPrice(product.oldPrice)}</Text>
            ) : null}
          </View>
          <Pressable
            hitSlop={6}
            onPress={() => addToCart(product, 1, { size: product.sizes[1] || null })}
            style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
            accessibilityLabel={`Add ${product.name} to cart`}
          >
            <Ionicons name="add" size={18} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 8,
    ...shadow.card,
  },
  cardCompact: {
    width: 168,
  },
  pressed: {
    opacity: 0.9,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
  },
  imageWrapCompact: {
    aspectRatio: 0.92,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
  },
  badgeSale: {
    backgroundColor: colors.accent,
  },
  badgeNew: {
    backgroundColor: colors.success,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  heart: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 4,
  },
  brand: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.faint,
  },
  name: {
    marginTop: 3,
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.ink,
    lineHeight: 18,
    minHeight: 36,
  },
  bottomRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceBlock: {
    flex: 1,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.ink,
  },
  oldPrice: {
    fontSize: 11,
    color: colors.faint,
    textDecorationLine: 'line-through',
    marginTop: 1,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
