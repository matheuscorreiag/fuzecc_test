import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

type TypographyProps = TextProps & {
  weight?: "normal" | "medium" | "bold";
};

function getFontFamily(weight: "normal" | "medium" | "bold") {
  const fontWeights = {
    normal: "Roboto_400Regular",
    medium: "Roboto_500Medium",
    bold: "Roboto_900Black",
  };

  return fontWeights[weight];
}
export function Typography({
  className,
  weight = "normal",
  ...props
}: TypographyProps) {
  return (
    <Text
      className={twMerge(className)}
      style={{
        fontFamily: getFontFamily(weight),
      }}
      {...props}
    >
      {props.children}
    </Text>
  );
}
