import { useCurrentMatches } from "@/hooks/queries/use-current-matches";
import { useRouter } from "expo-router";

export function useMatchesViewModel() {
  const router = useRouter();
  const { currentMatches, isCurrentMatchesError, isCurrentMatchesLoading } =
    useCurrentMatches();

  function handleMatchPress(matchId: number) {
    router.push({
      pathname: "/matches/[id]",
      params: {
        id: matchId,
      },
    });
  }
  return {
    currentMatches,
    isCurrentMatchesError,
    isCurrentMatchesLoading,
    handleMatchPress,
  };
}
