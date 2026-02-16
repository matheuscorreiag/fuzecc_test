import { useMatch } from "@/hooks/queries/use-match";
import { useMatchTeams } from "@/hooks/queries/use-match-teams";

export function useMatchIdViewModel(matchId: number | null) {
  const { match, isMatchLoading, isMatchError } = useMatch(matchId);

  const { matchTeams, isMatchTeamsLoading, isMatchTeamsError } = useMatchTeams(
    match?.opponents[0]?.opponent?.id,
    match?.opponents[1]?.opponent?.id,
  );

  return {
    match,
    matchTeams,
    isMatchLoading: isMatchLoading || isMatchTeamsLoading,
    isMatchError: isMatchError || isMatchTeamsError,
  };
}
