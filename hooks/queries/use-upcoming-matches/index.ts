import { client } from "@/libs/api/axios-client";
import { useQuery } from "@tanstack/react-query";
import { UpcomingMatch } from "./types";

async function getUpcomingMatches() {
  const response = await client.get<UpcomingMatch[]>("/csgo/matches/upcoming");

  return response.data;
}

export function useUpcomingMatches() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["upcoming-matches"],
    queryFn: getUpcomingMatches,
  });

  return {
    upcomingMatches: data,
    isUpcomingMatchesLoading: isLoading,
    isUpcomingMatchesError: isError,
  };
}
