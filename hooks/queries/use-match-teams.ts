import { client } from "@/libs/api/axios-client";
import { Team } from "@/models/team";
import { useQuery } from "@tanstack/react-query";

async function getMatchTeams(team1Id?: number, team2Id?: number) {
  try {
    const [team1Response, team2Response] = await Promise.all([
      client.get<Team>(`/teams/${team1Id}`),
      client.get<Team>(`/teams/${team2Id}`),
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
