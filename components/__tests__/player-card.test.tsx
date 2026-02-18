import { PlayerCard } from "@/components/player-card";
import { render } from "@testing-library/react-native";

describe("PlayerCard", () => {
  const defaultProps = {
    nickname: "s1mple",
    firstName: "Oleksandr",
    lastName: "Kostyliev",
  };

  it("should render the nickname", () => {
    const { getByText } = render(<PlayerCard {...defaultProps} />);

    expect(getByText("s1mple")).toBeTruthy();
  });

  it("should render the player name", () => {
    const { getByText } = render(<PlayerCard {...defaultProps} />);

    expect(getByText("Oleksandr Kostyliev")).toBeTruthy();
  });

  it("should apply right-rounded style when isOpponent is false", () => {
    const { getByTestId } = render(
      <PlayerCard {...defaultProps} isOpponent={false} testID="player-card" />,
    );

    expect(getByTestId("player-card")).toHaveProp(
      "className",
      expect.stringContaining("rounded-r-xl"),
    );
    expect(getByTestId("player-card")).not.toHaveProp(
      "className",
      expect.stringContaining("rounded-l-xl"),
    );
  });

  it("should apply left-rounded style when isOpponent is true", () => {
    const { getByTestId } = render(
      <PlayerCard {...defaultProps} isOpponent testID="player-card" />,
    );

    expect(getByTestId("player-card")).toHaveProp(
      "className",
      expect.stringContaining("rounded-l-xl"),
    );
  });

  it("should default isOpponent to false", () => {
    const { getByTestId } = render(
      <PlayerCard {...defaultProps} testID="player-card" />,
    );

    expect(getByTestId("player-card")).not.toHaveProp(
      "className",
      expect.stringContaining("rounded-l-xl"),
    );
  });
});
