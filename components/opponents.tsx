import { Image, View } from "react-native";
import { Typography } from "./ui/typography";

type OpponentsProps = {
  homeTeamName?: string | null;
  homeTeamImageUrl?: string | null;
  awayTeamName?: string | null;
  awayTeamImageUrl?: string | null;
};
export function Opponents({
  homeTeamName,
  homeTeamImageUrl,
  awayTeamName,
  awayTeamImageUrl,
}: OpponentsProps) {
  return (
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
  );
}
