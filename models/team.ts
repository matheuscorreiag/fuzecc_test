import { Nullable } from "./common";

type Players = {
  active: boolean;
  age: Nullable<number>;
  birthday: Nullable<string>;
  first_name: Nullable<string>;
  id: number;
  image_url: Nullable<string>;
  last_name: Nullable<string>;
  modified_at: string;
  name: string;
  nationality: Nullable<string>;
  role: Nullable<string>;
  slug: Nullable<string>;
};

export type Team = {
  acronym: string;
  current_videogame: {
    id: number;
    name: string;
    slug: string;
  };
  dark_mode_image_url: Nullable<string>;
  id: number;
  image_url: Nullable<string>;
  location: Nullable<string>;
  modified_at: string;
  name: string;
  players: Players[];
  slug: Nullable<string>;
};
