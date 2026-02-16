import { client } from "@/libs/api/axios-client";
import { Match } from "@/models/match";
import { useQuery } from "@tanstack/react-query";

async function getCurrentMatches() {
  const response = await client.get<Match[]>("/csgo/matches/running");

  return response.data;
}

export function useCurrentMatches() {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ["current-matches"],
    queryFn: getCurrentMatches,
  });

  return {
    currentMatches: data,
    isCurrentMatchesLoading: isLoading,
    isCurrentMatchesError: isError,
    refetchCurrentMatches: refetch,
    isCurrentMatchesRefetching: isRefetching,
  };
}
