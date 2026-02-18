import { useMatchTeams } from "@/hooks/queries/use-match-teams";
import { client } from "@/libs/api/axios-client";
import { mockMatchTeams, mockTeam1, mockTeam2 } from "@/tests/mocks/team";
import { createWrapper } from "@/tests/utils/query-wrapper";
import { renderHook, waitFor } from "@testing-library/react-native";

jest.mock("@/libs/api/axios-client", () => ({
  client: {
    get: jest.fn(),
  },
}));

const mockedClient = jest.mocked(client);

describe("useMatchTeams", () => {
  beforeEach(() => {
    mockedClient.get.mockReset();
  });

  describe("when request succeeds", () => {
    beforeEach(() => {
      mockedClient.get.mockImplementation((url: string) => {
        if (url === "/teams/10") {
          return Promise.resolve({ data: mockTeam1 });
        }

        if (url === "/teams/20") {
          return Promise.resolve({ data: mockTeam2 });
        }

        return Promise.reject(new Error("Unknown url"));
      });
    });

    it("should return both teams correctly", async () => {
      const { result } = renderHook(() => useMatchTeams(10, 20), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isMatchTeamsLoading).toBe(false);
      });

      expect(mockedClient.get).toHaveBeenCalledWith("/teams/10");
      expect(mockedClient.get).toHaveBeenCalledWith("/teams/20");
      expect(result.current.matchTeams).toEqual(mockMatchTeams);
      expect(result.current.isMatchTeamsError).toBe(false);
    });

    it("should not fetch when one of ids is missing", async () => {
      const { result } = renderHook(() => useMatchTeams(undefined, 20), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isMatchTeamsLoading).toBe(false);
      });

      expect(mockedClient.get).not.toHaveBeenCalled();
      expect(result.current.matchTeams).toBeUndefined();
      expect(result.current.isMatchTeamsError).toBe(false);
    });
  });

  describe("when request fails", () => {
    beforeEach(() => {
      mockedClient.get.mockRejectedValue(new Error("Network error"));
    });

    it("should expose the error state as true", async () => {
      const { result } = renderHook(() => useMatchTeams(10, 20), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isMatchTeamsError).toBe(true);
      });
    });
  });
});
