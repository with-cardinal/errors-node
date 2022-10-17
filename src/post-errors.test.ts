import { beforeEach, afterEach, describe, test, expect } from "@jest/globals";
import http from "http";
import { postErrors } from "./post-errors";
import { options } from ".";

options.host = "http://localhost:8888";

let server: http.Server;

let reqs = [];
function listener(req: http.IncomingMessage, resp: http.ServerResponse) {
  reqs.push(req);

  resp.writeHead(200);
  resp.end();
}

beforeEach(() => {
  reqs = [];
  server = http.createServer(listener);
  server.listen(8888);
});

afterEach(() => {
  server.close();
});

describe("postErrors", () => {
  test("posts errors", async () => {
    const result = await postErrors([
      { at: new Date(), message: "Something broke" },
    ]);
    expect(result).toBe(true);
    expect(reqs.length).toBe(1);
  });
});
