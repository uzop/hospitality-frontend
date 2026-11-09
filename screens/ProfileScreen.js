// screens/ProfileScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const dummyUser = {
    name: 'Uzochukwu Nwogu',
    email: 'uzo@example.com',
    points: 450,
    idType: 'NIN',
    idNumber: '12345678901',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100?text=Profile' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{dummyUser.name}</Text>
        <Text style={styles.email}>{dummyUser.email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loyalty Points: {dummyUser.points}</Text>
        <Text style={styles.sectionTitle}>KYC Info</Text>
        <Text>ID Type: {dummyUser.idType}</Text>
        <Text>ID Number: {dummyUser.idNumber}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Upload New ID</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate('Reservations')}>
          <Text style={styles.link}>View Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
          <Text style={styles.link}>View Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Logged out')}>
          <Text style={styles.link}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { alignItems: 'center', padding: 24, borderBottomWidth: 1, borderColor: '#ddd' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold' },
  email: { fontSize: 16, color: '#666', marginBottom: 8 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  link: { fontSize: 16, color: '#007AFF', marginBottom: 12 },
});