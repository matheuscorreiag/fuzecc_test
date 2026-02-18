import { useMatch } from "@/hooks/queries/use-match";
import { useMatchTeams } from "@/hooks/queries/use-match-teams";
import { useMatchIdViewModel } from "@/screens/match-id/view-model";
import { mockMatch } from "@/tests/mocks/match";
import { mockMatchTeams } from "@/tests/mocks/team";
import { renderHook } from "@testing-library/react-native";

jest.mock("@/libs/api/axios-client", () => ({
  client: { get: jest.fn() },
}));

jest.mock("@/hooks/queries/use-match");
jest.mock("@/hooks/queries/use-match-teams");

const mockedUseMatch = jest.mocked(useMatch);
const mockedUseMatchTeams = jest.mocked(useMatchTeams);

function makeMatchReturn(
  overrides: Partial<ReturnType<typeof useMatch>> = {},
): ReturnType<typeof useMatch> {
  return {
    match: undefined,
    isMatchLoading: false,
    isMatchError: false,
    ...overrides,
  };
}

function makeMatchTeamsReturn(
  overrides: Partial<ReturnType<typeof useMatchTeams>> = {},
): ReturnType<typeof useMatchTeams> {
  return {
    matchTeams: undefined,
    isMatchTeamsLoading: false,
    isMatchTeamsError: false,
    ...overrides,
  };
}

describe("useMatchIdViewModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseMatch.mockReturnValue(makeMatchReturn());
    mockedUseMatchTeams.mockReturnValue(makeMatchTeamsReturn());
  });

  it("should call useMatch with the provided matchId", () => {
    renderHook(() => useMatchIdViewModel(42));

    expect(mockedUseMatch).toHaveBeenCalledWith(42);
  });

  it("should return the match data", () => {
    mockedUseMatch.mockReturnValue(makeMatchReturn({ match: mockMatch }));

    const { result } = renderHook(() => useMatchIdViewModel(mockMatch.id));

    expect(result.current.match).toEqual(mockMatch);
  });

  it("should pass opponent IDs from the match to useMatchTeams", () => {
    const homeTeamId = mockMatch?.opponents[0]?.opponent?.id;
    const awayTeamId = mockMatch?.opponents[1]?.opponent?.id;

    mockedUseMatch.mockReturnValue(makeMatchReturn({ match: mockMatch }));

    renderHook(() => useMatchIdViewModel(mockMatch.id));

    expect(mockedUseMatchTeams).toHaveBeenCalledWith(homeTeamId, awayTeamId);
  });

  it("should return matchTeams data", () => {
    mockedUseMatch.mockReturnValue(makeMatchReturn({ match: mockMatch }));
    mockedUseMatchTeams.mockReturnValue(
      makeMatchTeamsReturn({ matchTeams: mockMatchTeams }),
    );

    const { result } = renderHook(() => useMatchIdViewModel(mockMatch.id));

    expect(result.current.matchTeams).toEqual(mockMatchTeams);
  });

  describe("isMatchLoading", () => {
    it("should be true when match is loading", () => {
      mockedUseMatch.mockReturnValue(makeMatchReturn({ isMatchLoading: true }));

      const { result } = renderHook(() => useMatchIdViewModel(1));

      expect(result.current.isMatchLoading).toBe(true);
    });

    it("should be true when teams are loading", () => {
      mockedUseMatchTeams.mockReturnValue(
        makeMatchTeamsReturn({ isMatchTeamsLoading: true }),
      );

      const { result } = renderHook(() => useMatchIdViewModel(1));

      expect(result.current.isMatchLoading).toBe(true);
    });

    it("should be false when neither match nor teams are loading", () => {
      const { result } = renderHook(() => useMatchIdViewModel(1));

      expect(result.current.isMatchLoading).toBe(false);
    });
  });

  describe("isMatchError", () => {
    it("should be true when match has an error", () => {
      mockedUseMatch.mockReturnValue(makeMatchReturn({ isMatchError: true }));

      const { result } = renderHook(() => useMatchIdViewModel(1));

      expect(result.current.isMatchError).toBe(true);
    });

    it("should be true when teams have an error", () => {
      mockedUseMatchTeams.mockReturnValue(
        makeMatchTeamsReturn({ isMatchTeamsError: true }),
      );

      const { result } = renderHook(() => useMatchIdViewModel(1));

      expect(result.current.isMatchError).toBe(true);
    });

    it("should be false when neither match nor teams have an error", () => {
      const { result } = renderHook(() => useMatchIdViewModel(1));

      expect(result.current.isMatchError).toBe(false);
    });
  });
});
