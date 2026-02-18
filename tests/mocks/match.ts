import { Match } from "@/models/match";

function createMockMatch(id: number): Match {
  const leagueId = 1 + id;
  const serieId = 2 + id;
  const tournamentId = 3 + id;
  const teamAId = 4 + id;
  const teamBId = 5 + id;

  return {
    begin_at: "2026-02-18T10:00:00Z",
    detailed_stats: false,
    draw: false,
    end_at: null,
    forfeit: false,
    game_advantage: null,
    games: [
      {
        begin_at: "2026-02-18T10:05:00Z",
        complete: false,
        detailed_stats: false,
        end_at: null,
        finished: false,
        forfeit: false,
        id: 1000 + id,
        length: null,
        match_id: id,
        position: 1,
        status: "running",
        winner: null,
        winner_type: null,
      },
    ],
    id,
    league: {
      id: leagueId,
      image_url: null,
      modified_at: "2026-02-17T12:00:00Z",
      name: "Test League",
      slug: `test-league-${id}`,
      url: null,
    },
    league_id: leagueId,
    live: {
      opens_at: "2026-02-18T09:55:00Z",
      supported: true,
      url: "https://stream.example.com/live",
    },
    match_type: "best_of_3",
    modified_at: "2026-02-18T10:10:00Z",
    name: `Team Alpha vs Team Beta ${id}`,
    number_of_games: 3,
    opponents: [
      {
        type: "Team",
        opponent: {
          id: teamAId,
          image_url: null,
          location: "BR",
          name: "Team Alpha",
          slug: `team-alpha-${id}`,
        },
      },
      {
        type: "Team",
        opponent: {
          id: teamBId,
          image_url: null,
          location: "US",
          name: "Team Beta",
          slug: `team-beta-${id}`,
        },
      },
    ],
    original_scheduled_at: "2026-02-18T10:00:00Z",
    rescheduled: false,
    results: [
      {
        score: 0,
        team_id: teamAId,
      },
      {
        score: 0,
        team_id: teamBId,
      },
    ],
    scheduled_at: "2026-02-18T10:00:00Z",
    serie: {
      begin_at: "2026-02-01T00:00:00Z",
      end_at: "2026-02-28T23:59:59Z",
      full_name: "Test Serie 2026",
      id: serieId,
      league_id: leagueId,
      modified_at: "2026-02-17T12:00:00Z",
      name: "Test Serie",
      season: "Spring",
      slug: `test-serie-${id}`,
      winner_id: null,
      winner_type: null,
      year: 2026,
    },
    serie_id: serieId,
    slug: `team-alpha-vs-team-beta-${id}`,
    status: "running",
    streams_list: [
      {
        embed_url: null,
        language: "en",
        main: true,
        official: true,
        raw_url: "https://stream.example.com/raw",
      },
    ],
    tournament: {
      begin_at: "2026-02-01T00:00:00Z",
      country: "Brazil",
      detailed_stats: false,
      end_at: "2026-02-28T23:59:59Z",
      has_bracket: true,
      id: tournamentId,
      league_id: leagueId,
      live_supported: true,
      modified_at: "2026-02-17T12:00:00Z",
      name: "Test Tournament",
      prizepool: "$10000",
      region: "South America",
      serie_id: serieId,
      slug: `test-tournament-${id}`,
      tier: "A",
      type: "online",
      winner_id: null,
      winner_type: null,
    },
    tournament_id: tournamentId,
    videogame: {
      id: 1,
      name: "Counter-Strike 2",
      slug: "cs2",
    },
    videogame_title: {
      id: 1,
      name: "CS2",
      slug: "cs2",
      videogame_id: 1,
    },
    videogame_version: {
      current: true,
      name: "Latest",
      slug: "latest",
    },
    winner: null,
    winner_id: null,
    winner_type: null,
  };
}

export const mockMatch: Match = createMockMatch(1);
export const mockMatches: Match[] = [createMockMatch(1), createMockMatch(2)];
