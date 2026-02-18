import { useMatch } from "@/hooks/queries/use-match";
import { client } from "@/libs/api/axios-client";
import { mockMatch } from "@/tests/mocks/match";
import { createWrapper } from "@/tests/utils/query-wrapper";
import { renderHook, waitFor } from "@testing-library/react-native";

jest.mock("@/libs/api/axios-client", () => ({
  client: {
    get: jest.fn(),
  },
}));

const mockedClient = jest.mocked(client);

describe("useMatch", () => {
  beforeEach(() => {
    mockedClient.get.mockReset();
  });

  describe("when request succeeds", () => {
    beforeEach(() => {
      mockedClient.get.mockResolvedValue({ data: mockMatch });
    });

    it("should return match correctly", async () => {
      const { result } = renderHook(() => useMatch(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isMatchLoading).toBe(false);
      });

      expect(mockedClient.get).toHaveBeenCalledWith("/matches/1");
      expect(result.current.match).toEqual(mockMatch);
      expect(result.current.isMatchError).toBe(false);
    });

    it("should not fetch when match id is null", async () => {
      const { result } = renderHook(() => useMatch(null), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isMatchLoading).toBe(false);
      });

      expect(mockedClient.get).not.toHaveBeenCalled();
      expect(result.current.match).toBeUndefined();
      expect(result.current.isMatchError).toBe(false);
    });
  });

  describe("when request fails", () => {
    beforeEach(() => {
      mockedClient.get.mockRejectedValue(new Error("Network error"));
    });

    it("should expose the error state as true", async () => {
      const { result } = renderHook(() => useMatch(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isMatchError).toBe(true);
      });
    });
  });
});
