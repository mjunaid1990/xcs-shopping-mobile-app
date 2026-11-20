import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '../../components/AppButton';
import ProductRail from '../../components/ProductRail';
import QtyStepper from '../../components/QtyStepper';
import Rating from '../../components/Rating';
import { useCart } from '../../context/CartContext';
import { formatPrice, getProduct, getRelatedProducts } from '../../data/products';
import { colors, radius, shadow } from '../../theme';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const product = getProduct(productId);
  const insets = useSafeAreaInsets();
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(product?.sizes?.[0] ?? null);
  const [color, setColor] = useState(product?.colors?.[0]?.name ?? null);

  if (!product) {
    return (
      <View style={[styles.screen, styles.notFound]}>
        <Ionicons name="cube-outline" size={44} color={colors.faint} />
        <Text style={styles.notFoundTitle}>Product not found</Text>
        <Text style={styles.notFoundText}>
          It may have sold out or the link is broken.
        </Text>
        <AppButton
          title="Back to shopping"
          onPress={() => router.replace('/')}
          style={{ marginTop: 22, paddingHorizontal: 28 }}
          fullWidth={false}
        />
      </View>
    );
  }

  const favorite = isFavorite(product.id);
  const related = getRelatedProducts(product, 6);
  const discountPercent = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 + insets.bottom }}
      >
        <View style={styles.hero}>
          <Image source={product.image} style={styles.heroImage} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(16,24,40,0.35)', 'rgba(16,24,40,0)']}
            style={styles.heroScrim}
          />
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHandle} />

          <View style={styles.brandRow}>
            <Text style={styles.brand}>{product.brand}</Text>
            <Rating value={product.rating} reviews={product.reviews} />
          </View>

          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.oldPrice ? (
              <>
                <Text style={styles.oldPrice}>{formatPrice(product.oldPrice)}</Text>
                <View style={styles.discountPill}>
                  <Text style={styles.discountText}>-{discountPercent}%</Text>
                </View>
              </>
            ) : null}
          </View>

          <View style={styles.stockRow}>
            <View style={styles.stockDot} />
            <Text style={styles.stockText}>
              {product.stock > 10
                ? 'In stock — ships today'
                : `Only ${product.stock} left in stock`}
            </Text>
          </View>

          {product.colors.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Colour <Text style={styles.sectionValue}>{color}</Text>
              </Text>
              <View style={styles.colorRow}>
                {product.colors.map((item) => {
                  const active = item.name === color;
                  return (
                    <Pressable
                      key={item.name}
                      onPress={() => setColor(item.name)}
                      style={[styles.colorSwatch, active && styles.colorSwatchActive]}
                    >
                      <View style={[styles.colorDot, { backgroundColor: item.hex }]} />
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}

          {product.sizes.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Size <Text style={styles.sectionValue}>{size}</Text>
              </Text>
              <View style={styles.sizeRow}>
                {product.sizes.map((item) => {
                  const active = item === size;
                  return (
                    <Pressable
                      key={item}
                      onPress={() => setSize(item)}
                      style={[styles.sizeChip, active && styles.sizeChipActive]}
                    >
                      <Text style={[styles.sizeText, active && styles.sizeTextActive]}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            {product.features.map((feature) => (
              <View key={feature} style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Ionicons name="checkmark" size={12} color={colors.success} />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.relatedHead}>
              <Text style={styles.sectionTitle}>You may also like</Text>
              <Pressable
                onPress={() =>
                  router.push({ pathname: '/categories', params: { category: product.category } })
                }
                hitSlop={8}
              >
                <Text style={styles.link}>See all</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <ProductRail products={related} height={300} />
      </ScrollView>

      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.circleButton, pressed && styles.pressed]}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={20} color={colors.ink} />
        </Pressable>
        <Pressable
          onPress={() => toggleFavorite(product.id)}
          style={({ pressed }) => [styles.circleButton, pressed && styles.pressed]}
          accessibilityLabel="Toggle favourite"
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={20}
            color={favorite ? colors.danger : colors.ink}
          />
        </Pressable>
      </View>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <QtyStepper quantity={quantity} onChange={setQuantity} max={10} />
        <Pressable
          onPress={() =>
            addToCart(product, quantity, {
              size,
              color,
            })
          }
          style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        >
          <LinearGradient
            colors={['#6E5BFF', '#4B36E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons name="bag-add-outline" size={19} color={colors.white} />
          <Text style={styles.addText}>Add · {formatPrice(product.price * quantity)}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  hero: {
    width: '100%',
    height: 400,
    backgroundColor: colors.surfaceAlt,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  panel: {
    marginTop: -34,
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  panelHandle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.line,
    marginBottom: 18,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.primary,
  },
  name: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.6,
    lineHeight: 31,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  price: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.ink,
  },
  oldPrice: {
    marginLeft: 10,
    fontSize: 15,
    color: colors.faint,
    textDecorationLine: 'line-through',
    fontWeight: '600',
  },
  discountPill: {
    marginLeft: 10,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.accent,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  stockDot: {
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.success,
    marginRight: 7,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
  },
  sectionValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
  },
  colorRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  colorSwatch: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: colors.surface,
  },
  colorSwatchActive: {
    borderColor: colors.primary,
  },
  colorDot: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  sizeChip: {
    minWidth: 62,
    height: 42,
    paddingHorizontal: 14,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeChipActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  sizeText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.inkSoft,
  },
  sizeTextActive: {
    color: colors.white,
  },
  description: {
    marginTop: 10,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.muted,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  featureIcon: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  featureText: {
    fontSize: 13,
    color: colors.inkSoft,
    fontWeight: '500',
  },
  relatedHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  relatedRow: {
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 12,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  circleButton: {
    marginTop: 52,
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  pressed: {
    opacity: 0.85,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  addButton: {
    flex: 1,
    height: 56,
    borderRadius: radius.md,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.primary,
  },
  addText: {
    marginLeft: 8,
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  notFound: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  notFoundTitle: {
    marginTop: 14,
    fontSize: 19,
    fontWeight: '800',
    color: colors.ink,
  },
  notFoundText: {
    marginTop: 6,
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
  },
});
