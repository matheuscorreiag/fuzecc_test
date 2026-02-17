import { client } from "@/libs/api/axios-client";
import { Match } from "@/models/match";
import { useQuery } from "@tanstack/react-query";

async function getMatch(matchId: number) {
  const response = await client.get<Match>(`/matches/${matchId}`);
  return response.data;
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
