import { MatchesView } from "@/screens/matches/view";
import { useMatchesViewModel } from "@/screens/matches/view-model";
import { mockMatches } from "@/tests/mocks/match";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock("@/libs/api/axios-client", () => ({
  client: { get: jest.fn() },
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), back: jest.fn() })),
}));

jest.mock("@shopify/flash-list", () => ({
  FlashList: function FlashList(props: any) {
    if (props.keyExtractor) {
      props.data.forEach((item: any, index: number) =>
        props.keyExtractor(item, index),
      );
    }
    if (props.ItemSeparatorComponent) props.ItemSeparatorComponent();
    if (props.ListFooterComponent) props.ListFooterComponent();
    return props.data.map((item: any, index: number) =>
      props.renderItem({ item, index }),
    );
  },
}));

jest.mock("@/screens/matches/view-model");

const mockedUseMatchesViewModel = jest.mocked(useMatchesViewModel);

function makeViewModel(
  overrides: Partial<ReturnType<typeof useMatchesViewModel>> = {},
): ReturnType<typeof useMatchesViewModel> {
  return {
    matches: [],
    isMatchesError: false,
    isMatchesLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
    handleMatchPress: jest.fn(),
    onRefresh: jest.fn(),
    onEndReached: jest.fn(),
    ...overrides,
  };
}

describe("MatchesView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseMatchesViewModel.mockReturnValue(makeViewModel());
  });

  it("should show a loading spinner while loading", () => {
    mockedUseMatchesViewModel.mockReturnValue(
      makeViewModel({ isMatchesLoading: true }),
    );

    const { getByTestId } = render(<MatchesView />);

    expect(getByTestId("loading-spinner")).toBeTruthy();
  });

  it("should show the 'Partidas' screen title", () => {
    const { getByText } = render(<MatchesView />);

    expect(getByText("Partidas")).toBeTruthy();
  });

  it("should render a card for each match", () => {
    mockedUseMatchesViewModel.mockReturnValue(
      makeViewModel({ matches: mockMatches }),
    );

    const { getAllByText } = render(<MatchesView />);

    expect(getAllByText("Test League Test Serie")).toHaveLength(
      mockMatches.length,
    );
  });

  it("should call handleMatchPress with the match id when a card is pressed", () => {
    const handleMatchPress = jest.fn();
    const [match] = mockMatches;

    mockedUseMatchesViewModel.mockReturnValue(
      makeViewModel({ matches: [match], handleMatchPress }),
    );

    const { getByText } = render(<MatchesView />);

    fireEvent.press(getByText("Test League Test Serie"));

    expect(handleMatchPress).toHaveBeenCalledWith(match.id);
  });
});
