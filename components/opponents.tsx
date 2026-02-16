import { View } from "react-native";
import { TeamBadge } from "./team-badge";
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
    <View className="flex-row items-center gap-5 justify-center">
      <View className="w-[90px] items-center gap-2.5">
        <TeamBadge imageUrl={homeTeamImageUrl} />
        <Typography className="max-w-[100px] text-foreground" numberOfLines={1}>
          {homeTeamName}
        </Typography>
      </View>
      <Typography className="text-foreground/50">vs</Typography>
      <View className="w-[90px] items-center gap-2.5">
        <TeamBadge imageUrl={awayTeamImageUrl} />
        <Typography className="max-w-[100px] text-foreground" numberOfLines={1}>
          {awayTeamName}
        </Typography>
      </View>
    </View>
  );
}
