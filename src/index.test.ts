import { describe, test, expect } from "@jest/globals";
import run from "./testing/run";
import path from "path";
import { nanoid } from "nanoid";

describe("node", () => {
  test("catches uncaught exceptions", async () => {
    const id = nanoid();
    const result = await run(
      `node ${path.join("dist", "testing", "uncaught-exception.js")} ${id}`,
      false
    );
    expect(result.code).toBe(1);
    expect(result.stderr).toContain(id);
  });

  test("catches unahandled promise rejection", async () => {
    const id = nanoid();
    const result = await run(
      `node ${path.join("dist", "testing", "unhandled-rejection.js")} ${id}`,
      false
    );
    expect(result.code).toBe(1);
    expect(result.stderr).toContain(id);
  });
});
