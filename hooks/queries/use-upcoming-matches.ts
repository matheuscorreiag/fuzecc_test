import { client } from "@/libs/api/axios-client";
import { useQuery } from "@tanstack/react-query";
import { Match } from "../matches/types";

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
