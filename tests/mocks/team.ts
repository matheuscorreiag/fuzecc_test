import { Team } from "@/models/team";

function createMockTeam(id: number, name: string, acronym: string): Team {
  return {
    acronym,
    current_videogame: {
      id: 1,
      name: "Counter-Strike 2",
      slug: "cs2",
    },
    dark_mode_image_url: null,
    id,
    image_url: null,
    location: "Brazil",
    modified_at: "2026-02-18T12:00:00Z",
    name,
    players: [
      {
        active: true,
        age: 22,
        birthday: "2004-01-01",
        first_name: "Player",
        id: id * 10,
        image_url: null,
        last_name: "One",
        modified_at: "2026-02-18T12:00:00Z",
        name: `${name} Player`,
        nationality: "BR",
        role: "rifler",
        slug: `${name.toLowerCase().replace(/\s+/g, "-")}-player`,
      },
    ],
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  };
}

export const mockTeam1: Team = createMockTeam(10, "Team Alpha", "ALP");
export const mockTeam2: Team = createMockTeam(20, "Team Beta", "BET");
export const mockMatchTeams = {
  team1: mockTeam1,
  team2: mockTeam2,
};
