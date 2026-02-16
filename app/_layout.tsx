import { Providers } from "@/components/providers";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_900Black,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Roboto_900Black,
    Roboto_500Medium,
    Roboto_400Regular,
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
    </Providers>
  );
}
