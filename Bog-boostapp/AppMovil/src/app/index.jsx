import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>¡Hola Mundo en Bog-Boost!</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});