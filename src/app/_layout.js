import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ToastHost from '../components/ToastHost';
import { CartProvider } from '../context/CartContext';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <CartProvider>
          <StatusBar style="dark" />
          {/* The shell keeps the app phone-sized on tablets and desktop browsers,
              so nothing spills past the viewport on wide screens. */}
          <View style={styles.viewport}>
            <View style={styles.shell}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  contentStyle: { backgroundColor: colors.bg },
                }}
              >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="product/[id]" />
                <Stack.Screen name="checkout" />
                <Stack.Screen
                  name="order-success"
                  options={{ gestureEnabled: false, animation: 'fade' }}
                />
                <Stack.Screen name="error" options={{ animation: 'fade' }} />
              </Stack>
              <ToastHost />
            </View>
          </View>
        </CartProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  viewport: {
    flex: 1,
    backgroundColor: '#E7E7F1',
    alignItems: 'center',
  },
  shell: {
    flex: 1,
    width: '100%',
    maxWidth: 560,
    backgroundColor: colors.bg,
    overflow: 'hidden',
  },
});
