import { Image, View } from "react-native";
import { useSplashViewModel } from "./view-model";

export function SplashView() {
  useSplashViewModel();

  return (
    <View className="bg-background flex-1 items-center justify-center">
      <Image
        source={require("../../assets/images/icon.png")}
        className="size-[113px]"
      />
    </View>
  );
}
