import { metadata } from "./layout";
import { wishlistTitle } from "@/src/lib/profile";

describe("metadata", () => {
  it("uses the personalized wishlist title", () => {
    expect(metadata.title).toBe(wishlistTitle);
  });
});
