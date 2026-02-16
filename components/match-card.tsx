import { Image, Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Typography } from "./ui/typography";

type MatchCardProps = {
  date: string | null;
  onPress: () => void;
  league: string;
  serie: string;
  homeTeamName: string | null | undefined;
  homeTeamImageUrl: string | null | undefined;
  awayTeamName: string | null | undefined;
  awayTeamImageUrl: string | null | undefined;
  live?: boolean;
};

export function MatchCard({
  date,
  onPress,
  league,
  serie,
  live = false,
  homeTeamName,
  homeTeamImageUrl,
  awayTeamName,
  awayTeamImageUrl,
}: MatchCardProps) {
  const formattedDate = date
    ? date?.split("/")[0] + date?.split("/")[0]
    : "N/A";

  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl items-center justify-center bg-card h-[176px]"
    >
      <View
        className={twMerge(
          "absolute right-0 top-0 rounded-tr-2xl bg-[#FAFAFA]/20 rounded-bl-2xl p-2",
          live && "bg-[#F42A35]",
        )}
      >
        <Typography weight="bold" className="text-xs text-foreground">
          {live ? "AGORA" : formattedDate}
        </Typography>
      </View>

      <View className="flex-row items-center gap-5">
        <View className="items-center gap-2.5">
          {!homeTeamImageUrl && (
            <View className="rounded-full size-[60px] bg-[#C4C4C4]" />
          )}
          {!!homeTeamImageUrl && (
            <Image
              className="size-[60px]"
              src={homeTeamImageUrl}
              resizeMode="contain"
            />
          )}
          <Typography
            className="text-foreground max-w-[100px] "
            numberOfLines={1}
          >
            {homeTeamName}
          </Typography>
        </View>
        <Typography className="text-foreground/50">vs</Typography>
        <View className="items-center gap-2.5">
          {!awayTeamImageUrl && (
            <View className="rounded-full size-[60px] bg-[#C4C4C4]" />
          )}
          {!!awayTeamImageUrl && (
            <Image
              className="size-[60px]"
              src={awayTeamImageUrl}
              resizeMode="contain"
            />
          )}
          <Typography
            className="text-foreground max-w-[100px] "
            numberOfLines={1}
          >
            {awayTeamName}
          </Typography>
        </View>
      </View>

      <View className="border-t items-center border-gray-300 h-8 absolute flex-row left-0 bottom-0 w-full px-4 py-2">
        <View className="size-4 rounded-full bg-white mr-2" />
        <Typography className="text-xs text-foreground truncate w-full whitespace-nowrap">
          {league} {serie}
        </Typography>
      </View>
    </Pressable>
  );
}
