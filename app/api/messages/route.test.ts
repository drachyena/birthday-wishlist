import { describe, expect, it } from "vitest";
import { getOpenWishes } from "@/src/lib/wishes";
import { POST } from "./route";

function createJsonRequest(body: unknown): Request {
  return new Request("http://localhost/api/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function createRawRequest(body: string): Request {
  return new Request("http://localhost/api/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
  });
}

describe("POST /api/messages", () => {
  const validWishId = getOpenWishes()[0].id;

  it("returns 400 for malformed JSON", async () => {
    const response = await POST(createRawRequest("{"));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toBe("INVALID_JSON");
  });

  it("returns 400 for missing fields", async () => {
    const response = await POST(
      createJsonRequest({
        wishId: validWishId,
        nickname: "",
        message: "",
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toBe("INVALID_MESSAGE");
    expect(payload.message).toBe("닉네임과 메시지를 모두 입력해주세요.");
  });

  it("returns 400 for an unknown wish id", async () => {
    const response = await POST(
      createJsonRequest({
        wishId: "missing-wish",
        nickname: "친구",
        message: "생일 축하해!",
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toBe("UNKNOWN_WISH");
  });

  it("returns 503 for the general wishlist message id", async () => {
    const response = await POST(
      createJsonRequest({
        wishId: "wishlist",
        nickname: "친구",
        message: "생일 축하해!",
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(503);
    expect(payload.error).toBe("STORAGE_NOT_CONNECTED");
  });

  it("returns 503 for valid input while storage is disconnected", async () => {
    const response = await POST(
      createJsonRequest({
        wishId: validWishId,
        nickname: "친구",
        message: "생일 축하해!",
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(503);
    expect(payload.error).toBe("STORAGE_NOT_CONNECTED");
    expect(payload.message).toBe("아직 메시지 저장소가 연결되지 않았어요.");
  });
});
