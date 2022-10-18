import { beforeEach, afterEach } from "@jest/globals";
import { options } from ".";
import http from "http";

options.host = "http://localhost:8888";

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
    server = http.createServer(listener);
    server.listen(8888);
  });

  afterEach(() => {
    server.close();
  });
}
