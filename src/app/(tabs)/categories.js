import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProductCard from '../../components/ProductCard';
import { categories, getProductsByCategory, sortOptions, sortProducts } from '../../data/products';
import { colors, radius, shadow } from '../../theme';

const ALL = { id: 'all', name: 'All', icon: 'apps', tint: colors.primarySoft, accent: colors.primary };

export default function CategoriesScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  // Filters live in the URL, so deep links and the home screen shortcuts stay in sync.
  const categoryId = params.category || 'all';
  const sort = params.sort || 'popular';

  const activeCategory = [...categories, ALL].find((item) => item.id === categoryId);

  const list = useMemo(() => {
    const items = sortProducts(getProductsByCategory(categoryId), sort);
    return items.length % 2 === 0 ? items : [...items, { id: '__spacer', spacer: true }];
  }, [categoryId, sort]);

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>
              {categoryId === 'all' ? 'Browse' : activeCategory?.name}
            </Text>
            <Text style={styles.subtitle}>
              {getProductsByCategory(categoryId).length} products · free returns
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/cart')}
            style={({ pressed }) => [styles.cartButton, pressed && styles.pressed]}
          >
            <Ionicons name="bag-handle-outline" size={20} color={colors.ink} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {[...categories, ALL].map((category) => {
            const active = category.id === categoryId;
            return (
              <Pressable
                key={category.id}
                onPress={() => router.setParams({ category: category.id })}
                style={({ pressed }) => [
                  styles.chip,
                  active && styles.chipActive,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons
                  name={`${category.icon}-outline`}
                  size={15}
                  color={active ? colors.white : colors.muted}
                />
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {category.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.sortRow}>
          <Text style={styles.sortLabel}>Sort</Text>
          {sortOptions.map((option) => {
            const active = option.id === sort;
            return (
              <Pressable
                key={option.id}
                onPress={() => router.setParams({ sort: option.id })}
                style={({ pressed }) => [
                  styles.sortChip,
                  active && styles.sortChipActive,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={{ paddingBottom: 32 + insets.bottom }}
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
  header: {
    paddingBottom: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.6,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12.5,
    color: colors.muted,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  chipRow: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    marginLeft: 6,
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.inkSoft,
  },
  chipTextActive: {
    color: colors.white,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
    gap: 8,
  },
  sortLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.faint,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginRight: 2,
  },
  sortChip: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceAlt,
  },
  sortChipActive: {
    backgroundColor: colors.ink,
  },
  sortChipText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.muted,
  },
  sortChipTextActive: {
    color: colors.white,
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
});
