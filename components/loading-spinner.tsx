import { ActivityIndicator, View } from "react-native";

export function LoadingSpinner() {
  return (
    <View className="flex-1 h-full items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
