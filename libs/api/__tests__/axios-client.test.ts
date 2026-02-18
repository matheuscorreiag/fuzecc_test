import { client } from "@/libs/api/axios-client";
import axios from "axios";

jest.mock("@/env", () => ({
  Env: {
    EXPO_PUBLIC_PANDA_SCORE_API_BASE_URL: "https://api.example.com",
    EXPO_PUBLIC_PANDA_SCORE_API_TOKEN: "test-token-123",
  },
}));

jest.mock("axios", () => {
  const interceptorUseMock = jest.fn();
  const axiosInstanceMock = {
    interceptors: {
      request: { use: interceptorUseMock },
    },
    _interceptorUse: interceptorUseMock,
  };
  const createMock = jest.fn(() => axiosInstanceMock);

  return {
    __esModule: true,
    default: {
      create: createMock,
      _createMock: createMock,
      _instance: axiosInstanceMock,
    },
    create: createMock,
  };
});

describe("client", () => {
  const axiosMock = axios as unknown as {
    create: jest.Mock;
    _createMock: jest.Mock;
    _instance: {
      interceptors: { request: { use: jest.Mock } };
      _interceptorUse: jest.Mock;
    };
  };

  it("should create axios instance with correct baseURL", () => {
    expect(axiosMock.create).toHaveBeenCalledWith({
      baseURL: "https://api.example.com",
    });
  });

  it("should register a request interceptor", () => {
    const interceptorUse = axiosMock._instance._interceptorUse;

    expect(interceptorUse).toHaveBeenCalledTimes(1);
  });

  it("should add Authorization header via the interceptor", () => {
    const interceptorUse = axiosMock._instance._interceptorUse;
    const [interceptorFn] = interceptorUse.mock.calls[0];
    const config = { headers: {} as Record<string, string> };

    const result = interceptorFn(config);

    expect(result.headers.Authorization).toBe("Bearer test-token-123");
  });

  it("should export the created axios instance", () => {
    expect(client).toBe(axiosMock._instance);
  });
});
