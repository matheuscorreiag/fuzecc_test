import { Typography } from "@/components/ui/typography";
import { render } from "@testing-library/react-native";

describe("Typography", () => {
  it("should render children text", () => {
    const { getByText } = render(<Typography>Hello World</Typography>);

    expect(getByText("Hello World")).toBeTruthy();
  });

  it("should apply Roboto_400Regular font for normal weight (default)", () => {
    const { getByText } = render(<Typography>Text</Typography>);

    expect(getByText("Text")).toHaveProp(
      "style",
      expect.objectContaining({ fontFamily: "Roboto_400Regular" }),
    );
  });

  it("should apply Roboto_500Medium font for medium weight", () => {
    const { getByText } = render(<Typography weight="medium">Text</Typography>);

    expect(getByText("Text")).toHaveProp(
      "style",
      expect.objectContaining({ fontFamily: "Roboto_500Medium" }),
    );
  });

  it("should apply Roboto_700Bold font for bold weight", () => {
    const { getByText } = render(<Typography weight="bold">Text</Typography>);

    expect(getByText("Text")).toHaveProp(
      "style",
      expect.objectContaining({ fontFamily: "Roboto_700Bold" }),
    );
  });

  it("should forward additional Text props", () => {
    const { getByText } = render(
      <Typography numberOfLines={1}>Text</Typography>,
    );

    expect(getByText("Text")).toHaveProp("numberOfLines", 1);
  });
});
