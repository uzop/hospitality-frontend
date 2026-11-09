// screens/PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

export default function PaymentScreen({ route, navigation }) {
  const { room, hotel, amount } = route.params || {};
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (!room || !hotel) {
      Alert.alert('Error', 'Missing room or hotel information');
      return;
    }

    setLoading(true);

    // Simulate payment processing (replace with real Paystack integration later)
    setTimeout(() => {
      setLoading(false);

      const bookingRef = `BOOK-${hotel.id}-${Date.now()}`;

      navigation.replace('PaymentSuccess', { 
        bookingRef, 
        hotel,
        room 
      });
    }, 1800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Payment</Text>
      
      {hotel && <Text style={styles.hotel}>Hotel: {hotel.name}</Text>}
      {room && <Text style={styles.room}>Room: {room.name}</Text>}
      
      <Text style={styles.amount}>
        Amount Due: ₦{amount?.toLocaleString()} (40% Deposit)
      </Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handlePayment} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Confirm & Pay Now</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.note}>Secured by Paystack • Your data is protected</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
    backgroundColor: '#f8f9fa', 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 30 
  },
  hotel: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginBottom: 8, 
    color: '#007AFF' 
  },
  room: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginBottom: 20, 
    fontWeight: '600' 
  },
  amount: { 
    fontSize: 24, 
    color: '#007AFF', 
    textAlign: 'center', 
    marginVertical: 40 
  },
  button: { 
    backgroundColor: '#007AFF', 
    borderRadius: 12, 
    padding: 18, 
    alignItems: 'center', 
    marginTop: 30 
  },
  buttonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: '600' 
  },
  note: { 
    textAlign: 'center', 
    color: '#666', 
    marginTop: 30, 
    fontSize: 14 
  },
});