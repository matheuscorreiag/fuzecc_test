import { Screen } from "@/components/ui/screen";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Screen", () => {
  it("should render the title", () => {
    const { getByText } = render(
      <Screen title="Partidas">
        <Text>Content</Text>
      </Screen>,
    );

    expect(getByText("Partidas")).toBeTruthy();
  });

  it("should render its children", () => {
    const { getByText } = render(
      <Screen title="Partidas">
        <Text>Screen Content</Text>
      </Screen>,
    );

    expect(getByText("Screen Content")).toBeTruthy();
  });

  it("should use the initial header variant by default (no back button icon)", () => {
    const { queryByTestId } = render(
      <Screen title="Partidas">
        <Text>Content</Text>
      </Screen>,
    );

    expect(queryByTestId("back-button")).toBeNull();
  });

  it("should use the inner header variant when type is 'inner' (shows back button icon)", () => {
    const { getByTestId } = render(
      <Screen title="Detalhes" type="inner">
        <Text>Content</Text>
      </Screen>,
    );

    expect(getByTestId("back-button")).toBeTruthy();
  });

  it("should apply padding by default", () => {
    const { getByTestId } = render(
      <Screen title="Partidas">
        <Text>Content</Text>
      </Screen>,
    );

    expect(getByTestId("screen-content")).toHaveProp(
      "className",
      expect.stringContaining("px-page"),
    );
  });

  it("should not apply padding when hidePadding is true", () => {
    const { getByTestId } = render(
      <Screen title="Partidas" hidePadding>
        <Text>Content</Text>
      </Screen>,
    );

    expect(getByTestId("screen-content")).not.toHaveProp(
      "className",
      expect.stringContaining("px-page"),
    );
  });
});
