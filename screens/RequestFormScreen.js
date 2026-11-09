import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function RequestFormScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Request</Text>
      <TextInput placeholder="Describe your request (e.g. Extra towels, Food order...)" multiline style={styles.input} />
      <Button title="Submit Request" onPress={() => alert('Request sent! (mock)')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, minHeight: 120, borderRadius: 8, marginBottom: 20 },
});