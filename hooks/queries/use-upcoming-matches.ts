import { client } from "@/libs/api/axios-client";
import { Match } from "@/models/match";
import { useQuery } from "@tanstack/react-query";

async function getUpcomingMatches() {
  const response = await client.get<Match[]>("/csgo/matches/upcoming");

  return response.data;
}

export function useUpcomingMatches() {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ["upcoming-matches"],
    queryFn: getUpcomingMatches,
  });

  return {
    upcomingMatches: data,
    isUpcomingMatchesLoading: isLoading,
    isUpcomingMatchesError: isError,
    refetchUpcomingMatches: refetch,
    isUpcomingMatchesRefetching: isRefetching,
  };
}
