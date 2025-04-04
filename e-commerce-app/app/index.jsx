import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext'
import { WishlistProvider } from './src/context/WishlistContext';
import AppNavigator from './src/navigation/AppNavigator';

const Index = () => {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <WishlistProvider>
          <AppNavigator />
        </WishlistProvider>
      </CartProvider>
    </SafeAreaProvider>
  );
};

export default Index;