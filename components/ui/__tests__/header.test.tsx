import { Header } from "@/components/ui/header";
import { fireEvent, render } from "@testing-library/react-native";

const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    back: mockBack,
  })),
}));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("initial variant (default)", () => {
    it("should render the title", () => {
      const { getByText } = render(<Header title="Partidas" />);

      expect(getByText("Partidas")).toBeTruthy();
    });

    it("should not render a back button", () => {
      const { queryByTestId } = render(<Header title="Partidas" />);

      expect(queryByTestId("back-button")).toBeNull();
    });
  });

  describe("inner variant", () => {
    it("should render the title", () => {
      const { getByText } = render(<Header title="Detalhes" variant="inner" />);

      expect(getByText("Detalhes")).toBeTruthy();
    });

    it("should render a back button icon", () => {
      const { getByTestId } = render(
        <Header title="Detalhes" variant="inner" />,
      );

      expect(getByTestId("back-button")).toBeTruthy();
    });

    it("should call onBackPress when back button is pressed and onBackPress is provided", () => {
      const onBackPress = jest.fn();

      const { getByTestId } = render(
        <Header title="Detalhes" variant="inner" onBackPress={onBackPress} />,
      );

      fireEvent.press(getByTestId("back-button"));

      expect(onBackPress).toHaveBeenCalledTimes(1);
      expect(mockBack).not.toHaveBeenCalled();
    });

    it("should call router.back() when back button is pressed and onBackPress is not provided", () => {
      const { getByTestId } = render(
        <Header title="Detalhes" variant="inner" />,
      );

      fireEvent.press(getByTestId("back-button"));

      expect(mockBack).toHaveBeenCalledTimes(1);
    });
  });
});
