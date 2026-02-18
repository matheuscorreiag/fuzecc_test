import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

const typographyVariants = {
  normal: {
    fontFamily: "Roboto_400Regular",
  },
  medium: {
    fontFamily: "Roboto_500Medium",
  },
  bold: {
    fontFamily: "Roboto_700Bold",
  },
} as const;

type TypographyProps = TextProps & {
  weight?: keyof typeof typographyVariants;
};

export function Typography({
  className,
  weight = "normal",
  ...props
}: TypographyProps) {
  return (
    <Text
      className={twMerge(className)}
      style={{
        fontFamily: typographyVariants[weight].fontFamily,
      }}
      {...props}
    >
      {props.children}
    </Text>
  );
}
