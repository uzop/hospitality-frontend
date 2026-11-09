// screens/HotelSelectScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function HotelSelectScreen({ navigation }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://10.0.2.2:8080/hotels');
      setHotels(response.data);
    } catch (err) {
      setError('Failed to load hotels. Please try again.');
      Alert.alert('Error', 'Could not fetch hotels.');
    } finally {
      setLoading(false);
    }
  };

  const selectHotel = (hotel) => {
    // Pass the entire hotel object to LoginScreen
    navigation.navigate('Login', { hotel });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading hotels...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Retry" onPress={fetchHotels} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Hotel</Text>
      <FlatList
        data={hotels}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.hotelName}>{item.name}</Text>
            <Text>{item.address}, {item.country}</Text>
            
            <Button
              title="Continue"
              onPress={() => selectHotel(item)}     // ← Correct usage
            />
          </View>
        )}
        ListEmptyComponent={<Text>No hotels available. Onboard some via backend.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { padding: 16, marginVertical: 8, backgroundColor: '#fff', borderRadius: 10, elevation: 2 },
  hotelName: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  error: { color: 'red', textAlign: 'center', marginBottom: 16 },
});