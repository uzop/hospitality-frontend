import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const dummyMenu = [
  { id: '1', name: 'Jollof Rice + Chicken', price: 4500, prepTime: '20 mins' },
  { id: '2', name: 'Egusi Soup & Pounded Yam', price: 5200, prepTime: '25 mins' },
  { id: '3', name: 'Laundry Service (per kg)', price: 1200, prepTime: '2 hours' },
  { id: '4', name: 'Extra Bed', price: 8000, prepTime: 'Immediate' },
];

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu & Services</Text>
      <FlatList
        data={dummyMenu}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>₦{item.price.toLocaleString()} • {item.prepTime}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('NewRequest')}
      >
        <Text style={styles.buttonText}>Make New Request</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 16, marginVertical: 8, backgroundColor: '#fff', borderRadius: 10, elevation: 2 },
  itemName: { fontSize: 18, fontWeight: '600' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
});