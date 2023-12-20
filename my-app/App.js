import { StatusBar } from "expo-status-bar";
import { RecordingButton } from "./src/components/RecordingButton";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex items-center justify-center border h-screen">
      <RecordingButton />
      <StatusBar style="auto" />
    </View>
  );
}
