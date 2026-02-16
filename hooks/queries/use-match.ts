import { client } from "@/libs/api/axios-client";
import { useQuery } from "@tanstack/react-query";
import { Match } from "../matches/types";

async function getMatch(matchId: number) {
  try {
    const response = await client.get<Match>(`/matches/${matchId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export function useMatch(matchId: number | null) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatch(matchId as number),
    enabled: !!matchId,
  });

  return {
    match: data,
    isMatchLoading: isLoading,
    isMatchError: isError,
  };
}
