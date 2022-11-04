import http from "http";
import https from "https";
import { SendableError } from "./sendable-error";
import { options } from ".";

export async function postErrors(errors: SendableError[]): Promise<boolean> {
  const url = new URL("/errors", options.host);
  const proto = url.protocol === "https:" ? https : http;

  const reqOptions = {
    host: url.hostname,
    port: url.port ? url.port : undefined,
    path: `${url.pathname}${url.search}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.secret}`,
    },
    timeout: 10000,
  };

  return new Promise((resolve, reject) => {
    const cb = (response: http.IncomingMessage) => {
      response.on("data", () => null);

      response.on("end", () => {
        if (response.statusCode && response.statusCode < 300) {
          resolve(true);
        } else {
          console.error(`Unexpected status code: ${response.statusCode}`);
          resolve(false);
        }
      });

      response.on("error", reject);
    };

    const req = proto.request(reqOptions, cb);
    req.write(JSON.stringify({ errors }));
    req.end();
  });
}
