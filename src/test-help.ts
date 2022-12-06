import { beforeEach, afterEach, afterAll } from "@jest/globals";
import { options } from ".";
import http from "http";

options.host = "http://127.0.0.1:8888";

let server: http.Server;

export let reqs: http.IncomingMessage[] = [];
function listener(req: http.IncomingMessage, resp: http.ServerResponse) {
  reqs.push(req);

  resp.writeHead(200);
  resp.end();
}

export function setupTestServer() {
  beforeEach(() => {
    reqs = [];
  });

  afterEach(() => {
    reqs = [];
  });

  afterAll(async () => {
    return new Promise<void>((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve()))
    );
  });

  server = http.createServer(listener);
  server.listen(8888);
}
