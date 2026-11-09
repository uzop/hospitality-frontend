// screens/RoomListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';

export default function RoomListScreen({ navigation, route }) {
  const selectedHotel = route.params?.hotel;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedHotel) {
      Alert.alert('Error', 'No hotel selected');
      navigation.navigate('HotelSelect');
      return;
    }
    fetchRooms();
  }, [selectedHotel]);

  const fetchRooms = async () => {
    try {
      setRooms([
        { id: '101', name: 'Deluxe King', price: 45000, available: true },
        { id: '205', name: 'Executive Suite', price: 98000, available: true },
        { id: '312', name: 'Standard Twin', price: 32000, available: false },
      ]);
    } catch (err) {
      Alert.alert('Error', 'Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const selectRoom = (room) => {
    navigation.navigate('RoomDetail', { room, hotel: selectedHotel });
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rooms at {selectedHotel?.name}</Text>
      <FlatList
        data={rooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => selectRoom(item)}>
            <Text style={styles.roomName}>{item.name}</Text>
            <Text>₦{item.price.toLocaleString()} / night</Text>
            <Text style={{ color: item.available ? 'green' : 'red' }}>
              {item.available ? 'Available' : 'Not Available'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { padding: 16, marginVertical: 8, backgroundColor: '#fff', borderRadius: 10, elevation: 2 },
  roomName: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
});