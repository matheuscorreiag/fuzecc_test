import { useCurrentMatches } from "@/hooks/queries/use-current-matches";
import { useUpcomingMatches } from "@/hooks/queries/use-upcoming-matches";
import { Match } from "@/models/match";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useRouter } from "expo-router";

export function useMatchesViewModel() {
  const router = useRouter();
  const {
    currentMatches,
    isCurrentMatchesError,
    isCurrentMatchesLoading,
    isCurrentMatchesRefetching,
    refetchCurrentMatches,
    hasNextCurrentMatchesPage,
    fetchNextCurrentMatchesPage,
    isFetchingNextCurrentMatchesPage,
  } = useCurrentMatches();

  const {
    upcomingMatches,
    isUpcomingMatchesError,
    isUpcomingMatchesLoading,
    isUpcomingMatchesRefetching,
    refetchUpcomingMatches,
    hasNextUpcomingMatchesPage,
    fetchNextUpcomingMatchesPage,
    isFetchingNextUpcomingMatchesPage,
  } = useUpcomingMatches();

  function handleMatchPress(matchId: number) {
    router.push({
      pathname: "/(matches)/[id]",
      params: {
        id: matchId,
      },
    });
  }

  async function onRefresh() {
    await Promise.all([refetchCurrentMatches(), refetchUpcomingMatches()]);
  }

  async function onEndReached() {
    if (isFetchingNextCurrentMatchesPage || isFetchingNextUpcomingMatchesPage) {
      return;
    }

    const requests: Promise<
      InfiniteQueryObserverResult<InfiniteData<Match[], unknown>, Error>
    >[] = [];

    if (hasNextCurrentMatchesPage) {
      requests.push(fetchNextCurrentMatchesPage());
    }

    if (hasNextUpcomingMatchesPage) {
      requests.push(fetchNextUpcomingMatchesPage());
    }

    if (requests.length === 0) {
      return;
    }

    await Promise.all(requests);
  }

  const matches: Match[] = [];

  matches.push(...currentMatches, ...upcomingMatches);

  return {
    matches,
    isMatchesError: isCurrentMatchesError || isUpcomingMatchesError,
    isMatchesLoading: isCurrentMatchesLoading || isUpcomingMatchesLoading,
    isRefreshing: isUpcomingMatchesRefetching || isCurrentMatchesRefetching,
    isLoadingMore:
      isFetchingNextCurrentMatchesPage || isFetchingNextUpcomingMatchesPage,
    handleMatchPress,
    onRefresh,
    onEndReached,
  };
}
