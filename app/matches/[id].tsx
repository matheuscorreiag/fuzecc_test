import { MatchIdView } from "@/screens/match-id/view";
import { useLocalSearchParams } from "expo-router";

export default function MatchIdPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <MatchIdView matchId={Number(id)} />;
}
