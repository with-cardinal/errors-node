import { describe, test, expect } from "@jest/globals";
import { deliverErrors, deliverImmediate, enqueue } from "./deliver-errors";
import { setupTestServer, reqs } from "./test-help";

setupTestServer();

describe("deliverErrors", () => {
  test("delivers", async () => {
    enqueue({ message: "An error", at: new Date() }, true);
    await deliverErrors();

    expect(reqs.length).toBe(1);
  });
});

describe("deliverImmediate", () => {
  test("delivers immediately", async () => {
    enqueue({ message: "An error", at: new Date() }, true);
    await deliverImmediate();

    expect(reqs.length).toBe(1);
  });
});
