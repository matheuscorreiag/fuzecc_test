import { Match } from "@/hooks/matches/types";
import { useCurrentMatches } from "@/hooks/queries/use-current-matches";
import { useUpcomingMatches } from "@/hooks/queries/use-upcoming-matches";
import { useRouter } from "expo-router";

export function useMatchesViewModel() {
  const router = useRouter();
  const {
    currentMatches,
    isCurrentMatchesError,
    isCurrentMatchesLoading,
    isCurrentMatchesRefetching,
    refetchCurrentMatches,
  } = useCurrentMatches();

  const {
    upcomingMatches,
    isUpcomingMatchesError,
    isUpcomingMatchesLoading,
    isUpcomingMatchesRefetching,
    refetchUpcomingMatches,
  } = useUpcomingMatches();

  function handleMatchPress(matchId: number) {
    router.push({
      pathname: "/matches/[id]",
      params: {
        id: matchId,
      },
    });
  }

  async function onRefresh() {
    await Promise.all([refetchCurrentMatches(), refetchUpcomingMatches()]);
  }

  const matches: Match[] = [];

  if (Array.isArray(currentMatches) && Array.isArray(upcomingMatches)) {
    matches.push(...currentMatches, ...upcomingMatches);
  }

  return {
    matches,
    isMatchesError: isCurrentMatchesError || isUpcomingMatchesError,
    isMatchesLoading: isCurrentMatchesLoading || isUpcomingMatchesLoading,
    isRefreshing: isUpcomingMatchesRefetching || isCurrentMatchesRefetching,
    handleMatchPress,
    onRefresh,
  };
}
