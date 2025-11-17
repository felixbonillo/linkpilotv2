// app/index.tsx
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackNavigator } from "../src/core/navigation/RootStack";

export default function Index() {
  return (
    <SafeAreaProvider>
      <RootStackNavigator />
    </SafeAreaProvider>
  );
}
