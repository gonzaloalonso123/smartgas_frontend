import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";
export default function Home() {
  return (
    <View className="h-screen flex items-center justify-center">
      <Link href="/">Back</Link>
    </View>
  );
}
