import { MatchCard } from "@/components/match-card";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock("@/libs/dayjs/format-match-date", () => ({
  formatMatchDate: jest.fn(() => "Amanhã, 15:00"),
}));

describe("MatchCard", () => {
  const defaultProps = {
    onPress: jest.fn(),
    leagueName: "ESL Pro League",
    serieName: "Season 20",
    leagueImageUrl: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the league name and serie name", () => {
    const { getByText } = render(
      <MatchCard
        {...defaultProps}
        beginAt={null}
      />,
    );

    expect(getByText("ESL Pro League Season 20")).toBeTruthy();
  });

  it("should show 'AGORA' when match is live (beginAt is in the past)", () => {
    const pastDate = new Date(Date.now() - 3_600_000).toISOString();

    const { getByText } = render(
      <MatchCard
        {...defaultProps}
        beginAt={pastDate}
      />,
    );

    expect(getByText("AGORA")).toBeTruthy();
  });

  it("should show formatted date when match is not live", () => {
    const futureDate = new Date(Date.now() + 3_600_000).toISOString();

    const { getByText, queryByText } = render(
      <MatchCard
        {...defaultProps}
        beginAt={futureDate}
      />,
    );

    expect(queryByText("AGORA")).toBeNull();
    expect(getByText("Amanhã, 15:00")).toBeTruthy();
  });

  it("should show formatted date when beginAt is null", () => {
    const { queryByText, getByText } = render(
      <MatchCard
        {...defaultProps}
        beginAt={null}
      />,
    );

    expect(queryByText("AGORA")).toBeNull();
    expect(getByText("Amanhã, 15:00")).toBeTruthy();
  });

  it("should call onPress when pressed", () => {
    const onPress = jest.fn();

    const { getByText } = render(
      <MatchCard
        {...defaultProps}
        onPress={onPress}
        beginAt={null}
      />,
    );

    fireEvent.press(getByText("ESL Pro League Season 20"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("should render home and away team names when provided", () => {
    const { getByText } = render(
      <MatchCard
        {...defaultProps}
        beginAt={null}
        homeTeamName="Team Alpha"
        awayTeamName="Team Beta"
      />,
    );

    expect(getByText("Team Alpha")).toBeTruthy();
    expect(getByText("Team Beta")).toBeTruthy();
  });
});
