import { useSplashRedirection } from "@/hooks/use-splash-redirection";
import { Image, View } from "react-native";

export default function SplashPage() {
  useSplashRedirection();

  return (
    <View className="bg-background flex-1 items-center justify-center">
      <Image
        source={require("../assets/images/icon.png")}
        className="size-[113px]"
      />
    </View>
  );
}
