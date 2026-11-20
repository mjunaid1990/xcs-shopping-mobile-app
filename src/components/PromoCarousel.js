import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Carousel, Pagination } from 'react-native-reanimated-carousel';

import { colors, gradients, radius } from '../theme';

const PROMOS = [
  {
    id: 'mid-season',
    title: 'Mid-season sale',
    subtitle: 'Up to 40% off premium audio',
    cta: 'Shop audio',
    category: 'audio',
    gradient: gradients.primary,
    icon: 'headset-outline',
  },
  {
    id: 'fresh-drops',
    title: 'Fresh drops',
    subtitle: 'New footwear just landed',
    cta: 'Explore now',
    category: 'footwear',
    gradient: gradients.accent,
    icon: 'footsteps-outline',
  },
  {
    id: 'top-rated',
    title: 'Loved by 12k shoppers',
    subtitle: 'Top rated watches, 4.8★ and up',
    cta: 'See watches',
    category: 'wearables',
    gradient: gradients.mint,
    icon: 'watch-outline',
  },
];

const HEIGHT = 158;

export default function PromoCarousel() {
  const [width, setWidth] = useState(0);
  const progress = useSharedValue(0);
  const carouselRef = useRef(null);

  return (
    <View
      style={styles.wrapper}
      onLayout={(event) => setWidth(Math.round(event.nativeEvent.layout.width))}
    >
      {width > 0 ? (
        <Carousel
          ref={carouselRef}
          style={{ width, height: HEIGHT }}
          data={PROMOS}
          keyExtractor={(item) => item.id}
          loop
          autoplay
          autoplayInterval={4500}
          progress={progress}
          snapMode="page"
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({ pathname: '/categories', params: { category: item.category } })
              }
              style={({ pressed }) => [styles.slide, pressed && styles.pressed]}
            >
              <LinearGradient
                colors={item.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                <View style={styles.decorA} />
                <View style={styles.decorB} />
                <View style={styles.content}>
                  <Text style={styles.kicker}>Limited time</Text>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.subtitle} numberOfLines={1}>
                    {item.subtitle}
                  </Text>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>{item.cta}</Text>
                    <Ionicons name="arrow-forward" size={13} color={colors.ink} />
                  </View>
                </View>
                <View style={styles.iconWrap}>
                  <Ionicons name={item.icon} size={68} color="rgba(255,255,255,0.3)" />
                </View>
              </LinearGradient>
            </Pressable>
          )}
        />
      ) : null}

      <Pagination
        count={PROMOS.length}
        progress={progress}
        onPress={(index) => carouselRef.current?.scrollTo({ index, animated: true })}
        containerStyle={styles.dots}
        dotStyle={styles.dot}
        activeDotStyle={styles.dotActive}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 16,
  },
  slide: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    padding: 20,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.92,
  },
  decorA: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.09)',
    top: -60,
    right: -30,
  },
  decorB: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.07)',
    bottom: -50,
    right: 40,
  },
  content: {
    maxWidth: '72%',
  },
  kicker: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 6,
    letterSpacing: -0.4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.84)',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 14,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.ink,
    marginRight: 6,
  },
  iconWrap: {
    position: 'absolute',
    right: 12,
    bottom: 10,
  },
  dots: {
    marginTop: 12,
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.line,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.primary,
  },
});

