export type PandaEntityType = "Team" | "Player";

export type MatchStatus =
  | "not_started"
  | "running"
  | "finished"
  | "canceled"
  | "postponed"
  | "not_played";

export type MatchGameStatus =
  | "not_started"
  | "running"
  | "finished"
  | "not_played";

export type MatchGame = {
  begin_at: string | null;
  complete: boolean;
  detailed_stats: boolean;
  end_at: string | null;
  finished: boolean;
  forfeit: boolean;
  id: number;
  length: string | null;
  match_id: number;
  position: number;
  status: MatchGameStatus;
  winner: {
    id: number;
    type: PandaEntityType;
  } | null;
  winner_type: PandaEntityType | null;
};

export type MatchLeague = {
  id: number;
  image_url: string | null;
  modified_at: string;
  name: string;
  slug: string;
  url: string | null;
};

export type MatchLive = {
  opens_at: string | null;
  supported: boolean;
  url: string | null;
};

export type MatchOpponent = {
  type: PandaEntityType;
  opponent: {
    id: number;
    image_url: string | null;
    location: string | null;
    name: string;
    slug: string;
  } | null;
};

export type MatchResult = {
  score: number;
  team_id?: number;
  player_id?: number;
};

export type MatchSerie = {
  begin_at: string | null;
  end_at: string | null;
  full_name: string;
  id: number;
  league_id: number;
  modified_at: string;
  name: string;
  season: string | null;
  slug: string;
  winner_id: number | null;
  winner_type: PandaEntityType | null;
  year: number;
};

export type MatchStream = {
  embed_url: string | null;
  language: string;
  main: boolean;
  official: boolean;
  raw_url: string | null;
};

export type MatchTournament = {
  begin_at: string | null;
  country: string | null;
  detailed_stats: boolean;
  end_at: string | null;
  has_bracket: boolean;
  id: number;
  league_id: number;
  live_supported: boolean;
  modified_at: string;
  name: string;
  prizepool: string | null;
  region: string | null;
  serie_id: number;
  slug: string;
  tier: string | null;
  type: string;
  winner_id: number | null;
  winner_type: PandaEntityType | null;
};

export type Videogame = {
  id: number;
  name: string;
  slug: string;
};

export type VideogameTitle = {
  id: number;
  name: string;
  slug: string;
  videogame_id: number;
};

export type VideogameVersion = {
  current?: boolean;
  name?: string;
  slug?: string;
} | null;

export type MatchWinner = {
  id: number;
  image_url: string | null;
  location: string | null;
  name: string;
  slug: string;
  type?: PandaEntityType;
} | null;

export type Match = {
  begin_at: string | null;
  detailed_stats: boolean;
  draw: boolean;
  end_at: string | null;
  forfeit: boolean;
  game_advantage: number | null;
  games: MatchGame[];
  id: number;
  league: MatchLeague;
  league_id: number;
  live: MatchLive;
  match_type: string;
  modified_at: string;
  name: string;
  number_of_games: number;
  opponents: MatchOpponent[];
  original_scheduled_at: string | null;
  rescheduled: boolean;
  results: MatchResult[];
  scheduled_at: string | null;
  serie: MatchSerie;
  serie_id: number;
  slug: string;
  status: MatchStatus;
  streams_list: MatchStream[];
  tournament: MatchTournament;
  tournament_id: number;
  videogame: Videogame;
  videogame_title: VideogameTitle;
  videogame_version: VideogameVersion;
  winner: MatchWinner;
  winner_id: number | null;
  winner_type: PandaEntityType | null;
};
