import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Wish } from "@/src/lib/wishes";
import { WishCard } from "./wish-card";

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

describe("WishCard", () => {
  it("opens the message form from the card action", () => {
    render(<WishCard wish={wish} />);

    expect(screen.queryByLabelText("닉네임")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "마음만 보태기" }));

    expect(screen.getByLabelText("닉네임")).toBeInTheDocument();
    expect(screen.getByLabelText("비공개 메시지")).toBeInTheDocument();
  });

  it("renders image fallback when the wish has no image", () => {
    render(<WishCard wish={wish} />);

    expect(screen.getByText("PIXEL WISH")).toBeInTheDocument();
  });

  it("links to the product page", () => {
    render(<WishCard wish={wish} />);

    expect(screen.getByRole("link", { name: "상품 보기" })).toHaveAttribute(
      "href",
      wish.productUrl,
    );
  });
});
