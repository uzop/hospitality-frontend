// screens/ReservationScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const dummyReservations = [
  {
    id: '1',
    room: 'Deluxe King - Room 101',
    checkIn: '2026-02-25',
    checkOut: '2026-02-28',
    status: 'Confirmed',
    totalPrice: 135000,
    depositPaid: 54000,  // 40%
  },
  {
    id: '2',
    room: 'Executive Suite - Room 205',
    checkIn: '2026-03-10',
    checkOut: '2026-03-12',
    status: 'Pending',
    totalPrice: 196000,
    depositPaid: 78400,
  },
];

export default function ReservationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <FlatList
        data={dummyReservations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.room}>{item.room}</Text>
            <Text>Check-in: {item.checkIn}</Text>
            <Text>Check-out: {item.checkOut}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Deposit Paid: ₦{item.depositPaid.toLocaleString()} (40%)</Text>
            <Text>Total: ₦{item.totalPrice.toLocaleString()}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('NewRequest', { type: 'EXTENSION', reservation: item })}
            >
              <Text style={styles.buttonText}>Extend Stay</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No bookings yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  card: { padding: 16, marginVertical: 8, backgroundColor: '#fff', borderRadius: 10, elevation: 2 },
  room: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});