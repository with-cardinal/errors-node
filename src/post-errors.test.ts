import { describe, test, expect } from "@jest/globals";
import { postErrors } from "./post-errors";
import { setupTestServer, reqs } from "./test-help";

const addr = setupTestServer();

describe("postErrors", () => {
  test("posts errors", async () => {
    const result = await postErrors([
      { at: new Date(), message: "Something broke" },
    ]);
    expect(result).toBe(true);
    expect(reqs.length).toBe(1);
  });
});
