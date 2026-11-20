import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import { colors, radius } from '../theme';

export default function NotFoundScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.iconWrap}>
        <Ionicons name="compass-outline" size={44} color={colors.primary} />
      </View>
      <Text style={styles.title}>Page not found</Text>
      <Text style={styles.text}>
        That screen does not exist. Let us take you back to the shop.
      </Text>
      <AppButton
        title="Go to home"
        onPress={() => router.replace('/')}
        style={{ marginTop: 24, paddingHorizontal: 30 }}
        fullWidth={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '800',
    color: colors.ink,
  },
  text: {
    marginTop: 8,
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
