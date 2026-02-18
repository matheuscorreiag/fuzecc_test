import { Opponents } from "@/components/opponents";
import { render } from "@testing-library/react-native";

describe("Opponents", () => {
  it("should render home and away team names", () => {
    const { getByText } = render(
      <Opponents
        homeTeamName="Team Alpha"
        awayTeamName="Team Beta"
      />,
    );

    expect(getByText("Team Alpha")).toBeTruthy();
    expect(getByText("Team Beta")).toBeTruthy();
  });

  it("should render the 'vs' separator", () => {
    const { getByText } = render(
      <Opponents
        homeTeamName="Team Alpha"
        awayTeamName="Team Beta"
      />,
    );

    expect(getByText("vs")).toBeTruthy();
  });

  it("should render without team names when they are null", () => {
    const { getByText } = render(
      <Opponents
        homeTeamName={null}
        awayTeamName={null}
      />,
    );

    expect(getByText("vs")).toBeTruthy();
  });

  it("should render without team names when they are undefined", () => {
    const { getByText } = render(<Opponents />);

    expect(getByText("vs")).toBeTruthy();
  });
});
