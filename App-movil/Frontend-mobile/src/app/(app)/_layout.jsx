// app/(app)/_layout.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Header from "../../Presentation/components/Header";

export default function AppLayout() {
  return (
    <View style={styles.container}>
      {/* El Header se mantiene fijo en todas las pantallas de este grupo */}
      <Header />
      <View style={styles.stackContainer}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  stackContainer: { flex: 1 },
});