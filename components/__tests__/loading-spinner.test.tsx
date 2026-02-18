import { LoadingSpinner } from "@/components/loading-spinner";
import { render } from "@testing-library/react-native";

describe("LoadingSpinner", () => {
  it("should render an ActivityIndicator", () => {
    const { getByTestId } = render(<LoadingSpinner />);

    expect(getByTestId("loading-spinner")).toBeTruthy();
  });

  it("should render the ActivityIndicator with large size", () => {
    const { getByTestId } = render(<LoadingSpinner />);

    expect(getByTestId("loading-spinner").props.size).toBe("large");
  });
});
