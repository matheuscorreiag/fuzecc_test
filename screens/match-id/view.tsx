import { LoadingSpinner } from "@/components/loading-spinner";
import { Opponents } from "@/components/opponents";
import { PlayerCard } from "@/components/player-card";
import { Screen } from "@/components/ui/screen";
import { Typography } from "@/components/ui/typography";
import { formatMatchDate } from "@/libs/dayjs/format-match-date";
import { ScrollView, View } from "react-native";
import { useMatchIdViewModel } from "./view-model";

type MatchIdViewProps = {
  matchId: number;
};

export function MatchIdView({ matchId }: MatchIdViewProps) {
  const { match, matchTeams, isMatchLoading } = useMatchIdViewModel(matchId);
  const headerTitle = match ? match?.league.name + " " + match?.serie.name : "";
  const homeTeamName = match?.opponents[0]?.opponent?.name;
  const homeTeamImageUrl = match?.opponents[0]?.opponent?.image_url;
  const awayTeamName = match?.opponents[1]?.opponent?.name;
  const awayTeamImageUrl = match?.opponents[1]?.opponent?.image_url;
  const lengthOfPlayersList = Math.max(
    matchTeams?.team1.players.length || 0,
    matchTeams?.team2.players.length || 0,
  );

  if (isMatchLoading) {
    return (
      <Screen title="">
        <LoadingSpinner />
      </Screen>
    );
  }

  return (
    <Screen title={headerTitle} type="inner" hidePadding>
      <ScrollView>
        <Opponents
          homeTeamName={homeTeamName}
          homeTeamImageUrl={homeTeamImageUrl}
          awayTeamName={awayTeamName}
          awayTeamImageUrl={awayTeamImageUrl}
        />

        {match?.begin_at && (
          <View className="mt-4 items-center justify-center">
            <Typography weight="bold" className="text-foreground text-sm">
              {formatMatchDate(match.begin_at)}
            </Typography>
          </View>
        )}

        <View className="gap-2.5 pt-4">
          {Array.from({ length: lengthOfPlayersList }).map((_, index) => {
            const homePlayer = matchTeams?.team1.players[index];
            const awayPlayer = matchTeams?.team2.players[index];

            return (
              <View key={`row-${index}`} className="w-full flex-row gap-x-3">
                {homePlayer && (
                  <PlayerCard
                    nickname={homePlayer?.name ?? "Nickname"}
                    name={homePlayer?.name ?? "Nome Jogador"}
                    imageUrl={homePlayer?.image_url}
                    className="w-1/2"
                  />
                )}
                {awayPlayer && (
                  <PlayerCard
                    nickname={awayPlayer?.name ?? "Nickname"}
                    name={awayPlayer?.name ?? "Nome Jogador"}
                    imageUrl={awayPlayer?.image_url}
                    isOpponent
                    className="w-1/2"
                  />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}
