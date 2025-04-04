import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image,
  ActivityIndicator 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistScreen = ({ navigation }) => {
  const { wishlistItems, loading, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="favorite" size={80} color="#ccc" />
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.shopButtonText}>Discover Products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderWishlistItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', { 
          productId: item.id, 
          title: item.title 
        })}
      >
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </TouchableOpacity>
      
      <View style={styles.itemInfo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail', { 
            productId: item.id, 
            title: item.title 
          })}
        >
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        </TouchableOpacity>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFromWishlist(item.id)}
          >
            <MaterialIcons name="delete" size={20} color="#666" />
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              addToCart(item, 1);
              removeFromWishlist(item.id);
            }}
          >
            <MaterialIcons name="shopping-cart" size={20} color="white" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist ({wishlistItems.length})</Text>
        {wishlistItems.length > 0 && (
          <TouchableOpacity onPress={clearWishlist}>
            <Text style={styles.clearAll}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={wishlistItems}
        renderItem={renderWishlistItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: '#f4511e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearAll: {
    color: '#f4511e',
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4511e',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  removeText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4511e',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addToCartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
});

export default WishlistScreen;