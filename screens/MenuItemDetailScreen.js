// screens/MenuItemDetailScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function MenuItemDetailScreen({ route, navigation }) {
  const { item } = route.params || {};  // Get item from params (e.g., from MenuScreen)

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>No item selected</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/400x200?text=Menu+Item+Image' }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₦{item.price.toLocaleString()}</Text>
        <Text style={styles.prepTime}>Prep Time: {item.prepTime}</Text>
        <Text style={styles.description}>
          Delicious traditional Nigerian dish with rice, tomatoes, peppers, and spiced chicken.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NewRequest', { item })}  // Navigate to request form
      >
        <Text style={styles.buttonText}>Order Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  image: { width: '100%', height: 250, resizeMode: 'cover' },
  details: { padding: 20 },
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 22, color: '#007AFF', marginBottom: 8 },
  prepTime: { fontSize: 18, color: '#666', marginBottom: 16 },
  description: { fontSize: 16, color: '#444', marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 18, borderRadius: 12, alignItems: 'center', margin: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
});