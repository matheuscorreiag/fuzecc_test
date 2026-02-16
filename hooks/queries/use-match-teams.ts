import { client } from "@/libs/api/axios-client";
import { useQuery } from "@tanstack/react-query";
import { MatchTeams } from "../matches/types";

async function getMatchTeams(team1Id?: number, team2Id?: number) {
  try {
    const [team1Response, team2Response] = await Promise.all([
      client.get<MatchTeams>(`/teams/${team1Id}`),
      client.get<MatchTeams>(`/teams/${team2Id}`),
    ]);

    return {
      team1: team1Response.data,
      team2: team2Response.data,
    };
  } catch (err) {
    throw err;
  }
}

export function useMatchTeams(team1Id?: number, team2Id?: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["match-teams", team1Id, team2Id],
    queryFn: () => getMatchTeams(team1Id, team2Id),
    enabled: !!(team1Id && team2Id),
  });

  return {
    matchTeams: data,
    isMatchTeamsLoading: isLoading,
    isMatchTeamsError: isError,
  };
}
