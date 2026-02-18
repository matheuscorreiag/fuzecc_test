import { useCurrentMatches } from "@/hooks/queries/use-current-matches";
import { useUpcomingMatches } from "@/hooks/queries/use-upcoming-matches";
import { useMatchesViewModel } from "@/screens/matches/view-model";
import { mockMatches } from "@/tests/mocks/match";
import { act, renderHook } from "@testing-library/react-native";

jest.mock("@/libs/api/axios-client", () => ({
  client: { get: jest.fn() },
}));

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

jest.mock("@/hooks/queries/use-current-matches");
jest.mock("@/hooks/queries/use-upcoming-matches");

const mockedUseCurrentMatches = jest.mocked(useCurrentMatches);
const mockedUseUpcomingMatches = jest.mocked(useUpcomingMatches);

function makeCurrentMatchesReturn(
  overrides: Partial<ReturnType<typeof useCurrentMatches>> = {},
): ReturnType<typeof useCurrentMatches> {
  return {
    currentMatches: [],
    isCurrentMatchesError: false,
    isCurrentMatchesLoading: false,
    isCurrentMatchesRefetching: false,
    refetchCurrentMatches: jest.fn().mockResolvedValue({}),
    hasNextCurrentMatchesPage: false,
    fetchNextCurrentMatchesPage: jest.fn().mockResolvedValue({}),
    isFetchingNextCurrentMatchesPage: false,
    ...overrides,
  };
}

function makeUpcomingMatchesReturn(
  overrides: Partial<ReturnType<typeof useUpcomingMatches>> = {},
): ReturnType<typeof useUpcomingMatches> {
  return {
    upcomingMatches: [],
    isUpcomingMatchesError: false,
    isUpcomingMatchesLoading: false,
    isUpcomingMatchesRefetching: false,
    refetchUpcomingMatches: jest.fn().mockResolvedValue({}),
    hasNextUpcomingMatchesPage: false,
    fetchNextUpcomingMatchesPage: jest.fn().mockResolvedValue({}),
    isFetchingNextUpcomingMatchesPage: false,
    ...overrides,
  };
}

