import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Image } from "./ui/image";
import { Typography } from "./ui/typography";

export type PlayerCardProps = {
  nickname: string;
  name: string;
  imageUrl?: string | null;
  className?: string;
  isOpponent?: boolean;
};

export function PlayerCard({
  nickname,
  name,
  imageUrl,
  className,
  isOpponent = false,
}: PlayerCardProps) {
  return (
    <View
      className={twMerge("relative h-[54px] w-full bg-[#2A2941]", className)}
    >
      <View
        className={twMerge(
          "h-full justify-center px-5",
          isOpponent && "items-end",
        )}
      >
        <Typography
          weight="bold"
          className="text-foreground text-start"
          numberOfLines={1}
        >
          {nickname}
        </Typography>
        <Typography
          className="mt-0.5 text-sm text-foreground/40"
          numberOfLines={1}
        >
          {name}
        </Typography>
      </View>

      <View
        className={twMerge(
          "absolute -top-2 right-3 bottom-4 rounded-lg w-[48px] h-[48px]",
          isOpponent && "-top-2 left-3",
        )}
      >
        <Image
          imageUrl={imageUrl}
          resizeMode="cover"
          containerClassName="h-full w-full"
          placeholderClassName="rounded-lg bg-[#C8C8CC]"
          imageClassName="h-full w-full rounded-lg"
        />
      </View>
    </View>
  );
}
