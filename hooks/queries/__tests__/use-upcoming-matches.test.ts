import { useUpcomingMatches } from "@/hooks/queries/use-upcoming-matches";
import { client } from "@/libs/api/axios-client";
import { mockMatches } from "@/tests/mocks/match";
import { createWrapper } from "@/tests/utils/query-wrapper";
import { act, renderHook, waitFor } from "@testing-library/react-native";

jest.mock("@/libs/api/axios-client", () => ({
  client: {
    get: jest.fn(),
  },
}));

const mockedClient = jest.mocked(client);

describe("useUpcomingMatches", () => {
  beforeEach(() => {
    mockedClient.get.mockReset();
  });

  describe("when request succeeds", () => {
    beforeEach(() => {
      mockedClient.get.mockResolvedValue({ data: mockMatches });
    });

    it("should return upcoming matches correctly", async () => {
      const { result } = renderHook(() => useUpcomingMatches(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isUpcomingMatchesLoading).toBe(false);
      });

      expect(result.current.upcomingMatches).toEqual(mockMatches);
      expect(result.current.isUpcomingMatchesError).toBe(false);
    });

    it("should fetch the next page when there are more results", async () => {
      const { result } = renderHook(() => useUpcomingMatches(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isUpcomingMatchesLoading).toBe(false);
      });

      await act(async () => {
        await result.current.fetchNextUpcomingMatchesPage();
      });

      await waitFor(() => {
        expect(mockedClient.get).toHaveBeenCalledWith(
          "/csgo/matches/upcoming",
          {
            params: { page: 2 },
          },
        );
      });
    });

    it("should not have a next page when the last page is empty", async () => {
      mockedClient.get
        .mockResolvedValueOnce({ data: mockMatches })
        .mockResolvedValueOnce({ data: [] });

      const { result } = renderHook(() => useUpcomingMatches(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isUpcomingMatchesLoading).toBe(false);
      });

      await act(async () => {
        await result.current.fetchNextUpcomingMatchesPage();
      });

      await waitFor(() => {
        expect(result.current.hasNextUpcomingMatchesPage).toBe(false);
      });
    });
  });

  describe("when request fails", () => {
    beforeEach(() => {
      mockedClient.get.mockRejectedValue(new Error("Network error"));
    });

    it("should expose the error state as true", async () => {
      const { result } = renderHook(() => useUpcomingMatches(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isUpcomingMatchesError).toBe(true);
      });
    });
  });
});
