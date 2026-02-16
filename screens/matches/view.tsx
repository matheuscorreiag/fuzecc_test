import { MatchCard } from "@/components/match-card";
import { Screen } from "@/components/ui/screen";
import { FlashList } from "@shopify/flash-list";
import { useMatchesViewModel } from "./view-model";

export function MatchesView() {
  const { matches, handleMatchPress } = useMatchesViewModel();

  return (
    <Screen title="Partidas">
      <FlashList
        data={matches}
        keyExtractor={(match) => match.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: match }) => (
          <MatchCard
            beginAt={match.begin_at}
            league={match.league.name}
            serie={match.serie.full_name}
            homeTeamName={match.opponents[0].opponent?.name}
            homeTeamImageUrl={match.opponents[0].opponent?.image_url}
            awayTeamName={match.opponents[1].opponent?.name}
            awayTeamImageUrl={match.opponents[1].opponent?.image_url}
            onPress={() => handleMatchPress(match.id)}
          />
        )}
      />
    </Screen>
  );
}
