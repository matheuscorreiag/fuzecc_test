import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";
import { Header, headerVariants } from "./header";

type ScreenProps = {
  title: string;
  children: ReactNode;
  hidePadding?: boolean;
  type?: keyof typeof headerVariants;
};
export function Screen({
  title,
  children,
  hidePadding,
  type = "initial",
}: ScreenProps) {
  return (
    <SafeAreaView className={twMerge("flex-1 bg-background pt-6")}>
      <Header title={title} variant={type} />

      <View
        testID="screen-content"
        className={twMerge(
          "flex-1 bg-background px-0 mt-6",
          !hidePadding && "px-page",
        )}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
