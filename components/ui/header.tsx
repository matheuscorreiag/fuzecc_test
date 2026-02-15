import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

const variants = {
  initial: {
    text: "text-[32px]",
  },
  inner: {
    text: "text-lg text-center",
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
    <View className="flex-row items-center relative px-page">
      {variant === "inner" && (
        <Pressable
          hitSlop={8}
          className="absolute left-4"
          onPress={onBackPress ?? router.back}
        >
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>
      )}

      <Text
        className={twMerge(
          "text-foreground flex-1 font-medium",
          variants[variant].text,
        )}
      >
        {title}
      </Text>
    </View>
  );
}
