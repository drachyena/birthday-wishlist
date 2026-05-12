import { metadata } from "./layout";

describe("metadata", () => {
  it("uses the personalized wishlist title", () => {
    expect(metadata.title).toBe("@@의 생일 위시리스트");
  });
});
