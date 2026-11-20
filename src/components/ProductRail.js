import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Carousel } from 'react-native-reanimated-carousel';

import { colors, radius, shadow } from '../theme';
import ProductCard from './ProductCard';

const ITEM_SIZE = 188;
const ITEM_HEIGHT = 292;
const isWeb = Platform.OS === 'web';

/**
 * Slider for product rows. Uses the Reanimated carousel so it pages on touch
 * and trackpad, with arrow controls on web where dragging is less obvious.
 */
export default function ProductRail({ products, height = ITEM_HEIGHT }) {
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);

  const go = (direction) => {
    if (direction < 0) {
      carouselRef.current?.prev({ count: 1, animated: true });
    } else {
      carouselRef.current?.next({ count: 1, animated: true });
    }
  };

  return (
    <View
      style={styles.wrapper}
      onLayout={(event) => setWidth(Math.round(event.nativeEvent.layout.width))}
    >
      {width > 0 ? (
        <Carousel
          ref={carouselRef}
          style={{ width, height }}
          data={products}
          keyExtractor={(item) => item.id}
          itemSize={ITEM_SIZE}
          snapMode="nearest"
          overscrollEnabled={false}
          onSnapToItem={setIndex}
          onConfigurePanGesture={
            isWeb
              ? (gesture) => {
                  gesture.config.touchAction = 'pan-y';
                }
              : undefined
          }
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <ProductCard
                product={item}
                compact
                onPress={() => router.push(`/product/${item.id}`)}
              />
            </View>
          )}
        />
      ) : null}

      {isWeb && width > 0 ? (
        <View pointerEvents="box-none" style={styles.overlay}>
          {index > 0 ? (
            <Pressable
              onPress={() => go(-1)}
              accessibilityLabel="Previous products"
              style={({ pressed }) => [styles.arrow, pressed && styles.pressed]}
            >
              <Ionicons name="chevron-back" size={17} color={colors.ink} />
            </Pressable>
          ) : null}
          {index < products.length - 1 ? (
            <Pressable
              onPress={() => go(1)}
              accessibilityLabel="Next products"
              style={({ pressed }) => [styles.arrow, pressed && styles.pressed]}
            >
              <Ionicons name="chevron-forward" size={17} color={colors.ink} />
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  slide: {
    width: ITEM_SIZE,
    paddingLeft: 20,
    justifyContent: 'flex-start',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  arrow: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  pressed: {
    opacity: 0.8,
  },
});
