import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart() || {}; 
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity?.(item.id, item.quantity - 1);
    }
  };

  const increaseQuantity = () => {
    updateQuantity?.(item.id, item.quantity + 1);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.image }} style={styles.image} resizeMode="contain" />

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{item?.title}</Text>
        <Text style={styles.price}>${item?.price?.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <MaterialIcons name="remove" size={20} color="#333" />
          </TouchableOpacity>

          <Text style={styles.quantity}>{item?.quantity}</Text>

          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <MaterialIcons name="add" size={20} color="#333" />
          </TouchableOpacity>

          <Text style={styles.subtotal}>
            ${(item?.price * item?.quantity)?.toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.removeButton} 
        onPress={() => removeFromCart?.(item.id)}
      >
        <MaterialIcons name="delete" size={24} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
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
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4511e',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  subtotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  removeButton: {
    padding: 5,
    justifyContent: 'center',
  },
});

export default CartItem;
