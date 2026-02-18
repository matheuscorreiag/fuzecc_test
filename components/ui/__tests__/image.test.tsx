import { Image } from "@/components/ui/image";
import { act, render } from "@testing-library/react-native";

describe("Image", () => {
  describe("when no imageUrl is provided", () => {
    it("should not render an image element", () => {
      const { queryByTestId } = render(<Image />);

      expect(queryByTestId("image")).toBeNull();
    });

    it("should render a placeholder", () => {
      const { getByTestId } = render(<Image />);

      expect(getByTestId("image-placeholder")).toHaveProp(
        "className",
        expect.stringContaining("bg-[#C4C4C4]"),
      );
    });
  });

  describe("when imageUrl is provided", () => {
    it("should render an image with the correct src", () => {
      const { getByTestId } = render(
        <Image imageUrl="https://example.com/image.png" />,
      );

      expect(getByTestId("image")).toHaveProp(
        "src",
        "https://example.com/image.png",
      );
    });

    it("should render with opacity 0 while loading", () => {
      const { getByTestId } = render(
        <Image imageUrl="https://example.com/image.png" />,
      );

      expect(getByTestId("image")).toHaveProp(
        "style",
        expect.objectContaining({ opacity: 0 }),
      );
    });

    it("should render with opacity 1 after loading completes", () => {
      const { getByTestId } = render(
        <Image imageUrl="https://example.com/image.png" />,
      );

      act(() => {
        getByTestId("image").props.onLoadEnd();
      });

      expect(getByTestId("image")).toHaveProp(
        "style",
        expect.objectContaining({ opacity: 1 }),
      );
    });

    it("should hide the image and show placeholder on error", () => {
      const { getByTestId, queryByTestId } = render(
        <Image imageUrl="https://example.com/image.png" />,
      );

      act(() => {
        getByTestId("image").props.onError();
      });

      expect(queryByTestId("image")).toBeNull();
    });
  });

  describe("when imageUrl changes", () => {
    it("should reset to loading state when imageUrl changes", () => {
      const { getByTestId, rerender } = render(
        <Image imageUrl="https://example.com/image1.png" />,
      );

      act(() => {
        getByTestId("image").props.onLoadEnd();
      });

      rerender(<Image imageUrl="https://example.com/image2.png" />);

      expect(getByTestId("image")).toHaveProp(
        "style",
        expect.objectContaining({ opacity: 0 }),
      );
    });
  });

  it("should apply custom containerClassName", () => {
    const { getByTestId } = render(<Image containerClassName="size-[60px]" />);

    expect(getByTestId("image-container")).toHaveProp(
      "className",
      expect.stringContaining("size-[60px]"),
    );
  });
});
