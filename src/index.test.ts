import { describe, test, expect } from "@jest/globals";
import run from "./testing/run";
import path from "path";
import { reqs, setupTestServer } from "./test-help";

setupTestServer();

describe("node", () => {
  test("catches uncaught exceptions", async () => {
    const result = await run(
      `node ${path.join("dist", "testing", "uncaught-exception.js")}`,
      false
    );
    expect(result.code).toBe(1);
    expect(reqs.length).toBe(1);
  });

  test("catches unahandled promise rejection", async () => {
    const result = await run(
      `node ${path.join("dist", "testing", "unhandled-rejection.js")}`,
      false
    );
    expect(result.code).toBe(1);
    expect(reqs.length).toBe(1);
  });

  test("sends when sent manually", async () => {
    const result = await run(
      `node ${path.join("dist", "testing", "send.js")}`,
      false
    );
    expect(result.code).toBe(0);
    expect(reqs.length).toBe(1);
  });
});
