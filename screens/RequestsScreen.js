import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RequestsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Requests</Text>
      <Text>No requests yet.</Text>
      {/* Later: list pending/completed requests from Redux or API */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});