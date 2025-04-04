import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_ITEMS_KEY = 'cart_items';
const WISHLIST_ITEMS_KEY = 'wishlist_items';

// Cart Storage Functions
export const getCartItems = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CART_ITEMS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting cart items from storage:', error);
    return [];
  }
};

export const saveCartItems = async (cartItems) => {
  try {
    const jsonValue = JSON.stringify(cartItems);
    await AsyncStorage.setItem(CART_ITEMS_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving cart items to storage:', error);
  }
};

// Wishlist Storage Functions
export const getWishlistItems = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(WISHLIST_ITEMS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting wishlist items from storage:', error);
    return [];
  }
};

export const saveWishlistItems = async (wishlistItems) => {
  try {
    const jsonValue = JSON.stringify(wishlistItems);
    await AsyncStorage.setItem(WISHLIST_ITEMS_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving wishlist items to storage:', error);
  }
};

// Clear all storage (for testing/logout)
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

// Add a default export with all storage functions
const storage = {
  getCartItems,
  saveCartItems,
  getWishlistItems,
  saveWishlistItems,
  clearStorage
};

export default storage;