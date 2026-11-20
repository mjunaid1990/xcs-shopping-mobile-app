import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

export default function Rating({ value, reviews, size = 13, showReviews = true }) {
  return (
    <View style={styles.row}>
      <Ionicons name="star" size={size} color={colors.star} />
      <Text style={[styles.value, { fontSize: size }]}>{value.toFixed(1)}</Text>
      {showReviews && reviews ? (
        <Text style={[styles.reviews, { fontSize: size }]}>({reviews})</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    marginLeft: 4,
    fontWeight: '700',
    color: colors.ink,
  },
  reviews: {
    marginLeft: 4,
    color: colors.faint,
    fontWeight: '500',
  },
});
