import { LoadingSpinner } from "@/components/loading-spinner";
import { MatchCard } from "@/components/match-card";
import { Screen } from "@/components/ui/screen";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { useMatchesViewModel } from "./view-model";

export function MatchesView() {
  const {
    matches,
    handleMatchPress,
    isRefreshing,
    onRefresh,
    isMatchesLoading,
    onEndReached,
  } = useMatchesViewModel();

  if (isMatchesLoading) {
    return (
      <Screen title="Partidas">
        <LoadingSpinner />
      </Screen>
    );
  }

  return (
    <Screen title="Partidas">
      <FlashList
        data={matches}
        keyExtractor={(match) => match.id.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item: match }) => (
          <MatchCard
            beginAt={match.begin_at}
            leagueName={match.league.name}
            serieName={match.serie.name}
            homeTeamName={match?.opponents[0]?.opponent?.name}
            homeTeamImageUrl={match?.opponents[0]?.opponent?.image_url}
            awayTeamName={match?.opponents[1]?.opponent?.name}
            awayTeamImageUrl={match?.opponents[1]?.opponent?.image_url}
            onPress={() => handleMatchPress(match.id)}
            leagueImageUrl={match.league.image_url}
          />
        )}
      />
    </Screen>
  );
}
