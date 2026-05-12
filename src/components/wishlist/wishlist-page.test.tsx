import { fireEvent, render, screen } from "@testing-library/react";
import { wishlistTitle } from "@/src/lib/profile";
import type { Wish, WishlistSummary } from "@/src/lib/wishes";
import { WishlistPage } from "./wishlist-page";

const wish: Wish = {
  id: "designer-bag",
  name: "Designer Bag",
  description: "A cute birthday wish item.",
  price: 3200000,
  fundedAmount: 850000,
  image: "",
  productUrl: "https://example.com/designer-bag",
  priority: "top",
  status: "open",
};

const summary: WishlistSummary = {
  totalPrice: 3200000,
  totalFundedAmount: 850000,
  progressPercent: 27,
  formattedTotalPrice: "3,200,000원",
  formattedTotalFundedAmount: "850,000원",
};

describe("WishlistPage", () => {
  it("renders the personalized wishlist title", () => {
    render(<WishlistPage wishes={[wish]} summary={summary} />);

    expect(
      screen.getByRole("heading", { name: wishlistTitle }),
    ).toBeInTheDocument();
  });

  it("toggles one general message form above the wish cards", () => {
    render(<WishlistPage wishes={[wish]} summary={summary} />);

    const toggleButton = screen.getByRole("button", { name: "마음만 보태기" });

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByLabelText("닉네임")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("비공개 메시지")).not.toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByLabelText("닉네임")).toBeInTheDocument();
    expect(screen.getByLabelText("비공개 메시지")).toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByLabelText("닉네임")).not.toBeInTheDocument();
  });

  it("renders the total funding progress after the wish cards", () => {
    render(<WishlistPage wishes={[wish]} summary={summary} />);

    const wishItems = screen.getByRole("region", {
      name: "Birthday wish items",
    });
    const totalProgress = screen.getByRole("progressbar", {
      name: "Wish funding progress",
    });

    expect(
      wishItems.compareDocumentPosition(totalProgress) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
