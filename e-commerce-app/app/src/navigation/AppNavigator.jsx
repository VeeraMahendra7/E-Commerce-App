import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Import screens
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import WishlistScreen from '../screens/WishlistScreen';

// Import context
import { useCart } from '../context/CartContext';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack navigator for product screens
const ProductStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="ProductList" 
      component={ProductListScreen} 
      options={{ title: 'Products' }} 
    />
    <Stack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen} 
      options={({ route }) => ({ title: route.params?.title || 'Product Detail' })} 
    />
  </Stack.Navigator>
);

// Stack navigator for cart screens
const CartStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Shopping Cart' }} />
  </Stack.Navigator>
);

// Stack navigator for wishlist screens
const WishlistStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name="Wishlist" component={WishlistScreen} options={{ title: 'My Wishlist' }} />
  </Stack.Navigator>
);

// Main tab navigator
const AppNavigator = () => {
  const { getItemCount } = useCart();
  
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Products') {
              iconName = 'storefront';
            } else if (route.name === 'CartTab') {
              iconName = 'shopping-cart';
            } else if (route.name === 'WishlistTab') {
              iconName = 'favorite';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#f4511e',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Products" 
          component={ProductStack} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="CartTab" 
          component={CartStack} 
          options={{ 
            title: 'Cart',
            headerShown: false,
            tabBarBadge: getItemCount() > 0 ? getItemCount() : null
          }}
        />
        <Tab.Screen 
          name="WishlistTab" 
          component={WishlistStack} 
          options={{ 
            title: 'Wishlist',
            headerShown: false 
          }}
        />
      </Tab.Navigator>
  );
};

export default AppNavigator;