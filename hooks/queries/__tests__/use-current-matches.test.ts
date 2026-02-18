import { useCurrentMatches } from "@/hooks/queries/use-current-matches";
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

describe("useCurrentMatches", () => {
  beforeEach(() => {
    mockedClient.get.mockReset();
  });

  describe("when request succeeds", () => {
    beforeEach(() => {
      mockedClient.get.mockResolvedValue({ data: mockMatches });
    });

    it("should return current matches correctly", async () => {
      const { result } = renderHook(() => useCurrentMatches(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isCurrentMatchesLoading).toBe(false);
      });

      expect(result.current.currentMatches).toEqual(mockMatches);
      expect(result.current.isCurrentMatchesError).toBe(false);
    });

    it("should fetch the next page when there are more results", async () => {
      const { result } = renderHook(() => useCurrentMatches(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isCurrentMatchesLoading).toBe(false);
      });

      await act(async () => {
        await result.current.fetchNextCurrentMatchesPage();
      });

      await waitFor(() => {
        expect(mockedClient.get).toHaveBeenCalledWith("/csgo/matches/running", {
          params: { page: 2 },
        });
      });
    });

    it("should not have a next page when the last page is empty", async () => {
      mockedClient.get
        .mockResolvedValueOnce({ data: mockMatches })
        .mockResolvedValueOnce({ data: [] });

      const { result } = renderHook(() => useCurrentMatches(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isCurrentMatchesLoading).toBe(false);
      });

      await act(async () => {
        await result.current.fetchNextCurrentMatchesPage();
      });

      await waitFor(() => {
        expect(result.current.hasNextCurrentMatchesPage).toBe(false);
      });
    });
  });

  describe("when request fails", () => {
    beforeEach(() => {
      mockedClient.get.mockRejectedValue(new Error("Network error"));
    });

    it("should error state be true", async () => {
      const { result } = renderHook(() => useCurrentMatches(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isCurrentMatchesError).toBe(true);
      });
    });
  });
});
