import { errorToSendable } from "./stack";

describe("errorToSendable", () => {
  test("error", () => {
    const sendable = errorToSendable(new Error("Something happened"));
    expect(sendable.message).toBe("Something happened");
    expect(sendable.at).toBeInstanceOf(Date);
    expect(sendable.stack?.length).toBeGreaterThan(0);

    const firstFrame = sendable.stack?.[0];
    if (firstFrame && typeof firstFrame !== "string") {
      expect(typeof firstFrame).not.toBe("string");
      expect(firstFrame.at).toBe("Object.<anonymous>");
      expect(firstFrame.file).toContain("stack.test.ts");
      expect(firstFrame.line).toBe(5);
      expect(firstFrame.column).toBe(38);
    } else if (firstFrame) {
      fail("First frame wasn't parsed");
    } else {
      fail("First frame was undefined");
    }
  });
});
