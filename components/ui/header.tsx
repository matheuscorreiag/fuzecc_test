import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Typography } from "./typography";

const variants = {
  initial: {
    text: "text-[32px]",
    container: "justify-start",
  },
  inner: {
    text: "text-lg text-center",
    container: "justify-center",
  },
} as const;

type HeaderProps = {
  title: string;
  variant?: keyof typeof variants;
  onBackPress?: () => void;
};

export function Header({
  title,
  variant = "initial",
  onBackPress,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View
      className={twMerge(
        "flex-row items-center justify-start relative px-page",
        variants[variant].container,
      )}
    >
      {variant === "inner" && (
        <Pressable
          hitSlop={8}
          className="absolute left-4 z-10 p-1"
          onPress={() => (onBackPress ? onBackPress() : router.back())}
        >
          <ArrowLeft size={24} color={colors.foreground} pointerEvents="none" />
        </Pressable>
      )}

      <Typography
        weight="medium"
        className={twMerge(
          "text-foreground flex-1 font-medium max-w-64",
          variants[variant].text,
        )}
      >
        {title}
      </Typography>
    </View>
  );
}
