import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";
import { Header } from "./header";

type ScreenProps = {
  title: string;
  children: ReactNode;
  hidePadding?: boolean;
  type?: "initial" | "inner";
};
export function Screen({
  title,
  children,
  hidePadding,
  type = "initial",
}: ScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title={title} variant={type} />

      <SafeAreaView
        className={twMerge(
          "flex-1 bg-background px-page",
          hidePadding && "px-0",
        )}
      >
        {children}
      </SafeAreaView>
    </SafeAreaView>
  );
}
