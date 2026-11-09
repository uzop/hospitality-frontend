import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function PaymentSuccessScreen({ route, navigation }) {
  const { bookingRef, hotel } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.successTitle}>Payment Successful!</Text>
      <Text style={styles.subtitle}>Thank you for booking at {hotel?.name}</Text>

      <View style={styles.qrContainer}>
        <QRCode value={bookingRef} size={260} color="#000" backgroundColor="#fff" />
      </View>

      <Text style={styles.qrLabel}>Booking Reference</Text>
      <Text style={styles.bookingRef}>{bookingRef}</Text>

      <Text style={styles.instruction}>
        Please show this QR Code at the hotel front desk upon arrival for verification.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HotelSelect')}>
        <Text style={styles.buttonText}>Back to Hotels</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', alignItems: 'center', padding: 24 },
  successTitle: { fontSize: 28, fontWeight: 'bold', color: '#007AFF', marginTop: 40 },
  subtitle: { fontSize: 18, textAlign: 'center', marginVertical: 20 },
  qrContainer: { marginVertical: 30, padding: 20, backgroundColor: 'white', borderRadius: 20 },
  qrLabel: { fontSize: 16, marginTop: 10 },
  bookingRef: { fontSize: 20, fontWeight: 'bold', color: '#007AFF', marginVertical: 8 },
  instruction: { textAlign: 'center', color: '#555', marginTop: 20, paddingHorizontal: 20 },
  button: { backgroundColor: '#007AFF', padding: 18, borderRadius: 12, marginTop: 40, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
});