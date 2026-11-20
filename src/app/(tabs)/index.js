import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { categories, products, searchProducts } from '../../data/products';
import { colors, gradients, radius, shadow } from '../../theme';

const PROMOS = [
  {
    id: 'mid-season',
    title: 'Mid-season sale',
    subtitle: 'Up to 40% off premium audio',
    cta: 'Shop audio',
    category: 'audio',
    gradient: gradients.primary,
    icon: 'headset',
  },
  {
    id: 'fresh-drops',
    title: 'Fresh drops',
    subtitle: 'New footwear just landed',
    cta: 'Explore now',
    category: 'footwear',
    gradient: gradients.accent,
    icon: 'footsteps',
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { itemCount } = useCart();
  const [query, setQuery] = useState('');

  const searching = query.trim().length > 0;
  const results = useMemo(() => searchProducts(query), [query]);
  const bestSellers = useMemo(
    () => products.filter((product) => product.badge === 'Best seller'),
    [],
  );

  const gridData = useMemo(
    () =>
      results.length % 2 === 0
        ? results
        : [...results, { id: '__spacer', spacer: true }],
    [results],
  );

  const header = (
    <View>
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <LinearGradient colors={gradients.primary} style={styles.avatar}>
            <Text style={styles.avatarText}>MJ</Text>
          </LinearGradient>
          <View>
            <Text style={styles.hello}>Good morning</Text>
            <Text style={styles.userName}>Junaid</Text>
          </View>
        </View>
        <Pressable
          onPress={() => router.push('/cart')}
          style={({ pressed }) => [styles.cartButton, pressed && styles.pressed]}
          accessibilityLabel="Open cart"
        >
          <Ionicons name="bag-handle-outline" size={21} color={colors.ink} />
          {itemCount > 0 ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{itemCount}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={19} color={colors.faint} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search headphones, sneakers…"
          placeholderTextColor={colors.faint}
          style={styles.searchInput}
          returnKeyType="search"
        />
        {searching ? (
          <Pressable onPress={() => setQuery('')} hitSlop={8}>
            <Ionicons name="close-circle" size={19} color={colors.faint} />
          </Pressable>
        ) : (
          <View style={styles.filterDot}>
            <Ionicons name="options-outline" size={18} color={colors.primary} />
          </View>
        )}
      </View>

      {!searching ? (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoRow}
            snapToInterval={320}
            decelerationRate="fast"
          >
            {PROMOS.map((promo) => (
              <Pressable
                key={promo.id}
                onPress={() =>
                  router.push({ pathname: '/categories', params: { category: promo.category } })
                }
                style={({ pressed }) => pressed && styles.pressed}
              >
                <LinearGradient
                  colors={promo.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.promo}
                >
                  <View style={styles.promoDecorA} />
                  <View style={styles.promoDecorB} />
                  <View style={styles.promoContent}>
                    <Text style={styles.promoTardText}>Limited time</Text>
                    <Text style={styles.promoTitle}>{promo.title}</Text>
                    <Text style={styles.promoSubtitle}>{promo.subtitle}</Text>
                    <View style={styles.promoButton}>
                      <Text style={styles.promoButtonText}>{promo.cta}</Text>
                      <Ionicons name="arrow-forward" size={14} color={colors.ink} />
                    </View>
                  </View>
                  <View style={styles.promoIcon}>
                    <Ionicons name={`${promo.icon}-outline`} size={68} color="rgba(255,255,255,0.28)" />
                  </View>
                </LinearGradient>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Pressable onPress={() => router.push('/categories')} hitSlop={8}>
              <Text style={styles.link}>See all</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() =>
                  router.push({ pathname: '/categories', params: { category: category.id } })
                }
                style={({ pressed }) => [styles.categoryItem, pressed && styles.pressed]}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.tint }]}>
                  <Ionicons
                    name={`${category.icon}-outline`}
                    size={23}
                    color={category.accent}
                  />
                </View>
                <Text style={styles.categoryLabel}>{category.name}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Popular right now</Text>
            <Pressable
              onPress={() =>
                router.push({ pathname: '/categories', params: { sort: 'rating' } })
              }
              hitSlop={8}
            >
              <Text style={styles.link}>Top rated</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredRow}
          >
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                compact
                onPress={() => router.push(`/product/${product.id}`)}
              />
            ))}
          </ScrollView>
        </>
      ) : null}

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>
          {searching ? `Results for “${query.trim()}”` : 'All products'}
        </Text>
        <Text style={styles.sectionCount}>{results.length} items</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={gridData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={{ paddingBottom: 32 + insets.bottom }}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={34} color={colors.faint} />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyText}>
              Try a different word, like “headphones” or “bag”.
            </Text>
          </View>
        }
        renderItem={({ item }) =>
          item.spacer ? (
            <View style={styles.spacer} />
          ) : (
            <ProductCard product={item} onPress={() => router.push(`/product/${item.id}`)} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 14,
  },
  hello: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: '600',
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.ink,
    marginTop: 1,
  },
  cartButton: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.bg,
  },
  cartBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 54,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    ...shadow.card,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
    color: colors.ink,
    height: '100%',
  },
  filterDot: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoRow: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 6,
  },
  promo: {
    width: 300,
    height: 158,
    borderRadius: radius.lg,
    marginRight: 12,
    overflow: 'hidden',
    padding: 20,
    justifyContent: 'center',
  },
  promoDecorA: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.09)',
    top: -60,
    right: -30,
  },
  promoDecorB: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.07)',
    bottom: -50,
    right: 40,
  },
  promoContent: {
    maxWidth: 200,
  },
  promoTardText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  promoTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 6,
    letterSpacing: -0.4,
  },
  promoSubtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 12,
    marginTop: 4,
  },
  promoButton: {
    marginTop: 14,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  promoButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.ink,
    marginRight: 6,
  },
  promoIcon: {
    position: 'absolute',
    right: 14,
    bottom: 12,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.2,
    flexShrink: 1,
  },
  sectionCount: {
    fontSize: 12,
    color: colors.faint,
    fontWeight: '600',
  },
  link: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  categoryRow: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 18,
    width: 68,
  },
  categoryIcon: {
    width: 62,
    height: 62,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    color: colors.inkSoft,
  },
  featuredRow: {
    paddingHorizontal: 20,
    paddingBottom: 6,
    gap: 12,
  },
  gridRow: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 12,
  },
  spacer: {
    flex: 1,
  },
  pressed: {
    opacity: 0.85,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 44,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '800',
    color: colors.ink,
  },
  emptyText: {
    marginTop: 6,
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 19,
  },
});
