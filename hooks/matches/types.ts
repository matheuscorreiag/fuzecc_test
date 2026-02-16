type Nullable<T> = T | null;

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
  begin_at: Nullable<string>;
  complete: boolean;
  detailed_stats: boolean;
  end_at: Nullable<string>;
  finished: boolean;
  forfeit: boolean;
  id: number;
  length: Nullable<string>;
  match_id: number;
  position: number;
  status: MatchGameStatus;
  winner: Nullable<{
    id: number;
    type: PandaEntityType;
  }>;
  winner_type: Nullable<PandaEntityType>;
};

export type MatchLeague = {
  id: number;
  image_url: Nullable<string>;
  modified_at: string;
  name: string;
  slug: string;
  url: Nullable<string>;
};

export type MatchLive = {
  opens_at: Nullable<string>;
  supported: boolean;
  url: Nullable<string>;
};

export type MatchOpponent = {
  type: PandaEntityType;
  opponent: Nullable<{
    id: number;
    image_url: Nullable<string>;
    location: Nullable<string>;
    name: string;
    slug: string;
  }>;
};

export type MatchResult = {
  score: number;
  team_id?: number;
  player_id?: number;
};

export type MatchSerie = {
  begin_at: Nullable<string>;
  end_at: Nullable<string>;
  full_name: string;
  id: number;
  league_id: number;
  modified_at: string;
  name: string;
  season: Nullable<string>;
  slug: string;
  winner_id: Nullable<number>;
  winner_type: Nullable<PandaEntityType>;
  year: number;
};

export type MatchStream = {
  embed_url: Nullable<string>;
  language: string;
  main: boolean;
  official: boolean;
  raw_url: Nullable<string>;
};

export type MatchTournament = {
  begin_at: Nullable<string>;
  country: Nullable<string>;
  detailed_stats: boolean;
  end_at: Nullable<string>;
  has_bracket: boolean;
  id: number;
  league_id: number;
  live_supported: boolean;
  modified_at: string;
  name: string;
  prizepool: Nullable<string>;
  region: Nullable<string>;
  serie_id: number;
  slug: string;
  tier: Nullable<string>;
  type: string;
  winner_id: Nullable<number>;
  winner_type: Nullable<PandaEntityType>;
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

export type VideogameVersion = Nullable<{
  current?: boolean;
  name?: string;
  slug?: string;
}>;

export type MatchWinner = Nullable<{
  id: number;
  image_url: Nullable<string>;
  location: Nullable<string>;
  name: string;
  slug: string;
  type?: PandaEntityType;
}>;

export type Match = {
  begin_at: Nullable<string>;
  detailed_stats: boolean;
  draw: boolean;
  end_at: Nullable<string>;
  forfeit: boolean;
  game_advantage: Nullable<number>;
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
  original_scheduled_at: Nullable<string>;
  rescheduled: boolean;
  results: MatchResult[];
  scheduled_at: Nullable<string>;
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
  winner_id: Nullable<number>;
  winner_type: Nullable<PandaEntityType>;
};
