import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { colors, radius, shadow } from '../theme';

const isWeb = Platform.OS === 'web';

/**
 * Horizontal rail that is actually usable on every platform.
 * - native: normal swipe scrolling
 * - web: visible scrollbar, prev/next arrows and mouse-wheel scrolling
 */
export default function HScroll({
  children,
  contentContainerStyle,
  style,
  snapToInterval,
  arrows = true,
  decelerationRate = 'fast',
}) {
  const scrollRef = useRef(null);
  const [state, setState] = useState({ content: 0, view: 0, x: 0 });

  useEffect(() => {
    if (!isWeb) return undefined;
    const node = scrollRef.current?.getScrollableNode?.() ?? scrollRef.current;
    if (!node || typeof node.addEventListener !== 'function') return undefined;

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const max = node.scrollWidth - node.clientWidth;
      const next = Math.max(0, Math.min(node.scrollLeft + event.deltaY, max));
      if (next === node.scrollLeft) return; // let the page scroll at the ends
      node.scrollLeft = next;
      event.preventDefault();
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, []);

  const canPrev = state.x > 4;
  const canNext = state.content - state.view - state.x > 4;

  const scrollBy = (direction) => {
    const step = snapToInterval || Math.max(180, state.view * 0.8);
    const max = Math.max(0, state.content - state.view);
    const next = Math.max(0, Math.min(state.x + direction * step, max));
    scrollRef.current?.scrollTo({ x: next, animated: true });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={isWeb}
        onScroll={(event) =>
          setState((current) => ({ ...current, x: event.nativeEvent.contentOffset.x }))
        }
        scrollEventThrottle={16}
        onContentSizeChange={(width) =>
          setState((current) => ({ ...current, content: width }))
        }
        onLayout={(event) =>
          setState((current) => ({ ...current, view: event.nativeEvent.layout.width }))
        }
        snapToInterval={snapToInterval}
        decelerationRate={decelerationRate}
        contentContainerStyle={contentContainerStyle}
        style={style}
      >
        {children}
      </ScrollView>

      {arrows && isWeb ? (
        <View pointerEvents="box-none" style={styles.overlay}>
          {canPrev ? (
            <Pressable
              onPress={() => scrollBy(-1)}
              accessibilityLabel="Scroll left"
              style={({ pressed }) => [styles.arrow, styles.arrowLeft, pressed && styles.pressed]}
            >
              <Ionicons name="chevron-back" size={17} color={colors.ink} />
            </Pressable>
          ) : null}
          {canNext ? (
            <Pressable
              onPress={() => scrollBy(1)}
              accessibilityLabel="Scroll right"
              style={({ pressed }) => [styles.arrow, styles.arrowRight, pressed && styles.pressed]}
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
  arrowLeft: {
    marginRight: 'auto',
  },
  arrowRight: {
    marginLeft: 'auto',
  },
  pressed: {
    opacity: 0.8,
  },
});
