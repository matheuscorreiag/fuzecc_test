import { client } from "@/libs/api/axios-client";
import { useQuery } from "@tanstack/react-query";
import { CurrentMatch } from "./types";

async function getCurrentMatches() {
  const response = await client.get<CurrentMatch[]>("/csgo/matches/running");

  return response.data;
}

export function useCurrentMatches() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["matches"],
    queryFn: getCurrentMatches,
  });

  return {
    currentMatches: data,
    isCurrentMatchesLoading: isLoading,
    isCurrentMatchesError: isError,
  };
}
