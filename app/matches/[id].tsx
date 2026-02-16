import { MatchIdView } from "@/screens/match-id/view";
import { useLocalSearchParams } from "expo-router";

export default function MatchIdPage() {
  const { id, query } = useLocalSearchParams<{ id: string; query?: string }>();

  return <MatchIdView matchId={Number(id)} leagueName={query} />;
}
