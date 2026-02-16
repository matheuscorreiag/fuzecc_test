import { useCurrentMatches } from "@/hooks/queries/use-current-matches";
import { CurrentMatch } from "@/hooks/queries/use-current-matches/types";
import { useUpcomingMatches } from "@/hooks/queries/use-upcoming-matches";
import { UpcomingMatch } from "@/hooks/queries/use-upcoming-matches/types";
import { useRouter } from "expo-router";

type Matches = CurrentMatch & UpcomingMatch;

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

  const matches: Matches[] = [];

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
