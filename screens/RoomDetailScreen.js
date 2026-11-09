// screens/RoomDetailScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function RoomDetailScreen({ route, navigation }) {
  const { room, hotel } = route.params || {};

  if (!room || !hotel) {
    return <Text>No room or hotel selected</Text>;
  }

  const handleBookNow = () => {
    navigation.navigate('Payment', { 
      room, 
      hotel,
      amount: room.price * 0.4 
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: room.imageUrl || 'https://via.placeholder.com/400x250' }} style={styles.image} />
      
      <View style={styles.details}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Text style={styles.name}>{room.name}</Text>
        <Text style={styles.price}>₦{room.price.toLocaleString()} / night</Text>
        <Text style={styles.description}>{room.description || 'Comfortable room with modern amenities.'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBookNow}>
        <Text style={styles.buttonText}>Book Now (Pay 40% Deposit)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  image: { width: '100%', height: 250, resizeMode: 'cover' },
  details: { padding: 20 },
  hotelName: { fontSize: 18, color: '#007AFF', marginBottom: 4 },
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 22, color: '#007AFF', marginBottom: 16 },
  description: { fontSize: 16, color: '#666', marginBottom: 30 },
  button: { backgroundColor: '#007AFF', padding: 18, borderRadius: 12, alignItems: 'center', margin: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
});