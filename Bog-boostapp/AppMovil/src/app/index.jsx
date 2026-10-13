import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>¡Expo Router ya está conectado!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});