import { client } from "@/libs/api/axios-client";
import { Match } from "@/models/match";
import { useInfiniteQuery } from "@tanstack/react-query";

async function getCurrentMatches(page: number) {
  const response = await client.get<Match[]>("/csgo/matches/running", {
    params: {
      page,
    },
  });

  return response.data;
}

export function useCurrentMatches() {
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
    queryKey: ["current-matches"],
    queryFn: ({ pageParam }) => getCurrentMatches(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });

  return {
    currentMatches: data?.pages.flatMap((page) => page) ?? [],
    isCurrentMatchesLoading: isLoading,
    isCurrentMatchesError: isError,
    refetchCurrentMatches: refetch,
    isCurrentMatchesRefetching: isRefetching,
    hasNextCurrentMatchesPage: hasNextPage,
    fetchNextCurrentMatchesPage: fetchNextPage,
    isFetchingNextCurrentMatchesPage: isFetchingNextPage,
  };
}
