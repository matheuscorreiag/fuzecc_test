import { useMatch } from "@/hooks/queries/use-match";

export function useMatchIdViewModel(matchId: number | null) {
  const { match, isMatchLoading, isMatchError } = useMatch(matchId);

  return {
    match,
    isMatchLoading,
    isMatchError,
  };
}
