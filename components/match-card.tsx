import { dayjs } from "@/libs/dayjs";
import { formatMatchDate } from "@/libs/dayjs/format-match-date";
import { Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Opponents } from "./opponents";
import { Image } from "./ui/image";
import { Typography } from "./ui/typography";

type MatchCardProps = {
  beginAt: string | null;
  onPress: () => void;
  leagueName: string;
  serieName: string;
  homeTeamName?: string | null;
  homeTeamImageUrl?: string | null;
  awayTeamName?: string | null;
  awayTeamImageUrl?: string | null;
  live?: boolean;
  leagueImageUrl: string | null;
};

export function MatchCard({
  beginAt,
  onPress,
  leagueName,
  serieName,
  homeTeamName,
  homeTeamImageUrl,
  awayTeamName,
  awayTeamImageUrl,
  leagueImageUrl,
}: MatchCardProps) {
  const matchDate = formatMatchDate(beginAt);
  const isLive =
    !!beginAt && dayjs(beginAt).isValid() && dayjs(beginAt).isBefore(dayjs());

  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl items-center justify-center bg-card h-[176px]"
    >
      <View
        className={twMerge(
          "absolute right-0 top-0 rounded-tr-2xl bg-[#FAFAFA]/20 rounded-bl-2xl p-2",
          isLive && "bg-[#F42A35]",
        )}
      >
        <Typography weight="bold" className="text-xs text-foreground">
          {isLive ? "AGORA" : matchDate}
        </Typography>
      </View>

      <Opponents
        homeTeamName={homeTeamName}
        homeTeamImageUrl={homeTeamImageUrl}
        awayTeamName={awayTeamName}
        awayTeamImageUrl={awayTeamImageUrl}
      />

      <View className="border-t gap-x-2 items-center border-gray-500 h-8 absolute flex-row left-0 bottom-0 w-full px-4 py-2">
        <Image
          imageUrl={leagueImageUrl}
          containerClassName="rounded-full size-4"
          imageClassName="rounded-full size-4"
          placeholderClassName="rounded-full size-4"
        />
        <Typography className="text-xs text-foreground truncate w-full whitespace-nowrap">
          {leagueName} {serieName}
        </Typography>
      </View>
    </Pressable>
  );
}
