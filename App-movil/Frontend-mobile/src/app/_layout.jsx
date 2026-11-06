// app/_layout.jsx
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../Presentation/context/AuthContext";
import { CarritoProvider } from "../Presentation/context/CarritoContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CarritoProvider>
    </AuthProvider>
  );
}