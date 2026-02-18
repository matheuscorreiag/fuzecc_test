import { Providers } from "@/components/providers";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";

describe("Providers", () => {
  it("should render its children", () => {
    const { getByText } = render(
      <Providers>
        <Text>Test Child</Text>
      </Providers>,
    );

    expect(getByText("Test Child")).toBeTruthy();
  });

  it("should render multiple children", () => {
    const { getByText } = render(
      <Providers>
        <Text>First Child</Text>
        <Text>Second Child</Text>
      </Providers>,
    );

    expect(getByText("First Child")).toBeTruthy();
    expect(getByText("Second Child")).toBeTruthy();
  });
});
