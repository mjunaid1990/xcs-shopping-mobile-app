import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCart } from '../../context/CartContext';
import { colors, radius, shadow } from '../../theme';

const ICONS = {
  index: 'home',
  categories: 'grid',
  cart: 'bag-handle',
};

const LABELS = {
  index: 'Home',
  categories: 'Browse',
  cart: 'Cart',
};

const HREFS = {
  index: '/',
  categories: '/categories',
  cart: '/cart',
};

function BottomBar({ state }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { itemCount } = useCart();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 14) }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const icon = ICONS[route.name] ?? 'ellipse';

        const onPress = () => {
          if (!focused) router.navigate(HREFS[route.name] ?? '/');
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={LABELS[route.name]}
            style={styles.item}
          >
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Ionicons
                name={focused ? icon : `${icon}-outline`}
                size={20}
                color={focused ? colors.white : colors.faint}
              />
              {route.name === 'cart' && itemCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{itemCount}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, focused && styles.labelActive]} numberOfLines={1}>
              {LABELS[route.name]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="categories" options={{ title: 'Browse' }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 10,
    paddingHorizontal: 8,
    ...Platform.select({ web: { width: '100%' }, default: {} }),
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  iconWrap: {
    width: 44,
    height: 30,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.primary,
    ...shadow.primary,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: 2,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '800',
  },
  label: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
    color: colors.faint,
    includeFontPadding: false,
  },
  labelActive: {
    color: colors.primary,
  },
});
