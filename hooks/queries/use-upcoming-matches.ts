import { client } from "@/libs/api/axios-client";
import { Match } from "@/models/match";
import { useInfiniteQuery } from "@tanstack/react-query";

async function getUpcomingMatches(page: number) {
  const response = await client.get<Match[]>("/csgo/matches/upcoming", {
    params: {
      page,
    },
  });

  return response.data;
}

export function useUpcomingMatches() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["upcoming-matches"],
    queryFn: ({ pageParam }) => getUpcomingMatches(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });

  return {
    upcomingMatches: data?.pages.flatMap((page) => page) ?? [],
    isUpcomingMatchesLoading: isLoading,
    isUpcomingMatchesError: isError,
    refetchUpcomingMatches: refetch,
    isUpcomingMatchesRefetching: isRefetching,
    hasNextUpcomingMatchesPage: hasNextPage,
    fetchNextUpcomingMatchesPage: fetchNextPage,
    isFetchingNextUpcomingMatchesPage: isFetchingNextPage,
  };
}