describe("useMatchesViewModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseCurrentMatches.mockReturnValue(makeCurrentMatchesReturn());
    mockedUseUpcomingMatches.mockReturnValue(makeUpcomingMatchesReturn());
  });

  describe("matches", () => {
    it("should combine current and upcoming matches with current first", () => {
      const [currentMatch, upcomingMatch] = mockMatches;

      mockedUseCurrentMatches.mockReturnValue(
        makeCurrentMatchesReturn({ currentMatches: [currentMatch] }),
      );
      mockedUseUpcomingMatches.mockReturnValue(
        makeUpcomingMatchesReturn({ upcomingMatches: [upcomingMatch] }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.matches).toEqual([currentMatch, upcomingMatch]);
    });

    it("should return an empty array when both sources are empty", () => {
      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.matches).toEqual([]);
    });
  });

  describe("isMatchesError", () => {
    it("should be true when current matches has error", () => {
      mockedUseCurrentMatches.mockReturnValue(
        makeCurrentMatchesReturn({ isCurrentMatchesError: true }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.isMatchesError).toBe(true);
    });

    it("should be true when upcoming matches has error", () => {
      mockedUseUpcomingMatches.mockReturnValue(
        makeUpcomingMatchesReturn({ isUpcomingMatchesError: true }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.isMatchesError).toBe(true);
    });

    it("should be false when neither has error", () => {
      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.isMatchesError).toBe(false);
    });
  });

  describe("isMatchesLoading", () => {
    it("should be true when current matches is loading", () => {
      mockedUseCurrentMatches.mockReturnValue(
        makeCurrentMatchesReturn({ isCurrentMatchesLoading: true }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.isMatchesLoading).toBe(true);
    });

    it("should be true when upcoming matches is loading", () => {
      mockedUseUpcomingMatches.mockReturnValue(
        makeUpcomingMatchesReturn({ isUpcomingMatchesLoading: true }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.isMatchesLoading).toBe(true);
    });

    it("should be false when neither is loading", () => {
      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.isMatchesLoading).toBe(false);
    });
  });

  describe("isRefreshing", () => {
    it("should be true when current matches is refetching", () => {
      mockedUseCurrentMatches.mockReturnValue(
        makeCurrentMatchesReturn({ isCurrentMatchesRefetching: true }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.isRefreshing).toBe(true);
    });

    it("should be true when upcoming matches is refetching", () => {
      mockedUseUpcomingMatches.mockReturnValue(
        makeUpcomingMatchesReturn({ isUpcomingMatchesRefetching: true }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.isRefreshing).toBe(true);
    });
  });

  describe("isLoadingMore", () => {
    it("should be true when fetching next current matches page", () => {
      mockedUseCurrentMatches.mockReturnValue(
        makeCurrentMatchesReturn({ isFetchingNextCurrentMatchesPage: true }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.isLoadingMore).toBe(true);
    });

    it("should be true when fetching next upcoming matches page", () => {
      mockedUseUpcomingMatches.mockReturnValue(
        makeUpcomingMatchesReturn({ isFetchingNextUpcomingMatchesPage: true }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      expect(result.current.isLoadingMore).toBe(true);
    });
  });

  describe("handleMatchPress", () => {
    it("should navigate to the match details screen with the match id", () => {
      const { result } = renderHook(() => useMatchesViewModel());

      result.current.handleMatchPress(42);

      expect(mockPush).toHaveBeenCalledWith({
        pathname: "/(matches)/[id]",
        params: { id: 42 },
      });
    });
  });

  describe("onRefresh", () => {
    it("should call both refetch functions", async () => {
      const refetchCurrentMatches = jest.fn().mockResolvedValue({});
      const refetchUpcomingMatches = jest.fn().mockResolvedValue({});

      mockedUseCurrentMatches.mockReturnValue(
        makeCurrentMatchesReturn({ refetchCurrentMatches }),
      );
      mockedUseUpcomingMatches.mockReturnValue(
        makeUpcomingMatchesReturn({ refetchUpcomingMatches }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      await act(async () => {
        await result.current.onRefresh();
      });

      expect(refetchCurrentMatches).toHaveBeenCalledTimes(1);
      expect(refetchUpcomingMatches).toHaveBeenCalledTimes(1);
    });
  });

  describe("onEndReached", () => {
    it("should do nothing when currently fetching next pages", async () => {
      const fetchNextCurrentMatchesPage = jest.fn().mockResolvedValue({});
      const fetchNextUpcomingMatchesPage = jest.fn().mockResolvedValue({});

      mockedUseCurrentMatches.mockReturnValue(
        makeCurrentMatchesReturn({
          isFetchingNextCurrentMatchesPage: true,
          hasNextCurrentMatchesPage: true,
          fetchNextCurrentMatchesPage,
        }),
      );
      mockedUseUpcomingMatches.mockReturnValue(
        makeUpcomingMatchesReturn({ fetchNextUpcomingMatchesPage }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      await act(async () => {
        await result.current.onEndReached();
      });

      expect(fetchNextCurrentMatchesPage).not.toHaveBeenCalled();
      expect(fetchNextUpcomingMatchesPage).not.toHaveBeenCalled();
    });

    it("should do nothing when there are no next pages", async () => {
      const fetchNextCurrentMatchesPage = jest.fn().mockResolvedValue({});
      const fetchNextUpcomingMatchesPage = jest.fn().mockResolvedValue({});

      mockedUseCurrentMatches.mockReturnValue(
        makeCurrentMatchesReturn({ fetchNextCurrentMatchesPage }),
      );
      mockedUseUpcomingMatches.mockReturnValue(
        makeUpcomingMatchesReturn({ fetchNextUpcomingMatchesPage }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      await act(async () => {
        await result.current.onEndReached();
      });

      expect(fetchNextCurrentMatchesPage).not.toHaveBeenCalled();
      expect(fetchNextUpcomingMatchesPage).not.toHaveBeenCalled();
    });

    it("should fetch next current matches page when available", async () => {
      const fetchNextCurrentMatchesPage = jest.fn().mockResolvedValue({});

      mockedUseCurrentMatches.mockReturnValue(
        makeCurrentMatchesReturn({
          hasNextCurrentMatchesPage: true,
          fetchNextCurrentMatchesPage,
        }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      await act(async () => {
        await result.current.onEndReached();
      });

      expect(fetchNextCurrentMatchesPage).toHaveBeenCalledTimes(1);
    });

    it("should fetch next upcoming matches page when available", async () => {
      const fetchNextUpcomingMatchesPage = jest.fn().mockResolvedValue({});

      mockedUseUpcomingMatches.mockReturnValue(
        makeUpcomingMatchesReturn({
          hasNextUpcomingMatchesPage: true,
          fetchNextUpcomingMatchesPage,
        }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      await act(async () => {
        await result.current.onEndReached();
      });

      expect(fetchNextUpcomingMatchesPage).toHaveBeenCalledTimes(1);
    });

    it("should fetch both next pages when both are available", async () => {
      const fetchNextCurrentMatchesPage = jest.fn().mockResolvedValue({});
      const fetchNextUpcomingMatchesPage = jest.fn().mockResolvedValue({});

      mockedUseCurrentMatches.mockReturnValue(
        makeCurrentMatchesReturn({
          hasNextCurrentMatchesPage: true,
          fetchNextCurrentMatchesPage,
        }),
      );
      mockedUseUpcomingMatches.mockReturnValue(
        makeUpcomingMatchesReturn({
          hasNextUpcomingMatchesPage: true,
          fetchNextUpcomingMatchesPage,
        }),
      );

      const { result } = renderHook(() => useMatchesViewModel());

      await act(async () => {
        await result.current.onEndReached();
      });

      expect(fetchNextCurrentMatchesPage).toHaveBeenCalledTimes(1);
      expect(fetchNextUpcomingMatchesPage).toHaveBeenCalledTimes(1);
    });
  });
});
