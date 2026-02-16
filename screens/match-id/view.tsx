import { LoadingSpinner } from "@/components/loading-spinner";
import { Screen } from "@/components/ui/screen";
import { View } from "react-native";
import { useMatchIdViewModel } from "./view-model";

type MatchIdViewProps = {
  matchId: number | null;
  leagueName?: string;
};

export function MatchIdView(props: MatchIdViewProps) {
  const { match, isMatchLoading } = useMatchIdViewModel(props.matchId);
  const headerTitle = match ? match?.league.name + " " + match?.serie.name : "";

  if (isMatchLoading) {
    return (
      <Screen title={props.leagueName || ""} type="inner">
        <LoadingSpinner />
      </Screen>
    );
  }
  return (
    <Screen title={headerTitle} type="inner">
      <View />
    </Screen>
  );
}
