import { MatchIdView } from "@/screens/match-id/view";
import { useMatchIdViewModel } from "@/screens/match-id/view-model";
import { mockMatch } from "@/tests/mocks/match";
import { mockMatchTeams } from "@/tests/mocks/team";
import { render } from "@testing-library/react-native";

jest.mock("@/libs/api/axios-client", () => ({
  client: { get: jest.fn() },
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), back: jest.fn() })),
}));

jest.mock("@/libs/dayjs/format-match-date", () => ({
  formatMatchDate: jest.fn(() => "Hoje, 15:00"),
}));

jest.mock("@/screens/match-id/view-model");

const mockedUseMatchIdViewModel = jest.mocked(useMatchIdViewModel);

function makeViewModel(
  overrides: Partial<ReturnType<typeof useMatchIdViewModel>> = {},
): ReturnType<typeof useMatchIdViewModel> {
  return {
    match: undefined,
    matchTeams: undefined,
    isMatchLoading: false,
    isMatchError: false,
    ...overrides,
  };
}

describe("MatchIdView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseMatchIdViewModel.mockReturnValue(makeViewModel());
  });

  it("should show a loading spinner while loading", () => {
    mockedUseMatchIdViewModel.mockReturnValue(
      makeViewModel({ isMatchLoading: true }),
    );

    const { getByTestId } = render(<MatchIdView matchId={1} />);

    expect(getByTestId("loading-spinner")).toBeTruthy();
  });

  it("should call the view-model with the provided matchId", () => {
    render(<MatchIdView matchId={42} />);

    expect(mockedUseMatchIdViewModel).toHaveBeenCalledWith(42);
  });

  it("should show the league and serie name in the header", () => {
    mockedUseMatchIdViewModel.mockReturnValue(
      makeViewModel({ match: mockMatch }),
    );

    const { getByText } = render(<MatchIdView matchId={mockMatch.id} />);

    expect(getByText("Test League Test Serie")).toBeTruthy();
  });

  it("should show the opponents", () => {
    mockedUseMatchIdViewModel.mockReturnValue(
      makeViewModel({ match: mockMatch }),
    );

    const { getByText } = render(<MatchIdView matchId={mockMatch.id} />);

    expect(getByText("Team Alpha")).toBeTruthy();
    expect(getByText("Team Beta")).toBeTruthy();
    expect(getByText("vs")).toBeTruthy();
  });

  it("should show the formatted match date when begin_at is set", () => {
    mockedUseMatchIdViewModel.mockReturnValue(
      makeViewModel({ match: mockMatch }),
    );

    const { getByText } = render(<MatchIdView matchId={mockMatch.id} />);

    expect(getByText("Hoje, 15:00")).toBeTruthy();
  });

  it("should render player cards for each team's players", () => {
    mockedUseMatchIdViewModel.mockReturnValue(
      makeViewModel({ match: mockMatch, matchTeams: mockMatchTeams }),
    );

    const { getAllByText } = render(<MatchIdView matchId={mockMatch.id} />);

    expect(getAllByText("Team Alpha Player")).toBeTruthy();
    expect(getAllByText("Team Beta Player")).toBeTruthy();
  });

  it("should not render player cards when matchTeams is not loaded", () => {
    mockedUseMatchIdViewModel.mockReturnValue(
      makeViewModel({ match: mockMatch, matchTeams: undefined }),
    );

    const { queryByText } = render(<MatchIdView matchId={mockMatch.id} />);

    expect(queryByText("Team Alpha Player")).toBeNull();
  });
});
