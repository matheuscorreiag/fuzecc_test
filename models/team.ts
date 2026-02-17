type Players = {
  active: boolean;
  age: number | null;
  birthday: string | null;
  first_name: string | null;
  id: number;
  image_url: string | null;
  last_name: string | null;
  modified_at: string;
  name: string;
  nationality: string | null;
  role: string | null;
  slug: string | null;
};

export type Team = {
  acronym: string;
  current_videogame: {
    id: number;
    name: string;
    slug: string;
  };
  dark_mode_image_url: string | null;
  id: number;
  image_url: string | null;
  location: string | null;
  modified_at: string;
  name: string;
  players: Players[];
  slug: string | null;
};
