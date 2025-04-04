import React, { createContext, useState, useEffect, useContext } from 'react';
import { getWishlistItems, saveWishlistItems } from '../utils/storage';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist items from storage on component mount
  useEffect(() => {
    const loadWishlistItems = async () => {
      const items = await getWishlistItems();
      setWishlistItems(items);
      setLoading(false);
    };
    
    loadWishlistItems();
  }, []);

  // Save wishlist items to storage whenever they change
  useEffect(() => {
    if (!loading) {
      saveWishlistItems(wishlistItems);
    }
  }, [wishlistItems, loading]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      // Check if the product is already in the wishlist
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If the product is already in the wishlist, don't add it again
        return prevItems;
      } else {
        // If the product is not in the wishlist, add it
        return [...prevItems, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      loading,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

const WishlistContextExports = {
  WishlistContext,
  WishlistProvider,
  useWishlist
};

export default WishlistContextExports;